import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/useAuth';
import { commentSchema } from '../../schema/postSchema';
import { Send, Loader2 } from 'lucide-react';
import authService from '../../api/appwrite/auth';
import { useCreateComment } from '../../hooks/useComments';

function CommentForm({ postId }) {
  const { data: currentUser } = useUser();
  const { mutate: createComment, isPending } = useCreateComment();

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const onSubmit = (values) => {
    createComment({
      content: values.content,
      postId: postId,
      authorId: currentUser.$id,
      authorName: currentUser.name,
    }, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4 w-full">
        <Avatar className="h-9 w-9 mt-1">
          <AvatarImage src={authService.getUserAvatar(currentUser?.name)} />
          <AvatarFallback>{currentUser?.name?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-grow relative">
          <Textarea placeholder="Write a comment..." {...form.register("content")} className="pr-12" />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2" disabled={isPending}>
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default CommentForm