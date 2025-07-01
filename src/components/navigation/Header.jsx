import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Alert, AlertDescription } from "../ui/alert"
import { ThemeToggle } from "../ui/theme-toggle"
import { useUser, useLogout, useSendVerificationEmail } from "../../hooks/useAuth"
import authService from "../../api/appwrite/auth"
import { toast } from "sonner"
import { Bell, Menu, Search, User, LogOut, Settings, PlusCircle, MailWarning, Home, MessageSquare } from "lucide-react"

function Header({ onMenuClick }) {
  const { data: user } = useUser()
  const { mutate: logout } = useLogout()
  const { mutate: resendEmail, isPending: isSendingEmail } = useSendVerificationEmail()
  const router = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        toast.success("Logged out successfully!", {
          description: "See you soon!",
        })
        router("/login")
      },
    })
  }

  const handleResendEmail = () => {
    resendEmail(null, {
      onSuccess: () => {
        toast.success("Verification email sent!", {
          description: "Please check your inbox.",
        })
      },
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <>
      {user && !user.emailVerification && (
        <Alert className="rounded-none border-x-0 border-t-0 bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200">
          <MailWarning className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-center gap-4 w-full">
            Your email is not verified. Please check your inbox.
            <Button
              variant="link"
              className="h-auto p-0 text-yellow-900 dark:text-yellow-200 font-semibold underline"
              onClick={handleResendEmail}
              disabled={isSendingEmail}
            >
              {isSendingEmail ? "Sending..." : "Resend Email"}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
              <Menu className="h-5 w-5" />
            </Button>

            <Link to="/dashboard" className="flex items-center space-x-2">
              <span className="font-bold text-xl gradient-text">MyBlog</span>
            </Link>

            {/* Quick Navigation - Desktop */}
            <nav className="hidden lg:flex lg:gap-2">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link to="/create-post">
                <Button variant="ghost" size="sm" className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Create
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts..."
                  className="pl-9 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>

            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-2">
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <motion.span
                    className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full notification-pulse"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 }}
                  />
                </Button>

                {/* Messages */}
                <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                  <MessageSquare className="h-5 w-5" />
                </Button>

                {/* Create Post - Mobile */}
                <Link to="/create-post" className="sm:hidden">
                  <Button size="icon" variant="default">
                    <PlusCircle className="h-4 w-4" />
                  </Button>
                </Link>

                {/* Profile Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 ring-2 ring-primary/20 hover:ring-primary/40 transition-all">
                        <AvatarImage src={authService.getUserAvatar(user.name) || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => router("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router("/settings")}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/login">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
