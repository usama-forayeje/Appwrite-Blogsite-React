import { Link, useLocation } from "react-router"; 
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Sheet, SheetContent } from "../ui/sheet";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"; 
import { useUser } from "../../hooks/useAuth";
import authService from "../../api/appwrite/auth"; 
import { Home, PlusCircle, User, BookOpen, Heart, TrendingUp, Settings, Users, Bookmark, Bell, Loader2, X } from "lucide-react"; 


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
  const { data: user, isLoading: isUserLoading } = useUser();

  const SidebarContent = () => (
    // এই Div টি সাইডবারের ভিতরের সব কন্টেন্ট ধারণ করবে
    // h-full ক্লাসটি তার প্যারেন্ট div (যা ডেস্কটপে fixed থাকবে) এর সম্পূর্ণ উচ্চতা নেবে
    <div className="flex flex-col h-full bg-card shadow-lg dark:shadow-none">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <Link to="/dashboard" className="flex items-center space-x-2" onClick={onClose}>
          <span className="font-bold text-2xl gradient-text">MyBlog</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden">
          <X className="h-5 w-5" /> {/* মোবাইল সাইডবার বন্ধ করার বাটন */}
        </Button>
      </div>

      {/* User Profile Section (যদি যোগ করেন) */}
      {/* আমি আগের উত্তরে যে ইউজার প্রোফাইল সেকশন, স্ট্যাটস এবং লোডিং স্কেলিটন দিয়েছিলাম,
          সেগুলো যোগ করলে এখানে বসবে। আপাতত, আপনার দেওয়া কোড অনুযায়ী এটি খালি থাকবে। */}
      {user && !isUserLoading ? (
        <div className="p-4 border-b">
          <Link to="/profile" onClick={onClose} className="flex items-center gap-3 hover:bg-muted/50 rounded-md p-2 -m-2 transition-colors duration-200">
            <Avatar className="h-14 w-14">
              <AvatarImage src={authService.getUserAvatar(user.name) || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-base font-semibold truncate text-foreground">{user.name}</p>
              <p className="text-sm text-muted-foreground truncate">{user.email}</p>
            </div>
          </Link>
          {/* Quick Stats - আপাতত হার্ডকোড করা */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div><p className="text-lg font-bold text-primary">12</p><p className="text-xs text-muted-foreground">Posts</p></div>
            <div><p className="text-lg font-bold text-primary">156</p><p className="text-xs text-muted-foreground">Likes</p></div>
            <div><p className="text-lg font-bold text-primary">89</p><p className="text-xs text-muted-foreground">Following</p></div>
          </div>
        </div>
      ) : (
        // User loading skeleton if user is not loaded
        <div className="p-4 border-b animate-pulse">
            <div className="flex items-center gap-3">
                <div className="h-14 w-14 rounded-full bg-muted"></div>
                <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
            </div>
        </div>
      )}


      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link key={item.name} to={item.href} onClick={onClose}>
              <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 h-12 text-left rounded-lg group",
                    isActive ? "bg-primary/10 text-primary border-l-4 border-primary/50 shadow-sm" : "hover:bg-muted/60",
                  )}
                >
                  <item.icon className={cn("h-5 w-5 flex-shrink-0", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
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

      {/* Trending Section (যদি যোগ করেন) */}
      {/* আপনার দেওয়া কোডে এই সেকশনটিও নেই। যোগ করলে এখানে বসবে। */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Trending Topics</span>
        </div>
        <div className="space-y-2">
          {["React", "JavaScript", "Web Development", "UI/UX"].map((topic) => (
            <Button key={topic} variant="ghost" size="sm" className="w-full justify-start text-sm h-8 hover:bg-muted/60">
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
                    isActive ? "bg-primary/10 text-primary border-l-4 border-primary/50 shadow-sm" : "hover:bg-muted/60",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
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
      {/* Desktop Sidebar:
          - hidden lg:flex: ছোট স্ক্রিনে হাইড, বড় স্ক্রিনে ফ্লেক্স
          - lg:fixed lg:top-14 lg:bottom-16: Header (h-14) এর নিচে শুরু এবং Footer (h-16) এর উপর শেষ
            (আপনার Header ও Footer এর উচ্চতা অনুযায়ী 14 এবং 16 এর মান পরিবর্তন করতে পারেন)
          - lg:w-64: ফিক্সড প্রস্থ
          - lg:z-30: z-index যাতে Header এর নিচে থাকে
          - bg-card shadow-xl: সাইডবারের ব্যাকগ্রাউন্ড ও শ্যাডো
          - overflow-y-auto: যদি কন্টেন্ট বেশি হয়, তাহলে সাইডবার নিজেই স্ক্রল হবে
      */}
      <div className="hidden lg:fixed lg:top-14 lg:bottom-16 lg:w-64 lg:flex lg:flex-col lg:z-30 bg-card shadow-xl overflow-y-auto">
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

export default Sidebar