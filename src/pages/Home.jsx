import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { motion, AnimatePresence } from "framer-motion"
import { useGetPosts } from "../hooks/usePosts"
import { usePostStore } from "../store/usePostStore"
import PostCard from "../components/shared/PostCard"
import WelcomeHeader from "../components/shared/WelcomeHeader"
import EmptyState from "../components/shared/EmptyState"
import HomeSkeleton from "../components/shared/HomeSkeleton"
import CreatePostQuick from "../components/shared/CreatePostQuick"
import StoriesSection from "../components/shared/StoriesSection"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert"
import { Search, TrendingUp, Filter } from "lucide-react"

const POSTS_PER_PAGE = 6

function Home() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const { ref, inView } = useInView()

  const postsFromStore = usePostStore((state) => state.posts)
  const setPostsInStore = usePostStore((state) => state.setPosts)

  const { data: fetchedPostsData, isLoading, isError, error, refetch } = useGetPosts()

  useEffect(() => {
    if (fetchedPostsData?.documents) {
      setPostsInStore(fetchedPostsData.documents)
    }
  }, [fetchedPostsData, setPostsInStore])

  // Filter posts based on search and tags
  const filteredPosts =
    postsFromStore?.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
      return matchesSearch && matchesTag
    }) || []

  // Get all unique tags
  const allTags = Array.from(new Set(postsFromStore?.flatMap((post) => post.tags || []) || [])).slice(0, 10)

  if (isLoading) {
    return <HomeSkeleton />
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="mt-8">
          <AlertTitle>Failed to load posts</AlertTitle>
          <AlertDescription className="flex items-center justify-between">
            {error.message}
            <Button variant="secondary" onClick={() => refetch()}>
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <WelcomeHeader />

      {/* Stories Section */}
      <StoriesSection />

      {/* Quick Create Post */}
      <CreatePostQuick />

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8 space-y-4"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search posts by title or content..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-primary text-primary-foreground" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Tags Filter */}
        <AnimatePresence>
          {(showFilters || selectedTag) && allTags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex flex-wrap gap-2"
            >
              <Button
                variant={selectedTag === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(null)}
                className="h-8"
              >
                All Posts
              </Button>
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTag === tag ? "default" : "secondary"}
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                >
                  {tag}
                </Badge>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Posts Feed */}
      {filteredPosts.length > 0 ? (
        <motion.div layout className="space-y-6">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.$id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PostCard post={post} variant="feed" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <EmptyState
          message={searchTerm || selectedTag ? "No posts found" : "No posts available"}
          showCreateButton={true}
        />
      )}

      {/* Trending Section */}
      {!searchTerm && !selectedTag && filteredPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Trending Posts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.slice(0, 4).map((post) => (
              <PostCard key={`trending-${post.$id}`} post={post} variant="horizontal" />
            ))}
          </div>
        </motion.div>
      )}

      {/* Infinite Scroll Trigger */}
      <div ref={ref} className="h-10" />
    </div>
  )
}

export default Home
