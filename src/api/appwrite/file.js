import { Client, ID, Storage } from "appwrite";
import config from "../../config/config";


export class FileService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            throw error;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            throw error;
        }
    }

    getFileView(fileId) {
        try {
            return this.bucket.getFileView(
                config.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.log("Appwrite service :: getFileView :: error", error);
            throw error;
        }
    }

}

const fileService = new FileService()
export default fileService