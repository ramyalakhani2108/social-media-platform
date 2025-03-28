import { useState } from 'react';
import { Comment } from '../post/Comment';
import { Post } from '@/types';

interface CommentSectionProps {
  post: Post;
  onComment: (comment: string) => void;
  showComments: boolean;
  setShowComments: (show: boolean) => void;
  className?: string;
}

export const CommentSection = ({ 
  post, 
  onComment, 
  showComments,
  setShowComments,
  className = ''
}: CommentSectionProps) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(comment);
      setComment('');
    }
  };

  return (
    <div className={`mt-4 space-y-4 ${className}`}>
      {showComments && (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Post
            </button>
          </div>

          <div className="space-y-2">
            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      )}

      <button
        onClick={() => setShowComments(!showComments)}
        className="text-blue-500 hover:text-blue-600 text-sm"
      >
        {showComments ? 'Hide' : 'View'} comments
      </button>
    </div>
  );
};
