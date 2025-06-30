import { EmptyState, HomeSkeleton, PostCard, WelcomeHeader } from '../components';
import { useGetPosts } from '../hooks/usePosts';
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { usePostStore } from '../store/usePostStore';


function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    
    // Zustand স্টোর থেকে শুধু পোস্ট এবং অ্যাকশন নেওয়া হচ্ছে
    const postsFromStore = usePostStore((state) => state.posts);
    const setPostsInStore = usePostStore((state) => state.setPosts);

    // React Query দিয়ে ডেটা আনা হচ্ছে
    const { data: fetchedPostsData, isLoading, isError, error, refetch } = useGetPosts();

    // fetchedPostsData পরিবর্তন হলেই শুধু Zustand স্টোর আপডেট হবে
    useEffect(() => {
        if (fetchedPostsData?.documents) {
            setPostsInStore(fetchedPostsData.documents);
        }
    }, [fetchedPostsData, setPostsInStore]);

    // রেন্ডার করার জন্য সবসময় Zustand স্টোরের ডেটা ব্যবহার করা হবে
    const postsToRender = useMemo(() => {
        if (!postsFromStore) return [];
        return postsFromStore.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [postsFromStore, searchTerm]);

    if (isLoading) {
        return <HomeSkeleton />;
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
            <WelcomeHeader />
            <div className="relative mb-8">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search posts by title..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {postsToRender.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postsToRender.map((post) => (
                        <PostCard key={post.$id} post={post} />
                    ))}
                </div>
            ) : (
                <EmptyState message={searchTerm ? "No posts found." : "No posts available."} />
            )}
        </div>
    );
}

export default Home;