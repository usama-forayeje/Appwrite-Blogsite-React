import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { postSchema } from '../schema/postSchema';
import { useCreatePost } from '../hooks/usePosts';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

function CreatePost() {
  const { mutate: createPost, isPending } = useCreatePost();
  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { title: '', content: '' },
  });

  const onSubmit = (values) => {
    createPost(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField control={form.control} name="title" />
        <FormField control={form.control} name="content" />
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : 'Submit Post'}
        </Button>
      </form>
    </Form>
  );
}

export default CreatePost