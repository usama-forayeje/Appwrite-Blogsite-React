import { useState } from "react"
import { Link } from "react-router"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ThemeToggle } from "../ui/theme-toggle"
import { Search, Menu, X } from "lucide-react"

function PublicHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search functionality
      console.log("Searching for:", searchQuery)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl gradient-text">MyBlog</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link
              to="/explore"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Explore
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stories..."
                className="pl-9 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          <ThemeToggle />

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t bg-background"
        >
          <div className="container mx-auto p-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stories..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-sm font-medium transition-colors hover:text-primary p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/explore"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                to="/about"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </nav>

            {/* Mobile Auth Buttons */}
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default PublicHeader
