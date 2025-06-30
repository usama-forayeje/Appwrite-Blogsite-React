import { EmptyState, HomeSkeleton, PostCard, WelcomeHeader } from '../components';
import { useGetPosts } from '../hooks/usePosts';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isStoreInitialized, setIsStoreInitialized] = useState(false);

  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);

  const { isLoading, isError, error, refetch, data: fetchedPosts } = useGetPosts();

  useEffect(() => {
    if (fetchedPosts?.documents && !isStoreInitialized) {
      setPosts(fetchedPosts.documents);
      setIsStoreInitialized(true);
    }
  }, [fetchedPosts, isStoreInitialized, setPosts]);

  const filteredPosts = posts?.filter(post =>
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
      {/* <WelcomeHeader /> */}
      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts by title..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredPosts && filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard key={post.$id} post={post} />
          ))}
        </div>
      ) : (
        <EmptyState message={searchTerm ? "No posts found." : "No posts available."} />
      )}
    </div>
  );
}

export default Home