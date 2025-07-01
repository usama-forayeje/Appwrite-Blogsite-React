import { motion } from "framer-motion"
import { Card } from "../ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { useUser } from "../../hooks/useAuth"
import { Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const mockStories = [
  { id: 1, name: "John Doe", avatar: "/placeholder.svg", hasStory: true },
  { id: 2, name: "Jane Smith", avatar: "/placeholder.svg", hasStory: true },
  { id: 3, name: "Mike Johnson", avatar: "/placeholder.svg", hasStory: true },
  { id: 4, name: "Sarah Wilson", avatar: "/placeholder.svg", hasStory: true },
  { id: 5, name: "Tom Brown", avatar: "/placeholder.svg", hasStory: true },
  { id: 6, name: "Lisa Davis", avatar: "/placeholder.svg", hasStory: true },
]

function StoriesSection() {
  const { data: user } = useUser()
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = (direction) => {
    const container = document.getElementById("stories-container")
    const scrollAmount = 200

    if (direction === "left") {
      container.scrollLeft -= scrollAmount
      setScrollPosition(container.scrollLeft - scrollAmount)
    } else {
      container.scrollLeft += scrollAmount
      setScrollPosition(container.scrollLeft + scrollAmount)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mb-8"
    >
      <div className="relative">
        <div
          id="stories-container"
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
          style={{ scrollBehavior: "smooth" }}
        >
          {/* Create Story */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-shrink-0">
            <Card className="relative w-24 h-36 overflow-hidden cursor-pointer border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors bg-gradient-to-b from-primary/5 to-primary/10">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-2">
                  <Plus className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-primary">Create Story</span>
              </div>
            </Card>
          </motion.div>

          {/* User Stories */}
          {mockStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Card className="relative w-24 h-36 overflow-hidden cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
                <img
                  src={`https://images.unsplash.com/photo-${1500000000000 + story.id}?w=100&h=150&fit=crop&crop=face`}
                  alt={story.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Story Ring */}
                <div className="absolute top-2 left-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5 story-ring">
                    <Avatar className="w-full h-full border-2 border-white">
                      <AvatarImage src={story.avatar || "/placeholder.svg"} alt={story.name} />
                      <AvatarFallback className="text-xs">
                        {story.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>

                {/* Name */}
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium truncate">{story.name}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="outline"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border-0 shadow-lg"
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border-0 shadow-lg"
          onClick={() => handleScroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

export default StoriesSection
