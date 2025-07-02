import { Client, ID, Databases, Query, Permission, Role } from "appwrite"
import config from "../../config/config"

export class CommentService {
  client = new Client()
  databases

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)
    this.databases = new Databases(this.client)
  }

  async createComment({ postId, content, authorName, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCommentsCollectionId,
        ID.unique(),
        {
          postId,
          content,
          authorName,
          authorId: userId,
        },
        [Permission.read(Role.any()), Permission.update(Role.user(userId)), Permission.delete(Role.user(userId))],
      )
    } catch (error) {
      console.error("Appwrite service :: createComment :: error", error)
      throw error
    }
  }

  async getComments(postId) {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseId, config.appwriteCommentsCollectionId, [
        Query.equal("postId", postId),
        Query.orderDesc("$createdAt"),
      ])
    } catch (error) {
      console.error("Appwrite service :: getComments :: error", error)
      return { documents: [] }
    }
  }

  async updateComment(commentId, content) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCommentsCollectionId,
        commentId,
        { content },
      )
    } catch (error) {
      console.error("Appwrite service :: updateComment :: error", error)
      throw error
    }
  }

  async deleteComment(commentId) {
    try {
      await this.databases.deleteDocument(config.appwriteDatabaseId, config.appwriteCommentsCollectionId, commentId)
      return true
    } catch (error) {
      console.error("Appwrite service :: deleteComment :: error", error)
      throw error
    }
  }

  async getCommentCount(postId) {
    try {
      const result = await this.databases.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCommentsCollectionId,
        [Query.equal("postId", postId), Query.select(["$id"])],
      )
      return result.total || 0
    } catch (error) {
      console.error("Appwrite service :: getCommentCount :: error", error)
      return 0
    }
  }
}

const commentService = new CommentService()
export default commentService
