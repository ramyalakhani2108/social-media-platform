import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { Button } from '../ui/Button';
import { Post } from '@/types';

interface PostActionsProps {
  post: Post;
  onLike: () => void;
  onShare: () => void;
  onBookmark: () => void;
  isLiked: boolean;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
}

export const PostActions = ({ 
  post, 
  onLike, 
  onShare, 
  onBookmark, 
  isLiked,
  showComments,
  setShowComments
}: PostActionsProps) => {
  return (
    <div className="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
      <Button
        variant="ghost"
        size="sm"
        onClick={onLike}
        className={`gap-2 w-full sm:w-auto ${isLiked ? 'text-red-500' : ''}`}
      >
        <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        {post.likes_count}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => setShowComments(!showComments)}
        className="gap-2 w-full sm:w-auto"
      >
        <MessageCircle className="h-5 w-5" />
        {post.comments_count}
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onShare}
        className="gap-2 w-full sm:w-auto"
      >
        <Share2 className="h-5 w-5" />
      </Button>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onBookmark}
        className="gap-2 w-full sm:w-auto"
      >
        <Bookmark className="h-5 w-5" />
      </Button>
    </div>
  );
};
