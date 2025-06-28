import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import service from "../api/appwrite/appwriteConfig";


export const useGetPosts = () => {
    return useQuery({
        // queryKey: একটি ইউনিক কী, যা দিয়ে React Query এই ডেটা ক্যাশ করে।
        queryKey: ['posts'],

        // queryFn: অ্যাসিঙ্ক্রোনাস ফাংশন যা ডেটা নিয়ে আসে।
        queryFn: () => service.getPosts(),
    });
};

export const useGetPost = (slug) => {
    return useQuery({
        queryKey: ['post', slug],
        queryFn: () => service.getPost(slug),
        enabled: !!slug,
    });
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // mutationFn: যে ফাংশনটি ডেটা পরিবর্তন করে। এটি একটি আর্গুমেন্ট (যেমন: newPost) নেয়।
        mutationFn: (newPost) => service.createPost(newPost),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            });
            console.log("Post created successfully! Post list invalidated.");
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ slug, data }) => service.updatePost(slug, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
            queryClient.invalidateQueries({ queryKey: ['post', data.$id] });
        },
    });
};

export const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (slug) => service.deletePost(slug),
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

export const useUploadFile = () => {
    return useMutation({
        mutationFn: (file) => service.uploadFile(file),
    });
};

export const useDeleteFile = () => {
    return useMutation({
        mutationFn: (fileId) => service.deleteFile(fileId),
    });
};

