import { useState } from "react"
import { useNavigate } from "react-router"
import { motion } from "framer-motion"
import { Card, CardContent } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useUser } from "../../hooks/useAuth"
import authService from "../../api/appwrite/auth"
import { PlusCircle, ImageIcon, Video, Smile, MapPin } from "lucide-react"

function CreatePostQuick() {
  const { data: user } = useUser()
  const navigate = useNavigate()
  const [content, setContent] = useState("")

  const handleCreatePost = () => {
    navigate("/create-post")
  }

  const handleQuickPost = () => {
    if (content.trim()) {
      // Handle quick post creation
      navigate("/create-post", { state: { quickContent: content } })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <Card className="border-0 shadow-md bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-primary/20">
              <AvatarImage src={authService.getUserAvatar(user?.name) || "/placeholder.svg"} alt={user?.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Textarea
                placeholder={`What's on your mind, ${user?.name?.split(" ")[0]}?`}
                className="min-h-[60px] resize-none border-0 bg-muted/50 focus:bg-background transition-colors"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onClick={handleCreatePost}
              />

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-green-600 hover:text-green-700 hover:bg-green-50 dark:hover:bg-green-950"
                    onClick={handleCreatePost}
                  >
                    <ImageIcon className="h-4 w-4" />
                    Photo
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                    onClick={handleCreatePost}
                  >
                    <Video className="h-4 w-4" />
                    Video
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 dark:hover:bg-yellow-950"
                    onClick={handleCreatePost}
                  >
                    <Smile className="h-4 w-4" />
                    Feeling
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                    onClick={handleCreatePost}
                  >
                    <MapPin className="h-4 w-4" />
                    Location
                  </Button>
                </div>

                <Button
                  onClick={content.trim() ? handleQuickPost : handleCreatePost}
                  className="gap-2"
                  disabled={!content.trim() && content !== ""}
                >
                  <PlusCircle className="h-4 w-4" />
                  {content.trim() ? "Post" : "Create Post"}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default CreatePostQuick
