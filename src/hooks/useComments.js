import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import commentService from '../api/appwrite/comment';
import { toast } from 'sonner';
import { usePostStore } from '../store/usePostStore';

export const useGetComments = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentService.getComments(postId),
    enabled: !!postId,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useCreateComment = () => {
  const queryClient = useQueryClient()
  const incrementCommentCount = usePostStore((state) => state.incrementCommentCount)

  return useMutation({
    mutationFn: (commentData) => commentService.createComment(commentData),
    onSuccess: (newComment) => {
      // Update comment count in store
      incrementCommentCount(newComment.postId)

      // Invalidate and refetch comments
      queryClient.invalidateQueries({ queryKey: ["comments", newComment.postId] })

      // Update post data with new comment count
      queryClient.invalidateQueries({ queryKey: ["post", newComment.postId] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
    onError: (error) => {
      toast.error("Failed to post comment", {
        description: error.message,
      })
    },
  })
}

export const useUpdateComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, content }) => commentService.updateComment(commentId, content),
    onSuccess: (updatedComment) => {
      queryClient.invalidateQueries({ queryKey: ["comments", updatedComment.postId] })
    },
  })
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ commentId, postId }) => {
      return commentService.deleteComment(commentId).then(() => ({ postId }))
    },
    onSuccess: ({ postId }) => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] })
      queryClient.invalidateQueries({ queryKey: ["post", postId] })
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useGetCommentCount = (postId) => {
  return useQuery({
    queryKey: ["commentCount", postId],
    queryFn: () => commentService.getCommentCount(postId),
    enabled: !!postId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}