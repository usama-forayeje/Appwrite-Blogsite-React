import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import commentService from '../api/appwrite/comment';
import { toast } from 'sonner';
import { usePostStore } from '../store/usePostStore';

export const useGetComments = (postId) => {
    return useQuery({
        queryKey: ['comments', postId],
        queryFn: () => commentService.getComments(postId),
        enabled: !!postId,
    });
};

export const useCreateComment = () => {
    const queryClient = useQueryClient();
    const incrementCommentCount = usePostStore((state) => state.incrementCommentCount); // স্টোর থেকে অ্যাকশন নিন

    return useMutation({
        mutationFn: (commentData) => commentService.createComment(commentData),
        onSuccess: (newComment) => {
            incrementCommentCount(newComment.postId);
            queryClient.invalidateQueries({ queryKey: ['comments', newComment.postId] });
            queryClient.invalidateQueries({ queryKey: ['post', newComment.postId] });
        },
        onError: (error) => {
            toast.error("Failed to post comment", { description: error.message });
        }
    });
};