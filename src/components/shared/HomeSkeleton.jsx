import { Skeleton } from "../ui/skeleton"
import { Card, CardContent } from "../ui/card"

function HomeSkeleton() {
  return (
    <div className="container mx-auto p-4 max-w-4xl">
      {/* Welcome Header Skeleton */}
      <div className="text-center mb-8">
        <Skeleton className="h-10 w-96 mx-auto mb-4" />
        <Skeleton className="h-6 w-[500px] mx-auto mb-6" />
        <div className="flex gap-3 justify-center mb-8">
          <Skeleton className="h-12 w-40" />
          <Skeleton className="h-12 w-40" />
        </div>
        <Skeleton className="h-20 w-80 mx-auto" />
      </div>

      {/* Stories Skeleton */}
      <div className="mb-8">
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-24 h-36 rounded-lg flex-shrink-0" />
          ))}
        </div>
      </div>

      {/* Create Post Skeleton */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-16 w-full mb-4" />
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-12 w-full mb-4" />
        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" />
          ))}
        </div>
      </div>

      {/* Posts Skeleton */}
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-8 w-8" />
              </div>

              <div className="flex gap-2 mb-3">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-20" />
              </div>

              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />

              <Skeleton className="h-64 w-full mb-4" />

              <div className="flex justify-between border-t pt-4">
                <div className="flex gap-4">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HomeSkeleton
