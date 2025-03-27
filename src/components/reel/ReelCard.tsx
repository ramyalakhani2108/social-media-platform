import { useState, useRef, useEffect } from 'react';
import { Reel } from '@/types';
import { Heart, MessageCircle, Share2, Music, Play, X, User, Send, Link, BookmarkPlus, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useReelStore } from '@/store/mockReelStore';
import { useAuthStore } from '@/store/mockAuthStore';

interface ReelCardProps {
  reel: Reel;
  isActive?: boolean;
  onEnded?: () => void;
}

// Mock comments data - in a real app this would come from the API
const mockComments = [
  {
    id: '1',
    user: {
      id: '2',
      username: 'janedoe',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=jane'
    },
    text: 'Amazing video! 🎉',
    created_at: new Date().toISOString(),
    likes: 5,
    liked_by_current_user: false,
    replies: [
      {
        id: '1',
        user: {
          id: '3',
          username: 'skaterguy',
          avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=mike'
        },
        text: 'Love the editing! 🎬',
        created_at: new Date().toISOString(),
        likes: 3,
        liked_by_current_user: false,
      },
    ],
  },
  {
    id: '2',
    user: {
      id: '3',
      username: 'skaterguy',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=mike'
    },
    text: 'Love the editing! 🎬',
    created_at: new Date().toISOString(),
    likes: 3,
    liked_by_current_user: false,
    replies: [],
  },
  {
    id: '3',
    user: {
      id: '4',
      username: 'musicfan',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=music'
    },
    text: 'Great music choice! 🎵',
    created_at: new Date().toISOString(),
    likes: 2,
    liked_by_current_user: false,
    replies: [],
  }
];

export const ReelCard = ({ reel, isActive = false, onEnded }: ReelCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showShareDrawer, setShowShareDrawer] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [showReply, setShowReply] = useState(null);
  const [reply, setReply] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const { likeReel, addComment, likeComment, replyToComment } = useReelStore();
  const { user } = useAuthStore();

  const handleVideoPress = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleLike = () => {
    likeReel(reel.id);
    setIsLiked(!isLiked);
  };

  const handleShare = () => {
    setShowShareDrawer(true);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    if (user) {
      addComment(reel.id, comment);
      setComment('');
      setIsCommenting(false);
      setShowComments(true);
    }
  };

  const handleCommentLike = (commentId: string) => {
    likeComment(commentId);
    const updatedComments = mockComments.map((comment) => {
      if (comment.id === commentId) {
        comment.likes += 1;
        comment.liked_by_current_user = true;
      }
      return comment;
    });
    // Update the mockComments state with the updated comments
  };

  const handleReply = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (!reply.trim()) return;
    
    if (user) {
      replyToComment(commentId, reply);
      setReply('');
      setShowReply(null);
    }
  };

  const handleReplyLike = (replyId: string) => {
    // Implement the logic to like a reply
  };

  // Handle video playback based on active state
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    if (isActive) {
      videoElement.play().catch(err => console.error("Could not play video:", err));
      setIsPlaying(true);
    } else {
      videoElement.pause();
      setIsPlaying(false);
    }
    
    // Add event listener for video ended
    const handleEnded = () => {
      if (onEnded) {
        onEnded();
      }
      // Loop the video
      videoElement.currentTime = 0;
      videoElement.play().catch(err => console.error("Could not replay video:", err));
    };
    
    videoElement.addEventListener('ended', handleEnded);
    
    return () => {
      videoElement.removeEventListener('ended', handleEnded);
    };
  }, [isActive, onEnded]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Video Container */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src={reel.media_url}
          className="w-full h-full object-cover"
          loop
          playsInline
          muted={isMuted}
          onEnded={onEnded}
          onClick={handleVideoPress}
        />

        {/* Overlay content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10 max-w-[100%] w-full">
          {/* User info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <img
                src={reel.user.avatar_url}
                alt={reel.user.username}
                className="h-8 w-8 rounded-full border-2 border-white"
              />
              <span className="ml-2 font-medium text-white">
                {reel.user.username}
              </span>
            </div>
            <button 
              onClick={handleMuteToggle}
              className="text-white bg-black/30 rounded-full p-1"
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4V5Z"/>
                  <path d="m18 12 5-5"/>
                  <path d="m18 12 5 5"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5 6 9H2v6h4l5 4V5Z"/>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
              )}
            </button>
          </div>

          {/* Caption */}
          <p className="mb-3 text-sm text-white">{reel.caption}</p>

          {/* Audio */}
          <div className="flex items-center mb-4">
            <Music className="h-4 w-4 text-white mr-2" />
            <p className="text-xs text-white">{reel.audio_name}</p>
          </div>

          {/* Action buttons */}
          <div className="absolute right-4 bottom-32 flex flex-col items-center space-y-6 z-10">
            <motion.button
              whileTap={{ scale: 1.2 }}
              className="flex flex-col items-center"
              onClick={handleLike}
            >
              <Heart className={`h-7 w-7 ${isLiked ? 'text-red-500 fill-red-500' : 'text-white'}`} />
              <span className="mt-1 text-xs text-white">{reel.likes_count}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 1.2 }}
              className="flex flex-col items-center"
              onClick={() => setShowComments(true)}
            >
              <MessageCircle className="h-7 w-7 text-white" />
              <span className="mt-1 text-xs text-white">{reel.comments_count}</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 1.2 }}
              className="flex flex-col items-center"
              onClick={handleShare}
            >
              <Share2 className="h-7 w-7 text-white" />
              <span className="mt-1 text-xs text-white">Share</span>
            </motion.button>
          </div>

          {/* Comments section */}
          {isCommenting && (
            <form onSubmit={handleComment} className="absolute right-4 bottom-10 flex items-center space-x-2">
              <img
                src={user?.avatar_url || ''}
                alt={user?.username || ''}
                className="h-6 w-6 rounded-full"
              />
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-black/30 text-white px-3 py-1 rounded-full text-sm"
              />
              <button
                type="submit"
                className="text-white hover:text-blue-400"
              >
                Post
              </button>
            </form>
          )}

        </div>

        {/* Comments Drawer - Now inside the reel card */}
        <AnimatePresence>
          {showComments && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 dark:bg-white/80 dark:text-gray-900"
              initial={{ height: 0 }}
              animate={{ height: '50%' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 dark:bg-gray-900/20" />
              
              <div className="h-full overflow-y-auto p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <img
                      src={reel.user.avatar_url}
                      alt={reel.user.username}
                      className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-900 mr-2"
                    />
                    <span className="font-medium dark:text-gray-900">
                      {reel.user.username}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowComments(false)}
                    className="text-white dark:text-gray-900"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Comment Input in the drawer */}
                <form onSubmit={handleComment} className="mb-4">
                  <div className="flex items-center">
                    <img
                      src={user?.avatar_url || ''}
                      alt={user?.username || ''}
                      className="h-8 w-8 rounded-full mr-2"
                    />
                    <input
                      type="text"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 bg-black/30 dark:bg-gray-900/30 text-white dark:text-gray-900 px-3 py-2 rounded-full text-sm"
                    />
                    <button
                      type="submit"
                      className="ml-2 text-white dark:text-gray-900 hover:text-blue-400"
                    >
                      Post
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex items-start">
                      <img
                        src={comment.user.avatar_url}
                        alt={comment.user.username}
                        className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-900 mr-3"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium dark:text-gray-900">
                            {comment.user.username}
                          </span>
                          <span className="text-gray-400 dark:text-gray-500 text-xs">
                            {new Date(comment.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-white dark:text-gray-900 text-sm mb-2">
                          {comment.text}
                        </p>
                        <div className="flex items-center text-sm text-gray-400 dark:text-gray-500 space-x-4">
                          <button
                            onClick={() => handleCommentLike(comment.id)}
                            className="flex items-center"
                          >
                            <Heart className={`h-4 w-4 ${comment.liked_by_current_user ? 'text-red-500 fill-red-500' : 'text-white dark:text-gray-900'}`} />
                            <span className="ml-1">{comment.likes}</span>
                          </button>
                          <button
                            onClick={() => setShowReply(comment.id)}
                            className="flex items-center"
                          >
                            <MessageSquare className="h-4 w-4 text-white dark:text-gray-900" />
                            <span className="ml-1">Reply</span>
                          </button>
                        </div>

                        {/* Reply section */}
                        {showReply === comment.id && (
                          <div className="mt-2">
                            <form onSubmit={(e) => handleReply(e, comment.id)} className="flex items-center">
                              <img
                                src={user?.avatar_url || ''}
                                alt={user?.username || ''}
                                className="h-6 w-6 rounded-full mr-2"
                              />
                              <input
                                type="text"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                                placeholder={`Reply to ${comment.user.username}...`}
                                className="flex-1 bg-black/30 dark:bg-gray-900/30 text-white dark:text-gray-900 px-3 py-1 rounded-full text-sm"
                              />
                              <button
                                type="submit"
                                className="ml-2 text-white dark:text-gray-900 hover:text-blue-400"
                              >
                                Reply
                              </button>
                            </form>
                          </div>
                        )}

                        {/* Replies */}
                        {comment.replies?.length > 0 && (
                          <div className="ml-4 mt-2 space-y-2">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start">
                                <img
                                  src={reply.user.avatar_url}
                                  alt={reply.user.username}
                                  className="h-6 w-6 rounded-full border-2 border-white dark:border-gray-900 mr-2"
                                />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium dark:text-gray-900">
                                      {reply.user.username}
                                    </span>
                                    <span className="text-gray-400 dark:text-gray-500 text-xs">
                                      {new Date(reply.created_at).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <p className="text-white dark:text-gray-900 text-sm">
                                    {reply.text}
                                  </p>
                                  <div className="flex items-center text-sm text-gray-400 dark:text-gray-500 space-x-4">
                                    <button
                                      onClick={() => handleReplyLike(reply.id)}
                                      className="flex items-center"
                                    >
                                      <Heart className={`h-4 w-4 ${reply.liked_by_current_user ? 'text-red-500 fill-red-500' : 'text-white dark:text-gray-900'}`} />
                                      <span className="ml-1">{reply.likes}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instagram-style Share Drawer */}
        <AnimatePresence>
          {showShareDrawer && (
            <motion.div 
              className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowShareDrawer(false)}
            >
              <motion.div 
                className="bg-white dark:bg-gray-800 rounded-t-xl w-full max-w-md p-4"
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Share to</h3>
                  <button 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    onClick={() => setShowShareDrawer(false)}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                {/* Share options */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {['User 1', 'User 2', 'User 3', 'User 4', 'User 5', 'User 6', 'User 7', 'User 8'].map((username, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-1">
                        <User className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                      </div>
                      <span className="text-xs text-gray-700 dark:text-gray-300 truncate w-full text-center">{username}</span>
                    </div>
                  ))}
                </div>
                
                {/* Other share options */}
                <div className="space-y-3">
                  <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Send className="h-5 w-5 mr-3 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Send in Messages</span>
                  </button>
                  <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Link className="h-5 w-5 mr-3 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Copy Link</span>
                  </button>
                  <button className="flex items-center w-full p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                    <BookmarkPlus className="h-5 w-5 mr-3 text-gray-700 dark:text-gray-300" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Save</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
