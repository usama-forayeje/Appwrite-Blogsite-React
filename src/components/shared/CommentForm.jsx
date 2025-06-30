import { zodResolver } from '@hookform/resolvers/zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm,  } from 'react-hook-form';
import { useUser } from '../../hooks/useAuth';
import { commentSchema } from '../../schema/postSchema';
import {  Loader2 } from 'lucide-react';
import authService from '../../api/appwrite/auth';
import { useCreateComment } from '../../hooks/useComments';
import { toast } from 'sonner';

function CommentForm({ postId }) {
  const { data: currentUser } = useUser();
  const { mutate: createComment, isPending } = useCreateComment();

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  });

  const onSubmit =  (values) => {
    try {
       createComment({
        postId,
        content: values.content,
        authorName: currentUser.name,
        userId: currentUser.$id,
      });
      form.reset();
      toast.success("Comment posted!");
    } catch (error) {
      toast.error("Failed to post comment.");
      throw error;
    }
  };

  if (!currentUser) return <p className="text-sm text-muted-foreground">Please <a href="/login" className="text-primary underline">log in</a> to comment.</p>;

  return (
    <div className="flex items-start gap-4">
            <Avatar className="h-9 w-9 mt-1">
                <AvatarImage src={authService.getUserAvatar(currentUser.name)} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        placeholder="Add a comment..."
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end mt-2">
                        <Button type="submit" disabled={isPending}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Post Comment
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
  )
}

export default CommentForm