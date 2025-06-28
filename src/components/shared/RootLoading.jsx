import { Skeleton } from "@/components/ui/skeleton";

function RootLoading() {
  return (
   <div className="flex flex-col min-h-screen">
      {/* Skeleton Navbar */}
      <header className="bg-white border-b">
        <div className="container mx-auto p-4 flex justify-between items-center">
          {/* Logo Skeleton */}
          <Skeleton className="h-6 w-24" />
          {/* Nav Icons & Avatar Skeleton */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </header>

      {/* Skeleton Main Content */}
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="space-y-6">
          {/* Title Skeleton */}
          <Skeleton className="h-8 w-1/2" />
          {/* Content Skeletons (like blog cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Skeleton Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto py-6 px-4 flex justify-between items-center">
          <Skeleton className="h-4 w-1/3" />
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