import { Link, Navigate, Outlet, useLocation } from "react-router"
import { useUser } from "../hooks/useAuth"
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "../components/ui/card"

function AuthLayout() {
  const { data: user, isLoading } = useUser()
  const isAuthenticated = !!user
  const location = useLocation()

  if (isAuthenticated && location.pathname !== "/verify-email") {
    return <Navigate to="/dashboard" replace />
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h2 className="text-xl font-semibold gradient-text">MyBlog</h2>
          <p className="text-muted-foreground mt-2">Loading...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center"
        >
          <Card className="w-full max-w-md p-8 shadow-2xl border-0 glass-effect">
            <div className="text-center mb-8">
              <Link to="/" className="inline-block">
                <h1 className="text-3xl font-bold gradient-text">MyBlog</h1>
              </Link>
              <p className="text-muted-foreground mt-2">Connect, Share, Inspire</p>
            </div>
            <Outlet />
            <div className="mt-6 text-center text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="underline hover:text-primary">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Right side - Hero Image */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:block"
        >
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
              alt="People connecting and sharing stories"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h2 className="text-3xl font-bold mb-2">Join the Community</h2>
              <p className="text-lg opacity-90">Share your stories, connect with like-minded people</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AuthLayout
