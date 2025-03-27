import { User } from '@/types';
import { UserAvatar } from '../shared/UserAvatar';

interface StoryCircleProps {
  user: User;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const StoryCircle = ({ 
  user, 
  isActive = false, 
  onClick, 
  className 
}: StoryCircleProps) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex-shrink-0 w-12 h-12 ${className}`}
    >
      <div className={`absolute inset-0 rounded-full ${isActive ? 'ring-4 ring-blue-500' : 'ring-2 ring-gray-200 dark:ring-gray-700'}`} />
      <UserAvatar 
        user={user} 
        size="sm" 
        className="relative z-10"
      />
    </button>
  );
};
