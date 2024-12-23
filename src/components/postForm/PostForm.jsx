import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import service from "../../appwrite/appwrite.config";
import { useCallback, useEffect } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { Select } from "../Select";
import RTE from "../RTE";

function PostForm({ post }) {
  // Initializing the form with default values and functions
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "", // Default title for editing or empty for new post
      slug: post?.slug || "", // Default slug
      content: post?.content || "", // Default content
      status: post?.status || "active", // Default status
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData); // Get user data from Redux

  // Function to handle form submission
  const submit = async (data) => {
    try {
      // Check if an image file is uploaded
      const file = data.image?.[0] ? await service.uploadFile(data.image[0]) : null;

      if (post) {
        // If editing an existing post
        if (file) await service.deleteFile(post.image); // Delete old image if new one is uploaded
        const updatedPost = await service.updatePost(post.$id, {
          ...data,
          image: file ? file.$id : post.image, // Update image if exists
        });
        if (updatedPost) navigate(`/post/${updatedPost.$id}`); // Redirect to the updated post
      } else {
        // If creating a new post
        if (file) {
          const newPost = await service.createPost({
            ...data,
            image: file.$id,
            userId: userData.$id, // Associate the post with the current user
          });
          if (newPost) navigate(`/post/${newPost.$id}`); // Redirect to the new post
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error); // Handle errors
    }
  };

  // Function to transform title into a slug
  const slugTransform = useCallback((value) => {
    return value
      ? value.trim().toLowerCase().replace(/[^a-zA-Z0-9\s-]/g, "").replace(/\s+/g, "-") // Remove invalid characters and replace spaces with hyphens
      : "";
  }, []);

  // Automatically update slug when the title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") setValue("slug", slugTransform(value.title)); // Update slug field
    });
    return () => subscription.unsubscribe(); // Cleanup the subscription
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex flex-wrap p-6 space-y-6 bg-white rounded-lg shadow-lg"
    >
      {/* Main Content Section */}
      <div className="w-full px-2 lg:w-2/3">
        {/* Title Input */}
        <Input
          label="Title"
          placeholder="Enter the post title" // User-friendly placeholder
          className="mb-4 border border-gray-300 rounded-lg shadow-sm"
          {...register("title", { required: "Title is required" })} // Required validation
        />

        {/* Slug Input */}
        <Input
          label="Slug"
          placeholder="Auto-generated or edit manually"
          className="mb-4 border border-gray-300 rounded-lg shadow-sm"
          {...register("slug", { required: "Slug is required" })} // Required validation
          onInput={(e) => {
            setValue("slug", slugTransform(e.target.value), { shouldValidate: true }); // Manual slug update
          }}
        />

        {/* Rich Text Editor */}
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")} // Default content for editing
        />
      </div>

      {/* Sidebar Section */}
      <div className="w-full px-2 space-y-4 lg:w-1/3">
        {/* File Upload Input */}
        <Input
          label="Featured Image"
          type="file"
          className="border border-gray-300 rounded-lg shadow-sm"
          accept="image/png, image/jpg, image/jpeg, image/gif" // Allowed file types
          {...register("image", { required: !post && "Image is required" })} // Image required for new posts
        />

        {/* Existing Image Preview */}
        {post && (
          <div className="w-full mb-4">
            <img
              src={service.getFilePreview(post.image)} // Display the existing image
              alt={post.title}
              className="border border-gray-200 rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Status Select Dropdown */}
        <Select
          options={["active", "inactive"]} // Post status options
          label="Status"
          className="border border-gray-300 rounded-lg shadow-sm"
          {...register("status", { required: "Status is required" })} // Required validation
        />

        {/* Submit Button */}
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : "bg-blue-500"} // Dynamic button color
          className="w-full px-4 py-2 font-medium text-white transition rounded-lg shadow-lg hover:bg-opacity-90"
        >
          {post ? "Update Post" : "Create Post"} {/* Dynamic button text */}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
