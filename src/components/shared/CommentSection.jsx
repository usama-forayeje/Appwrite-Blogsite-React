import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { useUser } from "../../hooks/useAuth"
import { useGetComments, useCreateComment } from "../../hooks/useComments"
import { commentSchema } from "../../schema/postSchema"
import authService from "../../api/appwrite/auth"
import { formatDate } from "../../lib/utils"
import { MessageSquare, Send, Heart, Reply, MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

function CommentSection({ postId }) {
  const { data: user } = useUser()
  const { data: commentsData, isLoading } = useGetComments(postId)
  const { mutate: createComment, isPending } = useCreateComment()
  const [replyingTo, setReplyingTo] = useState(null)

  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: "" },
  })

  const comments = commentsData?.documents || []

  const onSubmit = (values) => {
    if (!user) {
      toast.info("Please sign in to comment")
      return
    }

    createComment(
      {
        postId,
        content: values.content,
        authorName: user.name,
        userId: user.$id,
      },
      {
        onSuccess: () => {
          form.reset()
          toast.success("Comment posted successfully!")
        },
        onError: (error) => {
          toast.error("Failed to post comment", {
            description: error.message,
          })
        },
      },
    )
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3 p-4 bg-muted/50 rounded-lg animate-pulse">
            <div className="w-10 h-10 bg-muted rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-4 bg-muted rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      {user ? (
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                    <AvatarImage src={authService.getUserAvatar(user.name) || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Share your thoughts..."
                              className="min-h-[100px] resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isPending} className="gap-2">
                    {isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Posting...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Post Comment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-0 shadow-md">
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground mb-4">Sign in to join the conversation</p>
            <Button asChild>
              <a href="/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.div
              key={comment.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                      <AvatarImage
                        src={authService.getUserAvatar(comment.authorName) || "/placeholder.svg"}
                        alt={comment.authorName}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {comment.authorName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-sm">{comment.authorName}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(comment.$createdAt)}</p>
                        </div>

                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="text-sm leading-relaxed mb-3">{comment.content}</p>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-2 h-8 px-2">
                          <Heart className="h-3 w-3" />
                          <span className="text-xs">0</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 h-8 px-2"
                          onClick={() => setReplyingTo(comment.$id)}
                        >
                          <Reply className="h-3 w-3" />
                          <span className="text-xs">Reply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {comments.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No comments yet</h3>
            <p className="text-muted-foreground">Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentSection
