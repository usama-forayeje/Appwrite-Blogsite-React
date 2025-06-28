import { EmptyState, HomeSkeleton, PostCard, WelcomeHeader } from '../components';
import { useGetPosts } from '../hooks/usePosts';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from 'react';
import { Search } from 'lucide-react';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: posts, isLoading, isError, error, refetch } = useGetPosts();

  const filteredPosts = posts?.documents?.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <WelcomeHeader />
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search posts by title..." className="pl-9" disabled />
        </div>
        <HomeSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-4">
        <WelcomeHeader />
        <Alert variant="destructive" className="mt-8">
            <AlertTitle>Failed to load posts</AlertTitle>
            <AlertDescription className="flex items-center justify-between">
                {error.message}
                <Button variant="secondary" onClick={() => refetch()}>Try Again</Button>
            </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
        <WelcomeHeader />

        {/* Search Input */}
        <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
                placeholder="Search posts by title..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>

        {/* Posts Grid or Empty State */}
        {filteredPosts && filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                    <PostCard key={post.$id} post={post} />
                ))}
            </div>
        ) : (
            <EmptyState message={searchTerm ? "No posts found for your search." : "No posts available yet."} />
        )}
    </div>
  )
}

export default Home