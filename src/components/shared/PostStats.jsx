import { useUser } from '../../hooks/useAuth';
import { useLikePost } from '../../hooks/usePosts';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Heart, MessageCircle } from 'lucide-react';

function PostStats({ post, onCommentClick }) {
    const { data: currentUser } = useUser();
    const { mutate: likePost } = useLikePost();

    const likesArray = post.likes || [];
    const hasLiked = likesArray.includes(currentUser?.$id);

    const handleLike = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentUser) return; 

        let newLikes = [...likesArray];
        if (hasLiked) {
            newLikes = newLikes.filter(id => id !== currentUser.$id);
        } else {
            newLikes.push(currentUser.$id);
        }
        likePost({ postId: post.$id, likes: newLikes });
    };

    return (
         <div className="flex items-center justify-between z-20">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5" onClick={handleLike}>
                    <motion.div whileTap={{ scale: 1.5, rotate: -15 }} transition={{ duration: 0.2 }}>
                        <Heart className={`h-5 w-5 transition-all ${hasLiked ? 'text-red-500 fill-red-500' : 'text-muted-foreground'}`} />
                    </motion.div>
                    <span className="text-xs">{likesArray.length}</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center gap-1.5 text-muted-foreground" onClick={onCommentClick}>
                    <MessageCircle className="h-5 w-5" />
                    <span className="text-xs">{post.commentCount || 0}</span>
                </Button>
            </div>
        </div>
    )
}

export default PostStats