import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { Post } from '../../types';
import { Button } from '../ui/Button';
import { CommentModal } from './CommentModal';
import { UserAvatar } from '../shared/UserAvatar';
import { CommentSection } from '../shared/CommentSection';
import { MediaPlayer } from '../media/MediaPlayer';
import { useAuthStore } from '../../store/mockAuthStore';

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [showComments, setShowComments] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { user, updateSettings } = useAuthStore();

  const [isSaved, setIsSaved] = useState(post.saved);

  const handleLike = async () => {
    try {
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      // API call to update like status
    } catch (error) {
      console.error('Error updating like:', error);
    }
  };

  const handleCommentClick = () => {
    setIsCommentModalOpen(true);
  };

  const handleSave = async () => {
    try {
      setIsSaved(!isSaved);
      await updateSettings({
        savedPosts: isSaved
          ? user?.savedPosts?.filter(p => p.id !== post.id) || []
          : [...(user?.savedPosts || []), post]
      });
    } catch (error) {
      console.error('Error updating saved status:', error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md dark:bg-gray-800 cursor-pointer"
      >
        <div className="p-4 sm:p-6">
          <div className="mb-4 flex items-center space-x-3">
            <UserAvatar user={post.user} className="w-10 h-10" />
            <div className="flex-1 min-w-0">
              <Link
                to={`/profile/${post.user.id}`}
                className="font-semibold text-gray-900 hover:underline dark:text-white"
              >
                {post.user.username}
              </Link>
              <p className="mt-1 text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>

          <MediaPlayer 
            mediaUrl={post.media_url}
            mediaType={post.media_type}
            className="w-full h-auto"
          />

          <div className="mt-4">
            <p className="text-gray-900 dark:text-white break-words text-sm sm:text-base">
              {post.caption}
            </p>
          </div>

          <div className="mt-4 space-y-2 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`gap-2 w-full sm:w-auto ${isLiked ? 'text-red-500' : ''}`}
            >
              <svg className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {post.likes_count}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCommentClick}
              className="gap-2 w-full sm:w-auto"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {post.comments_count}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSave}
              className={`gap-2 w-full sm:w-auto ${isSaved ? 'text-blue-500' : ''}`}
            >
              <svg className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v14l-5-2.5L12 21l-4-1.5L3 19V5z" />
              </svg>
              {isSaved ? 'Unsave' : 'Save'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => console.log('Share clicked')}
              className="gap-2 w-full sm:w-auto"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </Button>
          </div>

          <CommentSection
            post={post}
            showComments={showComments}
            onToggleComments={() => setShowComments(!showComments)}
          />
        </div>
      </motion.div>

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        post={post}
      />
    </>
  );
}