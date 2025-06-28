import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { useUser } from '@/hooks/useAuth';
import { PlusCircle } from 'lucide-react';

function WelcomeHeader() {
    const { data: user } = useUser();
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h1>
                <p className="text-muted-foreground">Here's a list of the latest posts from the community.</p>
            </div>
            <Link to="/create-post">
                <Button className="hidden sm:flex items-center gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Create New Post
                </Button>
            </Link>
        </div>
    )
}

export default WelcomeHeader