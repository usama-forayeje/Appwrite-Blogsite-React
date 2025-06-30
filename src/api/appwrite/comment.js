import { Client, ID, Databases, Query, Permission, Role } from 'appwrite';
import config from '../../config/config';

export class CommentService {
    client = new Client();
    databases;

    constructor() {
        this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createComment({ postId, content, authorName, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,           // আর্গুমেন্ট ১: ডেটাবেস আইডি
                config.appwriteCommentsCollectionId, // আর্গুমেন্ট ২: কালেকশন আইডি (এটি মিসিং ছিল)
                ID.unique(),                         // আর্গুমেন্ট ৩: নতুন ডকুমেন্টের জন্য ইউনিক আইডি
                {                                    // আর্গুমেন্ট ৪: ডেটা
                    postId,
                    content,
                    authorName,
                    authorId: userId,
                }
            );
        } catch (error) {
            console.error("Appwrite service :: createComment :: error", error);
            throw error;
        }
    }

    async getComments(postId) {
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
            console.error("Appwrite service :: getComments :: error", error);
            return null;
        }
    }
}

const commentService = new CommentService();
export default commentService;