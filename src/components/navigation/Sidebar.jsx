import { Link, useLocation } from "react-router"; // Changed to react-router-dom for clarity
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import { Badge } from "../ui/badge";
import {
  Home,
  PlusCircle,
  User,
  BookOpen,
  Heart,
  TrendingUp,
  Settings,
  Users,
  Bookmark,
  Bell,
  X,
} from "lucide-react";

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Create Post", href: "/create-post", icon: PlusCircle },
  { name: "My Posts", href: "/my-posts", icon: BookOpen },
  { name: "Liked Posts", href: "/liked-posts", icon: Heart },
  { name: "Bookmarks", href: "/bookmarks", icon: Bookmark },
  { name: "Following", href: "/following", icon: Users },
  { name: "Notifications", href: "/notifications", icon: Bell },
];

const bottomNavigation = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

function Sidebar({ open, onClose }) {
  const location = useLocation();

  const SidebarContent = () => (
    // Added 'flex-1' and 'overflow-hidden' to ensure content fills the height and hides scrollbar
    <div className="flex flex-col h-full bg-card shadow-lg">
      {/* Main Navigation */}
      {/* 'overflow-y-auto' for scrollable content, 'scrollbar-hide' to hide the scrollbar */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href} onClick={onClose}>
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12 text-left rounded-lg group",
                    isActive
                      ? "bg-primary/10 text-primary border-l-4 border-primary/50 shadow-sm"
                      : "hover:bg-muted/60"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span className="flex-1 text-base">{item.name}</span>
                  {item.name === "Notifications" && (
                    <Badge variant="destructive" className="ml-auto animate-pulse-slow">
                      3
                    </Badge>
                  )}
                </Button>
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* Trending Section */}
      {/* 'overflow-y-auto' for scrollable content, 'scrollbar-hide' to hide the scrollbar */}
      <div className="p-4 border-t overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Trending Topics
          </span>
        </div>
        <div className="space-y-2">
          {[
            "React",
            "JavaScript",
            "Web Development",
            "Node.js",
            "Python",
            "UI/UX",
          ].map((topic) => (
            <Button
              key={topic}
              variant="ghost"
              size="sm"
              className="w-full justify-start text-sm h-8 hover:bg-muted/60"
            >
              #{topic}
            </Button>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="p-4 border-t space-y-2">
        {bottomNavigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href} onClick={onClose}>
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12 rounded-lg group",
                    isActive
                      ? "bg-primary/10 text-primary border-l-4 border-primary/50 shadow-sm"
                      : "hover:bg-muted/60"
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  <span className="text-base">{item.name}</span>
                </Button>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:z-30 bg-card shadow-xl h-screen top-0 sticky">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar (Sheet) */}
      <Sheet open={open} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-64 bg-card shadow-xl">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Sidebar;