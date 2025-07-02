import { create } from "zustand"
import { devtools } from "zustand/middleware"

const usePostStore = create(
  devtools(
    (set) => ({
      posts: [],

      setPosts: (posts) => set({ posts }, false, "setPosts"),

      addPost: (post) => set((state) => ({ posts: [post, ...state.posts] }), false, "addPost"),

      updatePost: (postId, updatedData) =>
        set(
          (state) => ({
            posts: state.posts.map((post) => (post.$id === postId ? { ...post, ...updatedData } : post)),
          }),
          false,
          "updatePost",
        ),

      removePost: (postId) =>
        set(
          (state) => ({
            posts: state.posts.filter((post) => post.$id !== postId),
          }),
          false,
          "removePost",
        ),

      updateLikes: (postId, likes) =>
        set(
          (state) => ({
            posts: state.posts.map((post) => (post.$id === postId ? { ...post, likes } : post)),
          }),
          false,
          "updateLikes",
        ),

      incrementCommentCount: (postId) =>
        set(
          (state) => ({
            posts: state.posts.map((post) =>
              post.$id === postId ? { ...post, commentCount: (post.commentCount || 0) + 1 } : post,
            ),
          }),
          false,
          "incrementCommentCount",
        ),

      decrementCommentCount: (postId) =>
        set(
          (state) => ({
            posts: state.posts.map((post) =>
              post.$id === postId ? { ...post, commentCount: Math.max((post.commentCount || 0) - 1, 0) } : post,
            ),
          }),
          false,
          "decrementCommentCount",
        ),

      clearPosts: () => set({ posts: [] }, false, "clearPosts"),
    }),
    {
      name: "post-store",
    },
  ),
)

export { usePostStore }
