import { Link } from "react-router"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Github, Twitter, Linkedin, Heart } from "lucide-react"

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl gradient-text">MyBlog</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connect, share, and inspire through the power of storytelling.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span className="text-sm text-muted-foreground">for writers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link
                to="/dashboard"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/create-post"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Create Post
              </Link>
              <Link to="/explore" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Explore
              </Link>
              <Link to="/trending" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Trending
              </Link>
            </div>
          </div>

          {/* Community */}
          <div className="space-y-4">
            <h3 className="font-semibold">Community</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link
                to="/guidelines"
                className="block text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Community Guidelines
              </Link>
              <Link to="/help" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Help Center
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} MyBlog. All rights reserved.
          </div>

          <div className="flex items-center gap-2 mt-4 sm:mt-0">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="h-4 w-4" />
              </Button>
            </motion.a>

            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
            </motion.a>

            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="h-4 w-4" />
              </Button>
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
