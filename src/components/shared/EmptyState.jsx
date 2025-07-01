import { Link } from "react-router"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { FileText, PlusCircle, Search } from "lucide-react"

function EmptyState({ message, showCreateButton = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-20"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6"
      >
        <FileText className="h-12 w-12 text-muted-foreground" />
      </motion.div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold mb-2"
      >
        {message}
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-muted-foreground mb-8 max-w-md mx-auto"
      >
        {showCreateButton
          ? "Be the first to share your story with the community!"
          : "Try adjusting your search criteria or explore different topics."}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 justify-center"
      >
        {showCreateButton && (
          <Link to="/create-post">
            <Button size="lg" className="gap-2">
              <PlusCircle className="h-5 w-5" />
              Create Your First Post
            </Button>
          </Link>
        )}

        <Button variant="outline" size="lg" className="gap-2 bg-transparent">
          <Search className="h-5 w-5" />
          Explore Posts
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default EmptyState
