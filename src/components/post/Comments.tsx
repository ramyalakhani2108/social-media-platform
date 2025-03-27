import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '../../store/mockAuthStore';
import { commentsService } from '../../services/commentsService';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Comment } from '../../types';

interface CommentProps {
  comment: Comment;
  onReply: (reply: Comment) => void;
  onDelete: (commentId: string) => void;
  onLike: (commentId: string) => void;
  likes_count?: number;
}

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return date.toLocaleDateString();
  } else if (days > 0) {
    return `${days}d`;
  } else if (hours > 0) {
    return `${hours}h`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return 'now';
  }
};

const CommentItem: React.FC<CommentProps> = ({ comment, onReply, onDelete, onLike, likes_count = 0 }) => {
  const { user } = useAuthStore();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(likes_count);
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleLike = () => {
    setLiked(!liked);
    setLikes(prev => !liked ? prev + 1 : prev - 1);
    onLike(comment.id);
  };

  const handleReply = () => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      postId: comment.postId,
      userId: user?.id || '',
      content: replyContent,
      timestamp: new Date().toISOString(),
      user: {
        id: user?.id || '',
        username: user?.username || '',
        avatar_url: user?.avatar_url || '',
        isVerified: user?.isVerified || false
      },
      parentId: comment.id
    };

    onReply(reply);
    setReplyContent('');
    setIsReplying(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 mb-4 group"
    >
      <Link to={`/profile/${comment.user.username}`}>
        <img
          src={comment.user.avatar_url}
          alt={comment.user.username}
          className="w-8 h-8 rounded-full object-cover"
        />
      </Link>
      <div className="flex-1">
        <div className="flex items-start gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Link
                to={`/profile/${comment.user.username}`}
                className="font-semibold hover:underline"
              >
                {comment.user.username}
              </Link>
              {comment.user.isVerified && (
                <span className="text-blue-500">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </span>
              )}
            </div>
            <p className="text-sm">{comment.content}</p>
            <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
              <span>{formatTimestamp(comment.timestamp)}</span>
              <button
                onClick={() => setIsReplying(!isReplying)}
                className="font-semibold hover:text-gray-900"
              >
                Reply
              </button>
              {comment.user.id === user?.id && (
                <button
                  onClick={() => onDelete(comment.id)}
                  className="font-semibold hover:text-red-500"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`p-1 ${
                liked ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            <span className={`${
              liked ? 'text-red-500' : 'text-gray-400'
            }`}>
              {likes}
            </span>
          </div>
        </div>

        {isReplying && (
          <div className="mt-2">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Reply to comment..."
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && handleReply()}
              />
              <button
                onClick={handleReply}
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>
        )}

        {comment.replies?.map((reply) => (
          <motion.div
            key={reply.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ml-8 mt-2 flex gap-3 group"
          >
            <Link to={`/profile/${reply.user.username}`}>
              <img
                src={reply.user.avatar_url}
                alt={reply.user.username}
                className="w-6 h-6 rounded-full object-cover"
              />
            </Link>
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/profile/${reply.user.username}`}
                      className="font-semibold hover:underline"
                    >
                      {reply.user.username}
                    </Link>
                    {reply.user.isVerified && (
                      <span className="text-blue-500">
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <p className="text-sm">{reply.content}</p>
                  <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                    <span>{formatTimestamp(reply.timestamp)}</span>
                    {reply.user.id === user?.id && (
                      <button
                        onClick={() => onDelete(reply.id)}
                        className="font-semibold hover:text-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

interface CommentsProps {
  postId: string;
}

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { user } = useAuthStore();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await commentsService.getComments(postId);
      setComments(comments);
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      userId: user?.id || '',
      content: newComment,
      timestamp: new Date().toISOString(),
      user: {
        id: user?.id || '',
        username: user?.username || '',
        avatar_url: user?.avatar_url || '',
        isVerified: user?.isVerified || false
      }
    };

    commentsService.addComment(comment);
    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const handleReply = (reply: Comment) => {
    setComments(prev => {
      const newComments = [...prev];
      const parentComment = newComments.find(c => c.id === reply.parentId);
      if (parentComment) {
        if (!parentComment.replies) {
          parentComment.replies = [];
        }
        parentComment.replies.push(reply);
      }
      return newComments;
    });
  };

  const handleDelete = (commentId: string) => {
    commentsService.deleteComment(commentId);
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  const handleLike = (commentId: string) => {
    commentsService.toggleLike(commentId);
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
        />
        <button
          onClick={handleAddComment}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onDelete={handleDelete}
            onLike={handleLike}
            likes_count={comment.likes_count || 0}
          />
        ))}
      </div>
    </div>
  );
};
