import { Client, ID, Databases, Query, Permission, Role } from 'appwrite';
import config from '../../config/config';

export class CommentService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createComment(commentData) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                ID.unique(),
                commentData,
                [
                    Permission.read(Role.any()), 
                    Permission.update(Role.user(commentData.authorId)), 
                    Permission.delete(Role.user(commentData.authorId)),
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: createComment :: error", error);
            throw error;
        }
    }

    async getCommentsByPost(postId) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCommentsCollectionId,
                [
                    Query.equal('postId', postId),
                    Query.orderDesc('$createdAt') 
                ]
            );
        } catch (error) {
            console.log("Appwrite service :: getCommentsByPost :: error", error);
            throw error;
        }
    }
}

const commentService = new CommentService();
export default commentService;