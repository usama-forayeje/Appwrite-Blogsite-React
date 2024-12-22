import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
// Create a new client    
  Client = new Client();
  Account;
// Constructor function to set the endpoint and project id
  constructor() {
    this.Client.setEndpoint(config.appwriteUrl).setProject(
      config.appwriteProjectId
    );
    this.Account = new Account(this.Client);
  }
// Create account function to create a new account with email, password and name
  async CreateAccount({ email, password, name }) {
    try {
      const userAccount = await this.Account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        // call another function to create a user profile
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  }
// Login function to create a session with the email and password   
  async Login({ email, password }) {
    try {
      return await this.Account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.log(error);
    }
  }
// Get the current user function to get the current user
  async getCurrentUser() {
    try {
      return await this.Account.get();
    } catch (error) {
      console.log("Appwrite Error getting user", error);
    }
    return null;
  }

  // Logout function to delete the current session
  async Logout() {
    try {
      return await this.Account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite Error logging out", error);
    }
  }
}

// Export the AuthService class
const authService = new AuthService();
// Export the authService object
export default authService;
