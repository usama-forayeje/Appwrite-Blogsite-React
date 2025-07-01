import { motion } from "framer-motion"
import { Skeleton } from "../ui/skeleton"
import { Loader2 } from "lucide-react"

function RootLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-6 w-6 lg:hidden" />
            <Skeleton className="h-6 w-24" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-64 hidden md:block" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Skeleton */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r bg-card p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 border-b">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>

              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Skeleton */}
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
              {/* Loading Animation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="mx-auto mb-4"
                >
                  <Loader2 className="h-12 w-12 text-primary" />
                </motion.div>
                <h2 className="text-xl font-semibold gradient-text">MyBlog</h2>
                <p className="text-muted-foreground mt-2">Loading your personalized feed...</p>
              </motion.div>

              {/* Content Skeletons */}
              <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-card rounded-lg p-6 border">
                    <div className="flex items-center gap-3 mb-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-4" />
                    <Skeleton className="h-48 w-full mb-4" />
                    <div className="flex justify-between">
                      <div className="flex gap-4">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                      </div>
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer Skeleton */}
      <footer className="border-t mt-auto">
        <div className="container mx-auto py-6 px-4 flex justify-between items-center">
          <Skeleton className="h-4 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </footer>
    </div>
  )
}

export default RootLoading
