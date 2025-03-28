import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/mockAuthStore';
import {
  Home,
  Users,
  Bookmark,
  Settings,
  User,
  MessageSquare,
  Bot,
  LogOut,
  Film,
  Bell,
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../hooks/useTheme';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
  const { user, isAuthenticated } = useAuthStore();
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Film, label: 'Reels', path: '/reels' },
    { icon: Users, label: 'Friends', path: '/friends' },
    { icon: Bookmark, label: 'Saved', path: '/saved' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: Bot, label: 'Chatbot', path: '/chatbot' },
    { icon: Settings, label: 'Settings', path: '/settings' },
    { icon: User, label: 'Profile', path: `/profile/${user?.id}` },
    ...(user?.isAdmin === true
      ? [{ icon: Settings, label: 'Admin Panel', path: '/admin' }]
      : []),
  ];

  if (!isAuthenticated) {
    return (
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white p-4 transition-transform dark:border-gray-700 dark:bg-gray-900">
        <div className="flex h-full flex-col items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className={`fixed left-0 top-0 z-40 h-screen w-64 border-r border-gray-200 bg-white p-4 transition-transform dark:border-gray-700 dark:bg-gray-900 ${className}`}>
      <div className="flex h-full flex-col">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-200">
            Social App
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="relative">
                <img
                  src={user?.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user?.username || 'default'}`}
                  alt={user?.username || 'User'}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800 hover:scale-105 transition-transform duration-200"
                />
                {user?.isVerified && (
                  <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center">
                    ✓
                  </span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
                {user?.username || 'Social App'}
              </h3>
              {user?.isVerified && (
                <span className="text-blue-600 text-sm font-medium">Verified</span>
              )}
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 mb-2.5 text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-gray-800/20 rounded-xl backdrop-blur-sm transition-all duration-200 group ${
                  pathname === item.path
                    ? 'bg-gray-100 dark:bg-gray-800'
                    : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200" />
                <span className="text-sm font-medium transition-colors duration-200">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-left hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => {
              useAuthStore.getState().logout();
              window.location.href = '/login';
            }}
          >
            <LogOut className="w-4 h-4 mr-3" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};