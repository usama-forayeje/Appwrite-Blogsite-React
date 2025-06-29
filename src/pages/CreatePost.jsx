import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { useUser } from '../hooks/useAuth';
import { useUploadFile } from '../hooks/useFile';
import { postSchema } from '../schema/postSchema';
import TiptapEditor from '../components/shared/TiptapEditor';
import FileUpload from '../components/shared/FileUpload';
import { useCreatePost } from '../hooks/usePosts';
export default function CreatePost() {
  const navigate = useNavigate();
  const { data: user } = useUser();
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: { title: '', content: '', featuredImage: null, tags: '' },
  });

  const onSubmit = async (values) => {
    try {
      const uploadedImage = await uploadFile(values.featuredImage[0]);
      if (!uploadedImage) throw new Error("Image upload failed.");

      const tagsArray = values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

      const postData = {
        title: values.title,
        content: values.content,
        featuredImage: uploadedImage.$id,
        userId: user.$id,
        authorName: user.name,
        likes: [],
        commentCount: 0,
        status: 'active',
        tags: tagsArray,
        slug: values.title.toLowerCase().trim().replace(/\s+/g, '-').slice(0, 36),
      };

      const newPost = await createPost(postData);
      toast.success("Post created successfully!");
      navigate(`/posts/${newPost.$id}`);
    } catch (error) {
      toast.error("Failed to create post", { description: error.message });
    }
  };

  const isSubmitting = isUploading || isCreating;

  return (
    <div className="container mx-auto py-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Create a New Masterpiece</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Post Title</FormLabel>
                      <FormControl><Input placeholder="Enter a captivating title..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Story</FormLabel>
                      <FormControl>
                        <TiptapEditor content={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6 sticky top-24">
            <Card>
              <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
              <CardContent>
                <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? 'Publishing...' : 'Publish Post'}
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Featured Image</CardTitle></CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>Separate tags with a comma.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="React, Appwrite, Javascript" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

          </div>
        </form>
      </Form>
    </div>
  );
}