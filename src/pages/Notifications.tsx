import { useState, useEffect } from 'react';
import { useNotificationsStore } from '../store/mockNotificationsStore';
import { notificationService } from '../services/notificationService';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Check } from 'lucide-react';

export const Notifications = () => {
  const { notifications, markAsRead, markAllAsRead, toggleFollow } = useNotificationsStore();
  const [selectedTab, setSelectedTab] = useState<'all' | 'likes' | 'comments' | 'mentions' | 'tags' | 'follows'>('all');
  const [unreadCount, setUnreadCount] = useState(notifications.filter(n => !n.read).length);

  useEffect(() => {
    const unsubscribe = useNotificationsStore.subscribe(
      (state) => state.notifications,
      (notifications) => {
        setUnreadCount(notifications.filter(n => !n.read).length);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
    setUnreadCount(0);
  };

  const filterNotifications = (type: string) => {
    if (type === 'all') return notifications;
    if (type === 'follows') return notifications.filter((n) => n.type === 'follow');
    return notifications.filter((n) => n.type === type);
  };

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={handleMarkAllAsRead}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
          >
            Mark all as read
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setSelectedTab('all')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedTab === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedTab('likes')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedTab === 'likes' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            Likes
          </button>
          <button
            onClick={() => setSelectedTab('comments')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedTab === 'comments' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            Comments
          </button>
          <button
            onClick={() => setSelectedTab('mentions')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedTab === 'mentions' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            Mentions
          </button>
          <button
            onClick={() => setSelectedTab('tags')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedTab === 'tags' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            Tags
          </button>
          <button
            onClick={() => setSelectedTab('follows')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              selectedTab === 'follows' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
            }`}
          >
            Follows
          </button>
        </div>

        <div className="space-y-4">
          {filterNotifications(selectedTab).map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                !notification.read 
                  ? 'border-blue-600 dark:border-blue-400' 
                  : 'border-gray-200 dark:border-gray-700'
              } hover:bg-gray-50 dark:hover:bg-gray-800`}
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={notification.from_user.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${notification.from_user.username || 'default'}`}
                    alt={notification.from_user.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
                  />
                  {notification.from_user.isVerified && (
                    <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center">
                      ✓
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/profile/${notification.from_user.username}`}
                        className="font-medium text-gray-900 dark:text-white hover:underline"
                      >
                        {notification.from_user.username}
                      </Link>
                      {notification.from_user.isVerified && (
                        <span className="text-blue-600 dark:text-blue-400">Verified</span>
                      )}
                    </div>
                    {notification.type === 'follow' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFollow(notification.from_user.id);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                          notification.from_user.isFollowing
                            ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                            : 'bg-blue-600 text-white dark:bg-blue-400'
                        }`}
                      >
                        {notification.from_user.isFollowing ? (
                          <>
                            <Check className="w-4 h-4 inline-block mr-1" />
                            Following
                          </>
                        ) : (
                          'Follow'
                        )}
                      </button>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {notification.type === 'like' && 'liked your post'}
                    {notification.type === 'comment' && 'commented on your post'}
                    {notification.type === 'follow' && 'started following you'}
                    {notification.type === 'mention' && 'mentioned you'}
                    {notification.type === 'tag' && 'tagged you'}
                  </p>
                  {notification.post?.media_url && (
                    <img
                      src={notification.post.media_url}
                      alt="Post thumbnail"
                      className="mt-2 w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
