import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { CommentModal } from './CommentModal';
import { Post as PostType } from '../../types/index';

interface PostProps {
  post: PostType;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const [likes, setLikes] = useState(post.likes_count);
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => !liked ? prev + 1 : prev - 1);
  };

  const handleCommentClick = () => {
    console.log('Comment button clicked');
    setShowComments(true);
    console.log('showComments set to:', true);
  };

  console.log('Current showComments state:', showComments);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md mb-4"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200">
          <Link to={`/profile/${post.user.username}`}>
            <img
              src={post.user.avatar_url}
              alt={post.user.username}
              className="w-10 h-10 rounded-full object-cover border-2 border-white"
            />
          </Link>
          <div>
            <Link
              to={`/profile/${post.user.username}`}
              className="font-medium hover:underline"
            >
              {post.user.username}
            </Link>
            {post.user.isVerified && (
              <span className="text-blue-600">Verified</span>
            )}
          </div>
        </div>

        {/* Post Content */}
        <div className="relative">
          <img
            src={post.media_url}
            alt={post.caption}
            className="w-full h-auto"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className={`w-6 h-6 ${liked ? 'text-red-500' : 'text-gray-500'}`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </button>
            <button
              onClick={handleCommentClick}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              className="w-6 h-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </div>

        {/* Likes and Caption */}
        <div className="p-4">
          <p className="font-medium mb-2">
            {likes} {likes === 1 ? 'like' : 'likes'}
          </p>
          <p className="mb-2">
            <Link
              to={`/profile/${post.user.username}`}
              className="font-medium hover:underline"
            >
              {post.user.username}
            </Link>{' '}
            {post.caption}
          </p>
        </div>
      </motion.div>

      {/* Comment Modal */}
      {showComments && (
        <div className="modal-container">
          {createPortal(
            <CommentModal post={post} onClose={() => setShowComments(false)} />,
            document.body
          )}
        </div>
      )}
    </>
  );
};
