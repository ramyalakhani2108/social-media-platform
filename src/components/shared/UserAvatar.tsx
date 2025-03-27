import { Avatar } from '../ui/Avatar';
import { User } from '@/types';

interface UserAvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar = ({ user, size = 'md', className }: UserAvatarProps) => {
  return (
    <div className={`relative ${className}`}>
      <Avatar 
        src={user.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
        size={size}
        className="border-2 border-white dark:border-gray-800"
      />
      {user.isVerified && (
        <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center">
          ✓
        </span>
      )}
    </div>
  );
};
