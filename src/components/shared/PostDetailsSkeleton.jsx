import { Skeleton } from "../ui/skeleton"
import { Card, CardContent } from "../ui/card"

function PostDetailsSkeleton() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      {/* Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Article Header */}
      <div className="mb-8">
        {/* Tags */}
        <div className="flex gap-2 mb-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-18" />
        </div>

        {/* Title */}
        <Skeleton className="h-12 w-full mb-2" />
        <Skeleton className="h-12 w-3/4 mb-6" />

        {/* Author and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <Skeleton className="h-[400px] w-full rounded-xl mb-8" />

      {/* Content */}
      <div className="space-y-4 mb-10">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>

      {/* Stats */}
      <div className="flex items-center gap-6 border-t border-b py-6 mb-10">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
      </div>

      {/* Comments Section */}
      <div className="space-y-6">
        <Skeleton className="h-6 w-32" />

        {/* Comment Form */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1">
                <Skeleton className="h-24 w-full mb-4" />
                <div className="flex justify-end">
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments */}
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-8 w-8" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-3" />
                  <div className="flex gap-4">
                    <Skeleton className="h-6 w-12" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default PostDetailsSkeleton
