import { Link } from "react-router"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { useUser } from "../../hooks/useAuth"
import { PlusCircle, Sparkles, TrendingUp } from "lucide-react"

function WelcomeHeader() {
  const { data: user } = useUser()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-8"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute -top-4 -right-4 text-yellow-500"
        >
          <Sparkles className="h-6 w-6" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">
          Welcome back, {user?.name?.split(" ")[0]}! 👋
        </h1>

        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Ready to share something amazing with the community today?
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link to="/create-post">
            <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all">
              <PlusCircle className="h-5 w-5" />
              Share Your Story
            </Button>
          </Link>

          <Button variant="outline" size="lg" className="gap-2 bg-transparent">
            <TrendingUp className="h-5 w-5" />
            Explore Trending
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mt-8 p-4 rounded-lg bg-muted/30">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">12</p>
            <p className="text-xs text-muted-foreground">Your Posts</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">156</p>
            <p className="text-xs text-muted-foreground">Total Likes</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">89</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default WelcomeHeader
