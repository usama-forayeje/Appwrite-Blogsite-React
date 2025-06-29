import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from "@/components/ui/badge";
import fileService from '../../api/appwrite/file'
import { Link, useNavigate } from "react-router";
import { calculateReadTime, formatDate } from "../../lib/utils";
import authService from "../../api/appwrite/auth";
import PostStats from "./PostStats";

function PostCard({ post }) {
   const navigate = useNavigate()
  const placeholderImageUrl = "https://placehold.co/600x400?text=MyBlog";
  const snippet = post.content.replace(/<[^>]*>?/gm, '').substring(0, 100) + '...';

    const handleCommentClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/posts/${post.$id}?focus=comment`); // একটি বিশেষ প্যারামিটারসহ
    }

  return (
    <Card className="flex flex-col overflow-hidden group transition-all hover:shadow-xl dark:bg-gray-800/50 border">
      <Link to={`/posts/${post.$id}`} className="block overflow-hidden relative">
        <img
          src={post.featuredImage ? fileService.getFileView(post.featuredImage).toString() : placeholderImageUrl}
          alt={post.title}
          className="w-full h-52 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          onError={(e) => { e.currentTarget.src = placeholderImageUrl; }}
        />
      </Link>
      
      <div className="flex flex-col flex-grow p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.slice(0, 3).map(tag => tag && <Badge key={tag} variant="secondary">{tag}</Badge>)}
        </div>
        
        <CardHeader className="p-0 mb-3">
          <Link to={`/posts/${post.$id}`}>
            <CardTitle className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-primary">{post.title}</CardTitle>
          </Link>
        </CardHeader>
        
        <p className="text-sm text-muted-foreground line-clamp-3 flex-grow">{snippet}</p>

        <div className="p-0 mt-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border flex justify-center items-center rounded-full ">
              <AvatarImage src={authService.getUserAvatar(post.authorName)} alt={post.authorName} />
              <AvatarFallback>{post.authorName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">{post.authorName || 'Unknown'}</p>
              <p className="text-xs text-muted-foreground">{formatDate(post.$createdAt)} · {calculateReadTime(post.content)}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons: Like and Comment Count */}
        <div className="border-t mt-4 pt-4">
            <PostStats post={post} onCommentClick={handleCommentClick} />
        </div>
      </div>
    </Card>
  )
}

export default PostCard