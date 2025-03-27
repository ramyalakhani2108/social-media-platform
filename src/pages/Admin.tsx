import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Image, BarChart2, Search, Trash2, Ban, CheckCircle, Camera, Film } from 'lucide-react';
import { useStoryStore } from '@/store/mockStoryStore';
import { useReelStore } from '@/store/mockReelStore';
import { Button } from '../components/ui/Button';

type Tab = 'users' | 'posts' | 'analytics' | 'stories' | 'reels';

const SAMPLE_USERS = [
  {
    id: '1',
    username: 'johndoe',
    email: 'john@example.com',
    status: 'active',
    posts_count: 42,
    followers_count: 1234,
    created_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    username: 'janedoe',
    email: 'jane@example.com',
    status: 'blocked',
    posts_count: 28,
    followers_count: 856,
    created_at: '2024-02-01T15:30:00Z',
  },
] as const;

const SAMPLE_POSTS = [
  {
    id: '1',
    user: {
      username: 'johndoe',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=john',
    },
    media_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    caption: 'Beautiful sunset at the beach',
    likes_count: 120,
    comments_count: 8,
    created_at: '2024-03-10T08:00:00Z',
  },
  {
    id: '2',
    user: {
      username: 'janedoe',
      avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=jane',
    },
    media_url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
    caption: 'City lights',
    likes_count: 89,
    comments_count: 5,
    created_at: '2024-03-09T20:15:00Z',
  },
] as const;

const ANALYTICS_DATA = {
  totalUsers: 5842,
  totalPosts: 15234,
  totalLikes: 89456,
  totalComments: 34567,
  dailyActiveUsers: 2345,
  monthlyActiveUsers: 4567,
  engagementRate: 8.4,
  growthRate: 12.5,
};

export const Admin = () => {
  const [activeTab, setActiveTab] = useState<Tab>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const { stories } = useStoryStore();
  const { reels } = useReelStore();

  const handleDeleteUser = async (userId: string) => {
    try {
      // API call to delete user
      console.log('Delete user:', userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleToggleUserStatus = async (userId: string, currentStatus: string) => {
    try {
      // API call to toggle user status
      console.log('Toggle user status:', userId, currentStatus);
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      // API call to delete post
      console.log('Delete post:', postId);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteStory = async (storyId: string) => {
    try {
      // API call to delete story
      console.log('Delete story:', storyId);
    } catch (error) {
      console.error('Error deleting story:', error);
    }
  };

  const handleDeleteReel = async (reelId: string) => {
    try {
      // API call to delete reel
      console.log('Delete reel:', reelId);
    } catch (error) {
      console.error('Error deleting reel:', error);
    }
  };

  const tabs = [
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'posts' as const, label: 'Posts', icon: Image },
    { id: 'stories' as const, label: 'Stories', icon: Camera },
    { id: 'reels' as const, label: 'Reels', icon: Film },
    { id: 'analytics' as const, label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:ring dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-500 dark:border-gray-700">
                  <th className="pb-4 pl-4">User</th>
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Posts</th>
                  <th className="pb-4">Followers</th>
                  <th className="pb-4">Joined</th>
                  <th className="pb-4 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {SAMPLE_USERS.map((user) => (
                  <tr key={user.id} className="text-sm">
                    <td className="py-4 pl-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/avatars/svg?seed=${user.username}`}
                          alt={user.username}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 text-gray-500">{user.email}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          user.status === 'active'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500">{user.posts_count}</td>
                    <td className="py-4 text-gray-500">{user.followers_count}</td>
                    <td className="py-4 text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleUserStatus(user.id, user.status)}
                        >
                          {user.status === 'active' ? (
                            <Ban className="h-4 w-4 text-red-500" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {SAMPLE_POSTS.map((post) => (
              <div
                key={post.id}
                className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <img
                  src={post.media_url}
                  alt={post.caption}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.user.avatar_url}
                        alt={post.user.username}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.user.username}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500">{post.caption}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                    <span>{post.likes_count} likes</span>
                    <span>{post.comments_count} comments</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'stories' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-500 dark:border-gray-700">
                  <th className="pb-4 pl-4">User</th>
                  <th className="pb-4">Media</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Created</th>
                  <th className="pb-4">Expires</th>
                  <th className="pb-4">Views</th>
                  <th className="pb-4 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {stories.map((story) => {
                  const isExpired = new Date(story.expires_at) < new Date();
                  return (
                    <tr key={story.id} className="text-sm">
                      <td className="py-4 pl-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={story.user.avatar_url}
                            alt={story.user.username}
                            className="h-8 w-8 rounded-full"
                          />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {story.user.username}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="h-16 w-16 overflow-hidden rounded-md">
                          {story.media_type === 'image' ? (
                            <img
                              src={story.media_url}
                              alt="Story media"
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <video
                              src={story.media_url}
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-gray-500">{story.media_type}</td>
                      <td className="py-4 text-gray-500">
                        {new Date(story.created_at).toLocaleString()}
                      </td>
                      <td className="py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${isExpired
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                            : 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                            }`}
                        >
                          {isExpired ? 'Expired' : 'Active'}
                        </span>
                      </td>
                      <td className="py-4 text-gray-500">{story.seen_by.length}</td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteStory(story.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'reels' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left text-sm font-medium text-gray-500 dark:border-gray-700">
                  <th className="pb-4 pl-4">User</th>
                  <th className="pb-4">Thumbnail</th>
                  <th className="pb-4">Caption</th>
                  <th className="pb-4">Duration</th>
                  <th className="pb-4">Views</th>
                  <th className="pb-4">Likes</th>
                  <th className="pb-4">Comments</th>
                  <th className="pb-4">Created</th>
                  <th className="pb-4 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {reels.map((reel) => (
                  <tr key={reel.id} className="text-sm">
                    <td className="py-4 pl-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={reel.user.avatar_url}
                          alt={reel.user.username}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className="font-medium text-gray-900 dark:text-white">
                          {reel.user.username}
                        </span>
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="h-16 w-12 overflow-hidden rounded-md">
                        <img
                          src={reel.thumbnail_url}
                          alt="Reel thumbnail"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="py-4 text-gray-500 max-w-xs truncate">{reel.caption}</td>
                    <td className="py-4 text-gray-500">{reel.duration}s</td>
                    <td className="py-4 text-gray-500">{reel.views_count}</td>
                    <td className="py-4 text-gray-500">{reel.likes_count}</td>
                    <td className="py-4 text-gray-500">{reel.comments_count}</td>
                    <td className="py-4 text-gray-500">
                      {new Date(reel.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReel(reel.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  label: 'Total Users',
                  value: ANALYTICS_DATA.totalUsers.toLocaleString(),
                  change: '+12%',
                },
                {
                  label: 'Total Posts',
                  value: ANALYTICS_DATA.totalPosts.toLocaleString(),
                  change: '+8%',
                },
                {
                  label: 'Total Likes',
                  value: ANALYTICS_DATA.totalLikes.toLocaleString(),
                  change: '+15%',
                },
                {
                  label: 'Total Comments',
                  value: ANALYTICS_DATA.totalComments.toLocaleString(),
                  change: '+10%',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-gray-200 p-6 dark:border-gray-700"
                >
                  <h3 className="text-sm font-medium text-gray-500">{stat.label}</h3>
                  <div className="mt-2 flex items-baseline">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <span className="ml-2 text-sm font-medium text-green-500">
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  User Activity
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Daily Active Users</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {ANALYTICS_DATA.dailyActiveUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: '65%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Monthly Active Users</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {ANALYTICS_DATA.monthlyActiveUsers.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: '80%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                  Engagement Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Engagement Rate</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {ANALYTICS_DATA.engagementRate}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${ANALYTICS_DATA.engagementRate}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Growth Rate</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {ANALYTICS_DATA.growthRate}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${ANALYTICS_DATA.growthRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};