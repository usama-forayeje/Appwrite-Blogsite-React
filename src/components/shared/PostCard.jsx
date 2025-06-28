
import { Link } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import fileService from '../../api/appwrite/file'

function PostCard({ post }) {
  return (
    <Card className="overflow-hidden">
      <Link to={`/posts/${post.$id}`}>
        <img
          src={fileService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <CardHeader>
          <CardTitle>{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Author: {post.userId}</p>
        </CardContent>
      </Link>
    </Card>
  )
}

export default PostCard