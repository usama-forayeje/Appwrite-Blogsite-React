import { PostCard } from '../components';
import { useGetPosts } from '../hooks/usePosts';
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

function Home() {
  const { data: posts, isLoading, isError, error } = useGetPosts();

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts?.documents.map((post) => (
          <PostCard key={post.$id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Home