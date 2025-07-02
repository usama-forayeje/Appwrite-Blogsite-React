import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import postService from "../api/appwrite/post";
import { usePostStore } from "../store/usePostStore";
import commentService from "../api/appwrite/comment";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.getPosts(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetPost = (postId) => {
  return useQuery({
    queryKey: ['post', postId],
    queryFn: async () => {
      const [post, commentCount] = await Promise.all([
        postService.getPost(postId),
        commentService.getCommentCount(postId),
      ])
      return { ...post, commentCount }
    },
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const addPost = usePostStore((state) => state.addPost);
  return useMutation({
    mutationFn: (newPost) => postService.createPost(newPost),
    onSuccess: (newPost) => {
      addPost(newPost)
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
};

export const useLikePost = () => {
  const queryClient = useQueryClient()
  const updateLikesInStore = usePostStore((state) => state.updateLikes)

  return useMutation({
    mutationFn: ({ postId, likes }) => postService.updatePost(postId, { likes }),
    onMutate: async ({ postId, likes }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ["posts"] })
      await queryClient.cancelQueries({ queryKey: ["post", postId] })

      const previousPosts = queryClient.getQueryData(["posts"])
      const previousPost = queryClient.getQueryData(["post", postId])

      // Update posts list
      queryClient.setQueryData(["posts"], (old) => {
        if (!old) return old
        return {
          ...old,
          documents: old.documents.map((post) => (post.$id === postId ? { ...post, likes } : post)),
        }
      })

      // Update single post
      queryClient.setQueryData(["post", postId], (old) => {
        if (!old) return old
        return { ...old, likes }
      })

      updateLikesInStore(postId, likes)

      return { previousPosts, previousPost }
    },
    onError: (err, { postId }, context) => {
      // Rollback on error
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts)
      }
      if (context?.previousPost) {
        queryClient.setQueryData(["post", postId], context.previousPost)
      }
    },
    onSettled: (data, error, { postId }) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      queryClient.invalidateQueries({ queryKey: ["post", postId] })
    },
  })
}

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ postId, data }) => postService.updatePost(postId, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
      queryClient.invalidateQueries({ queryKey: ["post", updatedPost.$id] })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  const removePost = usePostStore((state) => state.removePost)

  return useMutation({
    mutationFn: (postId) => postService.deletePost(postId),
    onMutate: async (postIdToDelete) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] })

      const previousPosts = queryClient.getQueryData(["posts"])

      queryClient.setQueryData(["posts"], (old) => {
        if (!old) return old
        return {
          ...old,
          documents: old.documents.filter((post) => post.$id !== postIdToDelete),
        }
      })

      removePost(postIdToDelete)

      return { previousPosts }
    },
    onError: (err, postIdToDelete, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] })
    },
  })
}

export const useSearchPosts = () => {
  return useMutation({
    mutationFn: (searchTerm) => postService.searchPosts(searchTerm),
  })
}

export const useGetUserPosts = (userId) => {
  return useQuery({
    queryKey: ["userPosts", userId],
    queryFn: () => postService.getUserPosts(userId),
    enabled: !!userId,
  })
}

export const useGetTrendingPosts = () => {
  return useQuery({
    queryKey: ["trendingPosts"],
    queryFn: () => postService.getTrendingPosts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}
