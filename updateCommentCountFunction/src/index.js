import * as sdk from 'node-appwrite';

export async function main(req, res) {
    const client = new sdk.Client();
    const databases = new sdk.Databases(client);

    if (
        !req.variables['https://fra.cloud.appwrite.io/v1'] ||
        !req.variables['68629a970038071f2a70']
    ) {
        return res.json({ success: false, message: "Missing environment variables." }, 400);
    }

    client
        .setEndpoint(req.variables['https://fra.cloud.appwrite.io/v1'])
        .setProject(req.variables['6767dd52001c694d06db'])
        .setKey(req.variables['68629a970038071f2a70']);

    try {
        const newComment = JSON.parse(req.payload);
        const postId = newComment.postId;

        const dbId = req.variables['6767de580025e093577a'];
        const postsCollectionId = req.variables['6767deaa00222b803329'];
        const commentsCollectionId = req.variables['6860dd69002cbefb7c64'];

        const commentsResponse = await databases.listDocuments(
            dbId,
            commentsCollectionId,
            [sdk.Query.equal('postId', [postId]), sdk.Query.limit(1)]
        );

        const totalComments = commentsResponse.total;

        await databases.updateDocument(dbId, postsCollectionId, postId, {
            commentCount: totalComments,
        });

        res.json({ success: true, message: `Count updated to ${totalComments}.` });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message }, 500);
    }
};