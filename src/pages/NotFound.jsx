import { Link } from "react-router"
import { motion } from "framer-motion"
import { Button } from "../components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md mx-auto"
      >
        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} className="mb-8">
          <h1 className="text-9xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/dashboard">
            <Button size="lg" className="gap-2">
              <Home className="h-5 w-5" />
              Go Home
            </Button>
          </Link>

          <Button variant="outline" size="lg" onClick={() => window.history.back()} className="gap-2 bg-transparent">
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
