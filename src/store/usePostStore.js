import { create } from 'zustand';

export const usePostStore = create((set) => ({
    posts: [],

    setPosts: (posts) => set({ posts }),

    incrementCommentCount: (postId) => set((state) => ({
        posts: state.posts.map(post =>
            post.$id === postId
                ? { ...post, commentCount: (post.commentCount || 0) + 1 }
                : post
        )
    })),

    updateLikes: (postId, newLikes) => set((state) => ({
        posts: state.posts.map(post =>
            post.$id === postId
                ? { ...post, likes: newLikes }
                : post
        )
    })),
}));