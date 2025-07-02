import config from "../../config/config"
import { Client, Databases, Storage, Query, Permission, Role, ID } from "appwrite"

export class PostService {
  client = new Client()
  databases
  bucket

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)

    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost(data) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        ID.unique(),
        data,
        [
          Permission.read(Role.any()),
          Permission.update(Role.user(data.userId)),
          Permission.delete(Role.user(data.userId)),
        ],
      )
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error)
      throw error
    }
  }

  async updatePost(postId, data) {
    try {
      return await this.databases.updateDocument(config.appwriteDatabaseId, config.appwriteCollectionId, postId, data)
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error)
      throw error
    }
  }

  async deletePost(postId) {
    try {
      await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCollectionId, postId)
      return true
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error)
      throw error
    }
  }

  async getPost(postId) {
    try {
      return await this.databases.getDocument(config.appwriteDatabaseId, config.appwriteCollectionId, postId)
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error)
      throw error
    }
  }

  async getPosts(queries = [Query.equal("status", "active"), Query.orderDesc("$createdAt")]) {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, queries)
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error)
      throw error
    }
  }

  async getUserPosts(userId) {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, [
        Query.equal("userId", userId),
        Query.orderDesc("$createdAt"),
      ])
    } catch (error) {
      console.log("Appwrite service :: getUserPosts :: error", error)
      throw error
    }
  }

  async searchPosts(searchTerm) {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, [
        Query.or([Query.search("title", searchTerm), Query.search("content", searchTerm)]),
        Query.equal("status", "active"),
        Query.orderDesc("$createdAt"),
      ])
    } catch (error) {
      console.log("Appwrite service :: searchPosts :: error", error)
      throw error
    }
  }

  async getPostsByTag(tag) {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, [
        Query.search("tags", tag),
        Query.equal("status", "active"),
        Query.orderDesc("$createdAt"),
      ])
    } catch (error) {
      console.log("Appwrite service :: getPostsByTag :: error", error)
      throw error
    }
  }

  async getTrendingPosts() {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCollectionId, [
        Query.equal("status", "active"),
        Query.orderDesc("$createdAt"),
        Query.limit(10),
      ])
    } catch (error) {
      console.log("Appwrite service :: getTrendingPosts :: error", error)
      throw error
    }
  }
}

const postService = new PostService()
export default postService
