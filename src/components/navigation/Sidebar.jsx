"use client"

import { Link, useLocation } from "react-router"
import { motion } from "framer-motion"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Sheet, SheetContent } from "../ui/sheet"
import { Badge } from "../ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { useUser } from "../../hooks/useAuth"
import authService from "../../api/appwrite/auth"
import { Home, PlusCircle, User, BookOpen, Heart, TrendingUp, Settings, X, Users, Bookmark, Bell } from "lucide-react"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Create Post", href: "/create-post", icon: PlusCircle },
  { name: "My Posts", href: "/my-posts", icon: BookOpen },
  { name: "Liked Posts", href: "/liked-posts", icon: Heart },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Following", href: "/following", icon: Users },
  { name: "Notifications", href: "/notifications", icon: Bell, badge: 3 },
]

const bottomNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
]

function Sidebar({ open, onClose }) {
  const location = useLocation()
  const { data: user } = useUser()

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-card">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="font-bold text-xl gradient-text">MyBlog</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={authService.getUserAvatar(user.name) || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div>
              <p className="text-lg font-bold text-primary">12</p>
              <p className="text-xs text-muted-foreground">Posts</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">156</p>
              <p className="text-xs text-muted-foreground">Likes</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary">89</p>
              <p className="text-xs text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link key={item.name} to={item.href} onClick={onClose}>
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12 text-left",
                    isActive && "bg-primary/10 text-primary border-primary/20 shadow-sm",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.name}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Trending Section */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Trending Topics</span>
        </div>
        <div className="space-y-2">
          {["React", "JavaScript", "Web Development", "UI/UX"].map((topic) => (
            <Button key={topic} variant="ghost" size="sm" className="w-full justify-start text-xs h-8">
              #{topic}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t space-y-2">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <Link key={item.name} to={item.href} onClick={onClose}>
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12",
                    isActive && "bg-primary/10 text-primary border-primary/20",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r">
          <SidebarContent />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Sidebar
