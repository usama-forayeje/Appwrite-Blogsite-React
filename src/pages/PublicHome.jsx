import { useState, useEffect } from "react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { useGetPosts } from "../hooks/usePosts"
import { usePostStore } from "../store/usePostStore"
import PostCard from "../components/shared/PostCard"
import HomeSkeleton from "../components/shared/HomeSkeleton"
import EmptyState from "../components/shared/EmptyState"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Badge } from "../components/ui/badge"
import { Search, TrendingUp, Users, MessageSquare, Heart, Sparkles } from "lucide-react"

function PublicHome() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState(null)

  const postsFromStore = usePostStore((state) => state.posts)
  const setPostsInStore = usePostStore((state) => state.setPosts)

  const { data: fetchedPostsData, isLoading, isError, error } = useGetPosts()

  useEffect(() => {
    if (fetchedPostsData?.documents) {
      setPostsInStore(fetchedPostsData.documents)
    }
  }, [fetchedPostsData, setPostsInStore])

  // Filter posts
  const filteredPosts =
    postsFromStore?.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = !selectedTag || post.tags?.includes(selectedTag)
      return matchesSearch && matchesTag
    }) || []

  // Get unique tags
  const allTags = Array.from(new Set(postsFromStore?.flatMap((post) => post.tags || []) || [])).slice(0, 8)

  if (isLoading) {
    return <HomeSkeleton />
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-destructive mb-4">Failed to load posts</h2>
          <p className="text-muted-foreground mb-6">{error?.message}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto max-w-4xl"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute -top-4 -right-4 text-yellow-500"
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold gradient-text mb-6">Welcome to MyBlog</h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover amazing stories, connect with passionate writers, and share your own journey with our vibrant
              community
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/signup">
                <Button size="lg" className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all">
                  Join Our Community
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-3 shadow-lg hover:shadow-xl transition-all bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">1K+</span>
                </div>
                <p className="text-muted-foreground">Active Writers</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <MessageSquare className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">{postsFromStore?.length || 0}</span>
                </div>
                <p className="text-muted-foreground">Stories Shared</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <Heart className="h-6 w-6 text-primary mr-2" />
                  <span className="text-2xl font-bold">10K+</span>
                </div>
                <p className="text-muted-foreground">Likes Given</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Posts Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Latest Stories</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the most recent posts from our community of writers
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 space-y-4"
          >
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                className="pl-9 h-12"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                  className="h-8"
                >
                  All Stories
                </Button>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </motion.div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.slice(0, 9).map((post, index) => (
                <motion.div
                  key={post.$id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <PostCard post={post} showActions={false} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              message={searchTerm || selectedTag ? "No stories found" : "No stories available"}
              showCreateButton={false}
            />
          )}

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Share Your Story?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of writers and start your blogging journey today
            </p>
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Section */}
      {filteredPosts.length > 3 && !searchTerm && !selectedTag && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-3xl font-bold">Trending Stories</h2>
              </div>
              <p className="text-muted-foreground">Most popular posts this week</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredPosts.slice(0, 4).map((post, index) => (
                <motion.div
                  key={`trending-${post.$id}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <PostCard post={post} variant="horizontal" showActions={false} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default PublicHome
