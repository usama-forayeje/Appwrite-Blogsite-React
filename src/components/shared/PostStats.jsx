import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { useUser } from "../../hooks/useAuth"
import { useLikePost } from "../../hooks/usePosts"
import { Heart, MessageSquare, Share2, Bookmark } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

function PostStats({ post, onCommentClick, compact = false }) {
  const { data: currentUser } = useUser()
  const { mutate: likePost, isPending } = useLikePost()
  const [likes, setLikes] = useState(post.likes || [])
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setIsLiked(likes.includes(currentUser.$id))
    }
  }, [currentUser, likes])

  const handleLikePost = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!currentUser) {
      toast.info("Please sign in to like posts")
      return
    }

    let newLikes = [...likes]
    if (isLiked) {
      newLikes = newLikes.filter((id) => id !== currentUser.$id)
    } else {
      newLikes.push(currentUser.$id)
    }

    setLikes(newLikes)
    setIsLiked(!isLiked)

    likePost({ postId: post.$id, likes: newLikes })
  }

  const handleShare = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: `${window.location.origin}/posts/${post.$id}`,
      })
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/posts/${post.$id}`)
      toast.success("Link copied to clipboard!")
    }
  }

  const handleBookmark = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!currentUser) {
      toast.info("Please sign in to bookmark posts")
      return
    }

    setIsBookmarked(!isBookmarked)
    toast.success(isBookmarked ? "Removed from bookmarks" : "Added to bookmarks")
  }

  if (compact) {
    return (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="h-6 px-1 text-xs" onClick={handleLikePost} disabled={isPending}>
          <Heart className={`h-3 w-3 ${isLiked ? "text-red-500 fill-red-500" : "text-muted-foreground"}`} />
          <span className="ml-1">{likes.length}</span>
        </Button>

        <Button variant="ghost" size="sm" className="h-6 px-1 text-xs" onClick={onCommentClick}>
          <MessageSquare className="h-3 w-3 text-muted-foreground" />
          <span className="ml-1">{post.commentCount || 0}</span>
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 px-3 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 transition-colors"
            onClick={handleLikePost}
            disabled={isPending}
          >
            <motion.div animate={isLiked ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
              <Heart
                className={`h-4 w-4 ${
                  isLiked ? "text-red-500 fill-red-500" : "text-muted-foreground"
                } transition-colors`}
              />
            </motion.div>
            <span className="ml-2 text-sm font-medium">{likes.length}</span>
          </Button>
        </motion.div>

        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950 transition-colors"
          onClick={onCommentClick}
        >
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          <span className="ml-2 text-sm font-medium">{post.commentCount || 0}</span>
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 hover:bg-yellow-50 hover:text-yellow-600 dark:hover:bg-yellow-950 transition-colors"
          onClick={handleBookmark}
        >
          <Bookmark
            className={`h-4 w-4 ${
              isBookmarked ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
            } transition-colors`}
          />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-950 transition-colors"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>
    </div>
  )
}

export default PostStats
