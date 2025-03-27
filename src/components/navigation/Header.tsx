import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, MessageCircle, Search, Sun, Moon } from 'lucide-react';
import { UserAvatar } from '../shared/UserAvatar';
import { useAuthStore } from '@/store/mockAuthStore';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className = '' }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const { user } = useAuthStore();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className={`py-2 px-4 ${className}`}>
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold text-gray-800 dark:text-white">
          Social
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-700 dark:text-gray-200"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-colors">
            <Bell className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-colors">
            <MessageCircle className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          </button>
          <button 
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 rounded-full transition-colors"
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          {user && (
            <UserAvatar 
              user={user} 
              size="sm"
              className="cursor-pointer hover:ring-2 hover:ring-blue-500/50 transition-all"
            />
          )}
        </div>
      </div>
    </header>
  );
};
