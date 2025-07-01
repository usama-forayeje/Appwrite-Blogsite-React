import { useParams, useNavigate, Link, useSearchParams } from "react-router"
import { useEffect } from "react"
import { motion } from "framer-motion"
import { useGetPost } from "../hooks/usePosts"
import { useUser } from "../hooks/useAuth"
import CommentSection from "../components/shared/CommentSection"
import PostDetailsSkeleton from "../components/shared/PostDetailsSkeleton"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog"
import { Badge } from "../components/ui/badge"
import authService from "../api/appwrite/auth"
import fileService from "../api/appwrite/file"
import { formatDate } from "../lib/utils"
import { Edit, Trash, Heart, MessageCircle, Share2, ArrowLeft, Bookmark } from "lucide-react"
import { useDeletePost, useLikePost } from "../hooks/usePosts"
import { toast } from "sonner"

function PostDetails() {
  const { slug: postId } = useParams()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data: currentUser } = useUser()
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost()
  const { mutate: likePost } = useLikePost()

  const { data: post, isLoading, isError } = useGetPost(postId)

  const isPostAuthor = post && currentUser ? post.userId === currentUser.$id : false
  const isLiked = post && currentUser ? post.likes?.includes(currentUser.$id) : false

  // Auto-focus comment section if coming from comment click
  useEffect(() => {
    if (searchParams.get("focus") === "comment") {
      setTimeout(() => {
        document.getElementById("comment-section")?.scrollIntoView({ behavior: "smooth" })
      }, 500)
    }
  }, [searchParams])

  const handleDelete = async () => {
    try {
      await deletePost(post.$id)
      toast.success("Post deleted successfully!")
      navigate("/dashboard")
    } catch (error) {
      toast.error("Failed to delete post." + error.message)
    }
  }

  const handleLike = () => {
    if (!currentUser) {
      toast.info("Please sign in to like posts")
      return
    }

    let newLikes = [...(post.likes || [])]
    if (isLiked) {
      newLikes = newLikes.filter((id) => id !== currentUser.$id)
    } else {
      newLikes.push(currentUser.$id)
    }

    likePost({ postId: post.$id, likes: newLikes })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard!")
    }
  }

  if (isLoading) return <PostDetailsSkeleton />

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-destructive mb-4">Post not found</h2>
        <p className="text-muted-foreground mb-6">The post you're looking for doesn't exist or has been removed.</p>
        <Link to="/dashboard">
          <Button>Back to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto max-w-4xl py-8 px-4"
    >
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="text-sm text-muted-foreground">
          <Link to="/dashboard" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2">•</span>
          <span className="truncate">{post?.title}</span>
        </div>
      </div>

      <article>
        <header className="mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post?.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">{post?.title}</h1>

          {/* Author and Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                <AvatarImage src={authService.getUserAvatar(post?.authorName) || "/placeholder.svg"} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                  {post?.authorName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{post?.authorName}</p>
                <p className="text-muted-foreground">{formatDate(post?.$createdAt)}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Like Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={`gap-2 ${isLiked ? "text-red-500 border-red-200" : ""}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
                {post?.likes?.length || 0}
              </Button>

              {/* Share Button */}
              <Button variant="outline" size="sm" onClick={handleShare} className="gap-2 bg-transparent">
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              {/* Bookmark Button */}
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Bookmark className="h-4 w-4" />
              </Button>

              {/* Edit/Delete for Author */}
              {isPostAuthor && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate(`/edit-post/${post.$id}`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm" disabled={isDeleting}>
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your post and remove it from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                          {isDeleting ? "Deleting..." : "Delete Post"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post?.featuredImage && (
          <div className="mb-8">
            <img
              src={fileService.getFileView(post.featuredImage).toString() || "/placeholder.svg"}
              alt={post.title}
              className="w-full rounded-xl shadow-lg max-h-[500px] object-cover"
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="prose dark:prose-invert max-w-none mb-10 text-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />

        {/* Stats */}
        <div className="flex items-center gap-6 border-t border-b py-6 mb-10">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Heart className="h-5 w-5" />
            {post?.likes?.length || 0} Likes
          </span>
          <span className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            {post?.commentCount || 0} Comments
          </span>
        </div>

        {/* Comments Section */}
        <div id="comment-section">
          <CommentSection postId={postId} />
        </div>
      </article>
    </motion.div>
  )
}

export default PostDetails
