const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    verificationUrl: String(import.meta.env.VITE_VERIFICATION_URL),
    OauthSuccessUrl: String(import.meta.env.VITE_SUCCESS_REDIRECT_URL),
    OauthFailureUrl: String(import.meta.env.VITE_FAILURE_REDIRECT_URL),
    appwriteCommentId: String(import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID),
    tinyMCEApiKey: String(import.meta.env.VITE_TINYMCE_API_KEY),
}

export default config