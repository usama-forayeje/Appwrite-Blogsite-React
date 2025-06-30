import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import FileUpload from './FileUpload';
import RTE from './RTE';

function PostForm({ form, onFormSubmit, isSubmitting, post = null }) {
  const buttonText = post ? 'Update Post' : 'Publish Post';
  const submittingText = post ? 'Updating...' : 'Publishing...';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{post ? 'Edit Your Masterpiece' : 'Create a New Masterpiece'}</CardTitle>
            </CardHeader>
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
                    <FormControl>
                      <RTE
                        label="Your Story"
                        initialValue={field.value}
                        onEditorChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Area */}
        <div className="lg:col-span-1 space-y-6 sticky top-24">
          <Card>
            <CardHeader><CardTitle>Publish</CardTitle></CardHeader>
            <CardContent>
              <Button type="submit" className="w-full cursor-pointer" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isSubmitting ? submittingText : buttonText}
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
                      <FileUpload value={field.value} onChange={field.onChange} />
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
  );
}
export default PostForm