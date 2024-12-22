import { Client, Databases, ID, Storage, Query } from "appwrite";
import config from "../config/config";

// Service class to manage Appwrite interactions
export class Service {
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

  // Create a new post document
  async createPost(title, slug, content, image, status, userId) {
    try {
      return await this.databases.createDocument(
        config.appwriteCollectionId,
        config.appwriteDatabaseId,
        slug,
        {
          title,
          content,
          image,
          status,
          userId,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        }
      );
    } catch (error) {
      console.error("Error creating post", error);
    }
  }

  // Update an existing post document
  async updatePost(slug, { title, content, image, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteCollectionId,
        config.appwriteDatabaseId,
        slug,
        {
          title,
          content,
          image,
          status,
          updatedAt: Date.now(),
        }
      );
    } catch (error) {
      console.error("Error updating post", error);
    }
  }

  // Delete a post document
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteCollectionId,
        config.appwriteDatabaseId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Error deleting post", error);
      return false;
    }
  }

  // Retrieve a single post by slug
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteCollectionId,
        config.appwriteDatabaseId,
        slug
      );
    } catch (error) {
      console.error("Error getting post", error);
      return false;
    }
  }

  // Retrieve multiple posts with optional query
  async getPosts(query = [Query.equals("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        config.appwriteCollectionId,
        config.appwriteDatabaseId,
        query
      );
    } catch (error) {
      console.error("Error getting posts", error);
      return false;
    }
  }

  // Upload a file to Appwrite storage
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Error uploading file", error);
      return false;
    }
  }

  // Delete a file from Appwrite storage
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(config.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Error deleting file", error);
      return false;
    }
  }

  // Get a file preview URL
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
