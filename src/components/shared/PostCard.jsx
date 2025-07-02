import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { motion } from "framer-motion"
import parse from "html-react-parser"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import PostStats from "./PostStats"
import fileService from "../../api/appwrite/file"
import authService from "../../api/appwrite/auth"
import { useGetCommentCount } from "../../hooks/useComments"
import { calculateReadTime, formatDate } from "../../lib/utils"
import { Clock, Calendar, MoreHorizontal, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { toast } from "sonner"

function PostCard({ post, variant = "default", showActions = true }) {
  const navigate = useNavigate()
  const [imageError, setImageError] = useState(false)
  const { data: commentCount } = useGetCommentCount(post.$id)

  const placeholderImageUrl = `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(post.title)}`

  // Clean HTML content and create snippet
  const cleanContent = post.content.replace(/<[^>]*>?/gm, "")
  const snippet = cleanContent.substring(0, 150) + (cleanContent.length > 150 ? "..." : "")

  // Use comment count from API or fallback to post data
  const actualCommentCount = commentCount || post.commentCount || 0

  const handleCommentClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/posts/${post.$id}?focus=comment`)
  }

  const handleShare = () => {
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

  // Feed variant - Facebook-like post layout
  if (variant === "feed") {
    return (
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="post-card-hover">
        <Card className="overflow-hidden border-0 shadow-md bg-card/50 backdrop-blur-sm">
          {/* Post Header */}
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarImage
                    src={authService.getUserAvatar(post.authorName) || "/placeholder.svg"}
                    alt={post.authorName}
                  />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {post.authorName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{post.authorName}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.$createdAt)}
                    <span>•</span>
                    <Clock className="h-3 w-3" />
                    {calculateReadTime(post.content)}
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>Save Post</DropdownMenuItem>
                  <DropdownMenuItem>Report</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags?.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <Link to={`/posts/${post.$id}`}>
              <h2 className="text-xl font-bold leading-tight line-clamp-2 hover:text-primary transition-colors mb-3">
                {post.title}
              </h2>
            </Link>

            {/* Content Preview */}
            <div className="text-muted-foreground line-clamp-3 mb-4 prose-sm">{parse(snippet)}</div>

            {/* Featured Image */}
            {post.featuredImage && (
              <Link to={`/posts/${post.$id}`}>
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={!imageError ? fileService.getFileView(post.featuredImage).toString() : placeholderImageUrl}
                    alt={post.title}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                </div>
              </Link>
            )}

            {/* Actions */}
            {showActions && (
              <div className="border-t pt-4">
                <PostStats post={{ ...post, commentCount: actualCommentCount }} onCommentClick={handleCommentClick} />
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Horizontal variant
  if (variant === "horizontal") {
    return (
      <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
          <div className="flex">
            <div className="w-1/3">
              <Link to={`/posts/${post.$id}`}>
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={
                      post.featuredImage && !imageError
                        ? fileService.getFileView(post.featuredImage).toString()
                        : placeholderImageUrl
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={() => setImageError(true)}
                  />
                </div>
              </Link>
            </div>
            <div className="flex-1 p-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {post.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Link to={`/posts/${post.$id}`}>
                <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(post.$createdAt)}
                <Clock className="h-3 w-3 ml-2" />
                {calculateReadTime(post.content)}
              </div>
              {showActions && (
                <div className="mt-3">
                  <PostStats
                    post={{ ...post, commentCount: actualCommentCount }}
                    onCommentClick={handleCommentClick}
                    compact
                  />
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  // Default card variant
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm post-card-hover">
        <Link to={`/posts/${post.$id}`}>
          <div className="relative overflow-hidden">
            <img
              src={
                post.featuredImage && !imageError
                  ? fileService.getFileView(post.featuredImage).toString()
                  : placeholderImageUrl
              }
              alt={post.title}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        <CardContent className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tags?.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <CardHeader className="p-0 mb-3">
            <Link to={`/posts/${post.$id}`}>
              <h2 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {post.title}
              </h2>
            </Link>
          </CardHeader>

          {/* Excerpt */}
          <div className="text-sm text-muted-foreground line-clamp-3 mb-4 prose-sm">{parse(snippet)}</div>

          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={authService.getUserAvatar(post.authorName) || "/placeholder.svg"}
                alt={post.authorName}
              />
              <AvatarFallback>{post.authorName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{post.authorName}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formatDate(post.$createdAt)}
                <Clock className="h-3 w-3 ml-1" />
                {calculateReadTime(post.content)}
              </div>
            </div>
          </div>

          {/* Stats */}
          {showActions && (
            <div className="border-t pt-4">
              <PostStats post={{ ...post, commentCount: actualCommentCount }} onCommentClick={handleCommentClick} />
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default PostCard
