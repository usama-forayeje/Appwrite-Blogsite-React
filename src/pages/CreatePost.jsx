import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useLocation } from "react-router"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { useUser } from "../hooks/useAuth"
import { useUploadFile } from "../hooks/useFile"
import { postSchema } from "../schema/postSchema"
import { useCreatePost } from "../hooks/usePosts"
import PostForm from "../components/shared/PostForm"
import { ArrowLeft } from "lucide-react"
import { Button } from "../components/ui/button"
import { Link } from "react-router"

function CreatePost() {
  const navigate = useNavigate()
  const location = useLocation()
  const { data: user } = useUser()
  const { mutateAsync: uploadFile, isPending: isUploading } = useUploadFile()
  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost()

  const form = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: location.state?.quickContent || "",
      featuredImage: null,
      tags: "",
      status: "active",
    },
  })

  const onSubmit = async (values) => {
    try {
      let uploadedImage = null

      if (values.featuredImage && values.featuredImage[0]) {
        uploadedImage = await uploadFile(values.featuredImage[0])
        if (!uploadedImage) throw new Error("Image upload failed.")
      }

      const tagsArray = values.tags
        ? values.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
        : []

      const postData = {
        title: values.title,
        content: values.content,
        featuredImage: uploadedImage?.$id || null,
        userId: user.$id,
        authorName: user.name,
        likes: [],
        commentCount: 0,
        status: "active",
        tags: tagsArray,
        slug: values.title
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-")
          .slice(0, 36),
      }

      const newPost = await createPost(postData)
      toast.success("Post created successfully!", {
        description: "Your story has been shared with the community.",
      })
      navigate(`/posts/${newPost.$id}`)
    } catch (error) {
      toast.error("Failed to create post", {
        description: error.message,
      })
    }
  }

  const isSubmitting = isUploading || isCreating

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-8 px-4 max-w-4xl"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold gradient-text">Create New Post</h1>
          <p className="text-muted-foreground mt-1">Share your thoughts with the world</p>
        </div>
      </div>

      <PostForm form={form} onFormSubmit={onSubmit} isSubmitting={isSubmitting} />
    </motion.div>
  )
}

export default CreatePost
