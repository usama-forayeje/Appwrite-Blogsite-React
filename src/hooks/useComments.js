import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import commentService from '../api/appwrite/comment';
import { toast } from 'sonner';

export const useGetComments = (postId) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => commentService.getCommentsByPost(postId),
        enabled: !!postId,
    });
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (commentData) => commentService.createComment(commentData),
        onSuccess: (newComment) => {
            toast.success("Comment posted successfully!");
            queryClient.invalidateQueries({ queryKey: ['comments', newComment.postId] });
        },
        onError: (error) => {
            toast.error("Failed to post comment", { description: error.message });
        }
    });
};