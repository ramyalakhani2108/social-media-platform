import { UserAvatar } from '../shared/UserAvatar';
import { Comment as CommentType } from '../../types';

interface CommentProps {
  comment: CommentType;
}

export const Comment = ({ comment }: CommentProps) => {
  return (
    <div className="flex gap-3">
      <UserAvatar user={comment.user} className="w-8 h-8" />
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <Link
            to={`/profile/${comment.user.username}`}
            className="font-semibold dark:text-white hover:underline"
          >
            {comment.user.username}
          </Link>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {comment.text}
          </span>
        </div>
        <p className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(comment.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
