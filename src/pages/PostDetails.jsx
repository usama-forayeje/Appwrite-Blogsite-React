import { useParams, useNavigate, Link } from 'react-router';
import { useRef } from 'react';

import { useGetPost } from '@/hooks/usePosts';
import { useUser } from '@/hooks/useAuth';
import CommentSection from '@/components/shared/CommentSection';
import PostDetailsSkeleton from '@/components/shared/PostDetailsSkeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import authService from '@/api/appwrite/auth';
import fileService from '@/api/appwrite/file';
import { formatDate } from '@/lib/utils';
import { Edit, Trash } from 'lucide-react';
import { PostStats } from '../components';

export default function PostDetails() {
  const { slug: postId } = useParams();
  const navigate = useNavigate();
  const { data: currentUser } = useUser();
  const commentSectionRef = useRef(null);

  const { data: post, isLoading: isPostLoading, isError: isPostError } = useGetPost(postId);

  const handleCommentIconClick = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    commentSectionRef.current?.querySelector('textarea')?.focus();
  };
  
  const isPostAuthor = post && currentUser ? post.userId === currentUser.$id : false;

  if (isPostLoading) return <PostDetailsSkeleton />;
  if (isPostError) return <div className="text-center py-20 text-red-500">Failed to load the post. Please try again later.</div>;

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      {/* Breadcrumb Navigation */}
      <div className="mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="truncate">{post?.title}</span>
      </div>

      {/* Post Header */}
      <div className="w-full">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">{post?.title}</h1>
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4 text-muted-foreground">
                <Avatar className="h-12 w-12"><AvatarImage src={authService.getUserAvatar(post?.authorName)} /><AvatarFallback>{post?.authorName?.charAt(0)}</AvatarFallback></Avatar>
                <div>
                    <p className="font-semibold text-card-foreground">{post?.authorName}</p>
                    <p className="text-sm">{formatDate(post?.$createdAt)}</p>
                </div>
            </div>
            {/* Edit/Delete Buttons for Author */}
            {isPostAuthor && (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigate(`/edit-post/${post.$id}`)}>
                        <Edit className="h-4 w-4 mr-2"/> Edit
                    </Button>
                    {/* Delete button-এর জন্য একটি ডায়ালগ ব্যবহার করা ভালো, আপাতত শুধু বাটন */}
                    <Button variant="destructive" size="sm">
                        <Trash className="h-4 w-4 mr-2"/> Delete
                    </Button>
                </div>
            )}
        </div>
      </div>
      
      {/* Featured Image */}
      <img src={fileService.getFileView(post?.featuredImage).toString()} alt={post?.title} className="w-full rounded-xl mb-8 shadow-lg" />
      
      {/* Post Content with Typography styles */}
      <div className="prose dark:prose-invert max-w-none mb-10" dangerouslySetInnerHTML={{ __html: post?.content }} />
      
      {/* Tags */}
      {/* ... ট্যাগ দেখানোর কোড ... */}

      {/* Actions: Like and Comment */}
      <div className="flex items-center gap-6 border-t border-b py-4 mb-10">
        <PostStats post={post} onCommentClick={handleCommentIconClick} />
      </div>

      {/* Comment Section */}
      <div ref={commentSectionRef}>
        <CommentSection postId={postId} />
      </div>
    </div>
  );
}