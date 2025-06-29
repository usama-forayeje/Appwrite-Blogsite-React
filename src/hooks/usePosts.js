import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import postService from "../api/appwrite/post";
import { toast } from "sonner";

export const useGetPosts = () => {
    return useQuery({
        // queryKey: একটি ইউনিক কী, যা দিয়ে React Query এই ডেটা ক্যাশ করে।
        queryKey: ['posts'],

        // queryFn: অ্যাসিঙ্ক্রোনাস ফাংশন যা ডেটা নিয়ে আসে।
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
        // mutationFn: যে ফাংশনটি ডেটা পরিবর্তন করে। এটি একটি আর্গুমেন্ট (যেমন: newPost) নেয়।
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
  return useMutation({
    mutationFn: ({ postId, likes }) => postService.updatePost(postId, { likes }),
    onMutate: async ({ postId, likes }) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          documents: oldData.documents.map(post => 
            post.$id === postId ? { ...post, likes } : post
          ),
        };
      });
      
      return { previousPosts }; 
    },
    onError: (err, variables, context) => {
      if (context.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      toast.error("Failed to update like.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
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



