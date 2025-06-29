import config from '../../config/config';
import { Client, Databases, Storage, Query, Permission, Role } from "appwrite";

export class PostService {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ slug, ...data }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                data, // All data including title, content, likes, tags, etc.
                [
                    // This is crucial for making posts public
                    Permission.read(Role.any()), // Anyone can read this post
                    Permission.update(Role.user(data.userId)), // Only the creator can update
                    Permission.delete(Role.user(data.userId)), // Only the creator can delete
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

    async updatePost(postId, data) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId,
                data
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            throw error;
        }
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                postId
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            throw error;
        }
    }

}

const postService = new PostService()
export default postService