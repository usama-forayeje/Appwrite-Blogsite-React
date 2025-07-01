import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import postService from "../api/appwrite/post";
import { usePostStore } from "../store/usePostStore";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],

    queryFn: () => postService.getPosts(),
  });
};

export const useGetPost = (slug) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: () => postService.getPost(slug),
    enabled: !!slug,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost) => postService.createPost(newPost),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts']
      });
      console.log("Post created successfully! Post list invalidated.");
    },
  });
};

export const useLikePost = () => {
  const queryClient = useQueryClient();
  const updateLikesInStore = usePostStore((state) => state.updateLikes);

  return useMutation({
    mutationFn: ({ postId, likes }) => postService.updatePost(postId, { likes }),

    onSuccess: (updatedPost) => {
      updateLikesInStore(updatedPost.$id, updatedPost.likes);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', updatedPost.$id] });
    },
    onError: (err) => {
      throw err;
    },
  });
};


export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug, data }) => postService.updatePost(slug, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', data.$id] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug) => postService.deletePost(slug),
    onMutate: async (slugToDelete) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (oldData) => {
        if (!oldData) return [];
        const newDocuments = oldData.documents.filter(post => post.$id !== slugToDelete);
        return { ...oldData, documents: newDocuments };
      });
      return { previousPosts };
    },

    onError: (err, slugToDelete, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
      console.error("Post deletion failed, rolling back...", err);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};



