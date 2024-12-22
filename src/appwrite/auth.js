import { Client, Account, ID } from "appwrite";
import config from "../config/config";

// AuthService class to handle authentication using Appwrite
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // Create a new user account
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      console.error("Error creating account", error);
    } return null;
  }

  // Log in a user with email and password
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error logging in", error);
    } return null;
  }

  // Retrieve the current logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("Error getting current user", error);
    }
    return null;
  }

  // Log out the current user
  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.error("Error logging out", error);
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;
