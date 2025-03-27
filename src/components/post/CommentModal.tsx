import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Comments } from './Comments';
import { Post } from '../../types/index';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface CommentModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
}

export const CommentModal: React.FC<CommentModalProps> = ({ post, isOpen, onClose }) => {
  useBodyScrollLock(isOpen);

  const modalVariants = {
    initial: {
      opacity: 0,
      y: '100%',
      scale: 0.95
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.5,
        opacity: {
          duration: 0.3,
          delay: 0.2
        }
      }
    },
    exit: {
      opacity: 0,
      y: '100%',
      scale: 0.95,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        duration: 0.5,
        opacity: {
          duration: 0.3
        }
      }
    }
  };

  const backdropVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="fixed inset-0 z-50 bg-black bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 flex items-center justify-center overflow-y-auto overflow-x-hidden"
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '100vw',
            maxHeight: '100vh',
            margin: 0,
            padding: 0,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-[1200px] h-[90vh] rounded-xl overflow-hidden flex"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '1200px',
              maxHeight: '90vh',
              margin: 'auto',
              background: 'rgba(0, 0, 0, 0.01)',
              backdropFilter: 'blur(4px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 text-white dark:text-gray-100 hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Left side - Post Image */}
            <div className="w-[65%] flex items-center justify-center">
              <img
                src={post.media_url}
                alt={post.caption}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Right side - Comments */}
            <div className="w-[35%] flex flex-col bg-white dark:bg-gray-800">
              {/* Post header */}
              <div className="p-4 border-b dark:border-gray-700 flex items-center gap-3">
                <Link to={`/profile/${post.user.username}`}>
                  <img
                    src={post.user.avatar_url}
                    alt={post.user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </Link>
                <div>
                  <Link
                    to={`/profile/${post.user.username}`}
                    className="font-semibold dark:text-white hover:underline"
                  >
                    {post.user.username}
                  </Link>
                  {post.user.isVerified && (
                    <span className="ml-1 text-blue-500 dark:text-blue-400">
                      <svg className="w-4 h-4 inline" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                    </span>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post.caption}</p>
                </div>
              </div>

              {/* Comments section */}
              <div className="flex-1 overflow-y-auto">
                <Comments postId={post.id} />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
