import { Client, Account, ID, Avatars } from "appwrite"
import config from "../../config/config"

export class AuthService {
  client = new Client()
  account
  avatars

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)

    this.account = new Account(this.client)
    this.avatars = new Avatars(this.client)
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)

      if (userAccount) {
        // Auto login after signup
        const session = await this.login({ email, password })

        // Send verification email
        await this.sendVerificationEmail()

        return session
      } else {
        return userAccount
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount :: error", error.message)
      throw error
    }
  }

  async sendVerificationEmail() {
    try {
      return await this.account.createVerification(config.verificationUrl)
    } catch (error) {
      console.log("Appwrite service :: sendVerificationEmail :: error", error)
      throw error
    }
  }

  async confirmEmailVerification(userId, secret) {
    try {
      return await this.account.updateVerification(userId, secret)
    } catch (error) {
      console.log("Appwrite service :: confirmEmailVerification :: error", error)
      throw error
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password)
    } catch (error) {
      console.log("Appwrite service :: login :: error", error)
      throw error
    }
  }

  async loginWithGoogle() {
    try {
      return this.account.createOAuth2Session("google", config.OauthSuccessUrl, config.OauthFailureUrl)
    } catch (error) {
      console.log("Appwrite service :: loginWithGoogle :: error", error)
      throw error
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get()
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser :: No active session" + error.message)
      return null
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions()
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error)
      throw error
    }
  }

  async updateProfile({ name, email }) {
    try {
      const promises = []

      if (name) {
        promises.push(this.account.updateName(name))
      }

      if (email) {
        promises.push(this.account.updateEmail(email, ""))
      }

      return await Promise.all(promises)
    } catch (error) {
      console.log("Appwrite service :: updateProfile :: error", error)
      throw error
    }
  }

  async changePassword({ oldPassword, newPassword }) {
    try {
      return await this.account.updatePassword(newPassword, oldPassword)
    } catch (error) {
      console.log("Appwrite service :: changePassword :: error", error)
      throw error
    }
  }

  getUserAvatar(name) {
    if (!name) return "/placeholder.svg"
    return this.avatars.getInitials(name, 100, 100).href
  }
}

const authService = new AuthService()
export default authService
