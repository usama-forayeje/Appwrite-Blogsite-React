import { useUser } from '../../hooks/useAuth';
import { useLikePost } from '../../hooks/usePosts';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart,MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function PostStats({ post, onCommentClick }) {
    const { data: currentUser } = useUser();
    const { mutate: likePost, isPending } = useLikePost();

    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setIsLiked(likes.includes(currentUser.$id));
        }
    }, [currentUser, likes]);

    const handleLikePost = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentUser) {
            toast.info("You must be logged in to like a post.");
            return;
        }

        let newLikes = [...likes];
        if (isLiked) {
            newLikes = newLikes.filter((id) => id !== currentUser.$id);
        } else {
            newLikes.push(currentUser.$id);
        }
        setLikes(newLikes);
        setIsLiked(!isLiked);
        likePost({ postId: post.$id, likes: newLikes });
    };

    console.log(post);
    

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-4 items-center">
                <Button variant="ghost" size="sm" className="p-2" onClick={handleLikePost} disabled={isPending}>
                    <Heart
                        className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-current' : 'text-muted-foreground'}`}
                    />
                    <span className="ml-2 text-sm font-medium">{likes.length}</span>
                </Button>
                <Button variant="ghost" size="sm" className="p-2" onClick={onCommentClick}>
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="ml-2 text-sm font-medium">{post.commentCount || 0}</span>
                </Button>
            </div>
        </div>
    )
}

export default PostStats