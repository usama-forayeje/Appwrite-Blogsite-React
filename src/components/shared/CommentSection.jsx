
import CommentForm from './CommentForm';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import authService from '@/api/appwrite/auth';
import { formatDate } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetComments } from '../../hooks/useComments';


function CommentSection({ postId }) {
  const { data: comments, isLoading } = useGetComments(postId);

  return (
    <div className="mt-6 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Comments ({comments?.total || 0})</h3>
      
      {/* নতুন কমেন্ট করার ফর্ম */}
      <div className="mb-6">
        <CommentForm postId={postId} />
      </div>

      {/* কমেন্টের তালিকা */}
      <div className="space-y-6">
        {isLoading && (
            [...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4"><Skeleton className="h-10 w-10 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[250px]" /><Skeleton className="h-4 w-[200px]" /></div></div>
            ))
        )}
        {comments?.documents.map(comment => (
          <div key={comment.$id} className="flex items-start gap-4">
            <Avatar className="h-9 w-9"><AvatarImage src={authService.getUserAvatar(comment.authorName)} /><AvatarFallback>{comment.authorName.charAt(0)}</AvatarFallback></Avatar>
            <div className="flex-grow">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm font-semibold">{comment.authorName}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{formatDate(comment.$createdAt)}</p>
            </div>
          </div>
        ))}
         {!isLoading && comments?.total === 0 && (
          <p className="text-sm text-center text-muted-foreground py-4">Be the first to comment!</p>
        )}
      </div>
    </div>
  );
}

export default CommentSection