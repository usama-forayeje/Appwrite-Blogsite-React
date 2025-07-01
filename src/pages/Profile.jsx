import { motion } from "framer-motion"
import { useUser } from "../hooks/useAuth"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import authService from "../api/appwrite/auth"
import { Edit, MapPin, Calendar, Users, BookOpen, Heart } from "lucide-react"

function Profile() {
  const { data: user } = useUser()

  if (!user) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-8 px-4 max-w-4xl"
    >
      {/* Profile Header */}
      <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="h-32 w-32 ring-4 ring-primary/20">
              <AvatarImage src={authService.getUserAvatar(user.name) || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl">
                {user.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-muted-foreground mb-4">{user.email}</p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Joined December 2023
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Earth
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-6">
                <Badge variant="secondary">Writer</Badge>
                <Badge variant="secondary">Tech Enthusiast</Badge>
                <Badge variant="secondary">Coffee Lover</Badge>
              </div>

              <Button className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-2">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary">12</h3>
            <p className="text-muted-foreground">Posts Written</p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-500">156</h3>
            <p className="text-muted-foreground">Total Likes</p>
          </CardContent>
        </Card>

        <Card className="text-center border-0 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-blue-500">89</h3>
            <p className="text-muted-foreground">Followers</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Published "Getting Started with React"</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Liked "Advanced JavaScript Concepts"</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Commented on "Web Development Trends"</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Profile
