import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router'; 
import { toast } from 'sonner';
import { useUser } from '../hooks/useAuth';
import { useUploadFile } from '../hooks/useFile';
import { postSchema } from '../schema/postSchema';
import { useCreatePost } from '../hooks/usePosts';
import PostForm from '../components/shared/PostForm'; 

function CreatePost() {
    const navigate = useNavigate();
    const { data: user } = useUser();
    const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile();
    const { mutateAsync: createPost, isPending: isCreating } = useCreatePost();

    const form = useForm({
        resolver: zodResolver(postSchema),
        defaultValues: {
            title: '',
            content: '',
            featuredImage: null,
            tags: '',
            status: 'active',
        },
    });

    const onSubmit = async (values) => {
        try {
            const uploadedImage = await uploadFile(values.featuredImage[0]);
            if (!uploadedImage) throw new Error("Image upload failed.");

            const tagsArray = values.tags ? values.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];

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
                slug: values.title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').slice(0, 36),
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
            <PostForm
                form={form}
                onFormSubmit={onSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}

export default CreatePost;