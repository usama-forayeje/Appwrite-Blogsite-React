import { useParams, useNavigate, Link } from 'react-router';
import { useGetPost } from '@/hooks/usePosts';
import { useUser } from '@/hooks/useAuth';
import CommentSection from '@/components/shared/CommentSection';
import PostDetailsSkeleton from '@/components/shared/PostDetailsSkeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {AlertDialog, AlertDialogAction, AlertDialogTrigger, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import authService from '@/api/appwrite/auth';
import fileService from '@/api/appwrite/file';
import { formatDate } from '@/lib/utils';
import { Edit, Trash , Heart, MessageCircle,MessageSquare} from 'lucide-react';
import { useDeletePost } from '../hooks/usePosts';
import { toast } from 'sonner';

export default function PostDetails() {
  const { slug: postId } = useParams();
  const navigate = useNavigate();
  const { data: currentUser } = useUser();
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();
  const { data: post, isLoading, isError } = useGetPost(postId);
  const isPostAuthor = post && currentUser ? post.userId === currentUser.$id : false;


  const handleDelete = async () => {
    try {
      await deletePost(post);
      toast.success("Post deleted successfully!");
      navigate('/');
    } catch (error) {
      toast.error("Failed to delete post.");
      throw error;
    }
  };
  if (isLoading) return <PostDetailsSkeleton />;
  if (isError) return <div className="text-center py-20 text-red-500">Failed to load the post.</div>;


  if (isLoading) return <PostDetailsSkeleton />;
  if (isError) return <div className="text-center py-20 text-red-500">Failed to load the post.</div>;

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <div className="mb-8 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">&gt;</span>
        <span className="truncate">{post?.title}</span>
      </div>

      <article>
        <header className="mb-8">
          {/* NEW: Tags rendering */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post?.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight">{post?.title}</h1>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-12 w-12"><AvatarImage src={authService.getUserAvatar(post?.authorName)} /><AvatarFallback>{post?.authorName?.charAt(0)}</AvatarFallback></Avatar>
              <div>
                <p className="font-semibold text-card-foreground">{post?.authorName}</p>
                <p className="text-sm">{formatDate(post?.$createdAt)}</p>
              </div>
            </div>

            {/* NEW: Edit/Delete Buttons with Delete Dialog */}
            {isPostAuthor && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate(`/edit-post/${post.$id}`)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={isDeleting}>
                      <Trash className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Continue'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </header>

        <img src={fileService.getFileView(post?.featuredImage).toString()} alt={post?.title} className="w-full rounded-xl mb-8 shadow-lg" />

        {/* Post Content */}
        <div className="prose dark:prose-invert max-w-none mb-10" dangerouslySetInnerHTML={{ __html: post?.content }} />

        {/* NEW: Stats like Likes/Comments can be shown here if needed */}
        <div className="flex items-center gap-6 border-t border-b py-4 mb-10">
          <span className="flex items-center gap-2 text-muted-foreground"><Heart className="h-5 w-5" /> {post.likes.length} Likes</span>
          <span className="flex items-center gap-2 text-muted-foreground"><MessageSquare className="h-5 w-5" /> {post.commentCount} Comments</span>
        </div>

        <CommentSection postId={postId} />
      </article>
    </div>
  );
}