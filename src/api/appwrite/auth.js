
import { Client, Account, ID, Avatars } from "appwrite";
import config from "../../config/config";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
        this.avatars = new Avatars(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);

            if (userAccount) {
                await this.sendVerificationEmail();
            }
            return userAccount
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error", error.message);
            throw error;
        }
    }

    async sendVerificationEmail() {
        try {
            return await this.account.createVerification(config.verificationUrl);
        } catch (error) {
            console.log("Appwrite service :: sendVerificationEmail :: error", error);
            throw error;
        }
    }

    async confirmEmailVerification(userId, secret) {
        try {
            return await this.account.updateVerification(userId, secret);
        } catch (error) {
            console.log("Appwrite service :: verifyOtpSession :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            await this.account.createEmailPasswordSession(email, password);
            const user = await this.getCurrentUser();

            if (!user.emailVerification) {
                await this.logout();
                throw new Error("Email not verified. Please check your inbox and verify your email first.");
            }

            return user
        } catch (error) {
            console.log("Appwrite serive :: login :: error", error);
            throw error
        }
    }

    loginWithGoogle() {
        try {
            return this.account.createOAuth2Session(
                'google',
                config.OauthSuccessUrl,
                config.OauthFailureUrl
            );
        } catch (error) {
            console.log("Appwrite service :: loginWithGoogle :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: No active session");
            throw error;
        }
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }

    getUserAvatar(name) {
        return this.avatars.getInitials(name).href;
    }

}

const authService = new AuthService();

export default authService

