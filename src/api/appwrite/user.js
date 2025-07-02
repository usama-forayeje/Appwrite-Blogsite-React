import { Client, Databases, Query, Permission, Role } from "appwrite"
import config from "../../config/config"

export class UserService {
  client = new Client()
  databases

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
    this.databases = new Databases(this.client)
  }

  async createUserProfile({ userId, name, email, bio = "", avatar = null }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId,
        {
          name,
          email,
          bio,
          avatar,
          followers: [],
          following: [],
          postsCount: 0,
          likesCount: 0,
        },
        [Permission.read(Role.any()), Permission.update(Role.user(userId)), Permission.delete(Role.user(userId))],
      )
    } catch (error) {
      console.error("Appwrite service :: createUserProfile :: error", error)
      throw error
    }
  }

  async getUserProfile(userId) {
    try {
      return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteUsersCollectionId, userId)
    } catch (error) {
      console.error("Appwrite service :: getUserProfile :: error", error)
      return null
    }
  }

  async updateUserProfile(userId, data) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteUsersCollectionId,
        userId,
        data,
      )
    } catch (error) {
      console.error("Appwrite service :: updateUserProfile :: error", error)
      throw error
    }
  }

  async followUser(currentUserId, targetUserId) {
    try {
      // Get both user profiles
      const [currentUser, targetUser] = await Promise.all([
        this.getUserProfile(currentUserId),
        this.getUserProfile(targetUserId),
      ])

      // Update following list for current user
      const newFollowing = [...(currentUser.following || []), targetUserId]

      // Update followers list for target user
      const newFollowers = [...(targetUser.followers || []), currentUserId]

      // Update both documents
      await Promise.all([
        this.updateUserProfile(currentUserId, { following: newFollowing }),
        this.updateUserProfile(targetUserId, { followers: newFollowers }),
      ])

      return true
    } catch (error) {
      console.error("Appwrite service :: followUser :: error", error)
      throw error
    }
  }

  async unfollowUser(currentUserId, targetUserId) {
    try {
      // Get both user profiles
      const [currentUser, targetUser] = await Promise.all([
        this.getUserProfile(currentUserId),
        this.getUserProfile(targetUserId),
      ])

      // Remove from following list for current user
      const newFollowing = (currentUser.following || []).filter((id) => id !== targetUserId)

      // Remove from followers list for target user
      const newFollowers = (targetUser.followers || []).filter((id) => id !== currentUserId)

      // Update both documents
      await Promise.all([
        this.updateUserProfile(currentUserId, { following: newFollowing }),
        this.updateUserProfile(targetUserId, { followers: newFollowers }),
      ])

      return true
    } catch (error) {
      console.error("Appwrite service :: unfollowUser :: error", error)
      throw error
    }
  }

  async searchUsers(searchTerm) {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteUsersCollectionId, [
        Query.search("name", searchTerm),
        Query.limit(20),
      ])
    } catch (error) {
      console.error("Appwrite service :: searchUsers :: error", error)
      return { documents: [] }
    }
  }
}

const userService = new UserService()
export default userService
