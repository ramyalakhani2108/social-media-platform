import { User } from '@/types';
import { motion } from 'framer-motion';

interface StoryCircleProps {
  user: User;
  hasStory?: boolean;
  hasSeen?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  vertical?: boolean;
  className?: string;
}

export const StoryCircle = ({
  user,
  hasStory = false,
  hasSeen = false,
  onClick,
  size = 'md',
  vertical = false,
  className = '',
}: StoryCircleProps) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20',
  };

  const ringClasses = {
    sm: 'h-14 w-14',
    md: 'h-[4.5rem] w-[4.5rem]',
    lg: 'h-[5.5rem] w-[5.5rem]',
  };

  return (
    <div className={`flex ${vertical ? 'flex-row items-center' : 'flex-col items-center'} ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative cursor-pointer"
        onClick={onClick}
      >
        {hasStory && !hasSeen && (
          <div
            className={`absolute -inset-1 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 ${ringClasses[size]}`}
          ></div>
        )}
        <div className="relative">
          <img
            src={user.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
            alt={user.username}
            className={`relative rounded-full object-cover border-2 border-white dark:border-gray-800 ${sizeClasses[size]}`}
          />
          {user.isVerified && (
            <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center">
              ✓
            </span>
          )}
        </div>
      </motion.div>
      <span className={`text-xs font-medium text-gray-700 dark:text-gray-300 truncate max-w-[80px] ${vertical ? 'ml-2' : 'mt-1 text-center'}`}>
        {user.username}
      </span>
    </div>
  );
};
