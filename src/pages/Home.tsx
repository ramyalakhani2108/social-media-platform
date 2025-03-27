import { useState } from 'react';
import { useAuthStore } from '@/store/mockAuthStore';
import { useLayoutStore } from '@/store/layoutStore';
import { useStoryStore } from '@/store/mockStoryStore';
import { usePostStore } from '@/store/mockPostStore';
import { StoryList } from '@/components/story/StoryList';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { CreatePostModal } from '@/components/post/CreatePostModal';
import { PostCard } from '../components/post/PostCard';
import { StoryViewer } from '../components/story/StoryViewer';

interface Post {
  id: string;
  userId: string;
  caption: string;
  media_url: string;
  media_type: string;
  likes_count: number;
  comments_count: number;
  comments: any[];
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
    isVerified: boolean;
  };
}

interface SuggestedUser {
  id: string;
  username: string;
  name: string;
  avatar_url: string;
  isVerified: boolean;
}

interface RecentActivity {
  id: string;
  userId: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
  action: string;
  target: string;
}

export const Home = () => {
  const { user } = useAuthStore();
  const { storiesLayout } = useLayoutStore();
  const { isViewingStory } = useStoryStore();
  const { posts } = usePostStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const suggestedUsers: SuggestedUser[] = [
    {
      id: '1',
      username: 'alex_johnson',
      name: 'Alex Johnson',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Alex',
      isVerified: false
    },
    {
      id: '2',
      username: 'emma_thomas',
      name: 'Emma Thomas',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Emma',
      isVerified: true
    },
    {
      id: '3',
      username: 'david_miller',
      name: 'David Miller',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=David',
      isVerified: false
    },
    {
      id: '4',
      username: 'lisa_anderson',
      name: 'Lisa Anderson',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Lisa',
      isVerified: false
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      userId: '1',
      user: {
        id: '1',
        username: 'john_doe',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=John'
      },
      action: 'liked your post',
      target: 'Beautiful sunset'
    },
    {
      id: '2',
      userId: '2',
      user: {
        id: '2',
        username: 'jane_smith',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Jane'
      },
      action: 'started following you',
      target: ''
    },
    {
      id: '3',
      userId: '3',
      user: {
        id: '3',
        username: 'mike_brown',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Mike'
      },
      action: 'commented on your post',
      target: 'Trip to mountains'
    },
    {
      id: '4',
      userId: '4',
      user: {
        id: '4',
        username: 'sarah_wilson',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah'
      },
      action: 'shared your post',
      target: 'City life'
    }
  ];

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {storiesLayout === 'horizontal' ? (
        // Horizontal Layout (Instagram-like)
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content Column */}
          <div className="flex-1 max-w-[600px] mx-auto space-y-8">
            {/* Stories Row */}
            <div className={`w-full bg-white dark:bg-gray-900 rounded-lg p-4`}>
              <div className="flex space-x-4 overflow-x-auto pb-4">
                <StoryList />
              </div>
            </div>

            {/* Posts Column */}
            <div className="space-y-6">
              <div className="mb-4 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Posts</h1>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <Plus className="mr-2 h-5 w-5" />
                  Create Post
                </Button>
              </div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="space-y-6"
              >
                {posts.map((post: any) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-[350px] shrink-0">
            <div className="space-y-8 sticky top-8">
              {/* Profile Section */}
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-6`}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={user.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
                    />
                    {user.isVerified && (
                      <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.isAdmin ? 'Administrator' : 'User'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                      {user.posts?.length || 0}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Posts</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                      {user.followers || 0}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                      {user.following || 0}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Following</span>
                  </div>
                </div>
              </div>

              {/* Suggested Users Section */}
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Suggested for you</h3>
                  <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    See All
                  </button>
                </div>
                <div className="space-y-3">
                  {suggestedUsers.map((suggested) => (
                    <div 
                      key={suggested.id} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-8 h-8">
                          <img
                            src={suggested.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${suggested.username}`}
                            alt={suggested.username}
                            className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
                          />
                          {suggested.isVerified && (
                            <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center text-white text-xs">
                              ✓
                            </span>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {suggested.username}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {suggested.name}
                          </span>
                        </div>
                      </div>
                      <button 
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors px-3 py-1 rounded-full border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                      >
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4`}>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-2">
                      <div className="relative w-6 h-6">
                        <img
                          src={activity.user.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${activity.user.username}`}
                          alt={activity.user.username}
                          className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
                        />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {activity.user.username} {activity.action} {activity.target}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Vertical Layout
        <div className="grid grid-cols-12 gap-6">
          {/* Stories Column */}
          <div className="col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <div className="mx-auto max-w-[150px]">
                <StoryList />
              </div>
            </div>
          </div>

          {/* Posts Column */}
          <div className="col-span-7">
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Posts</h1>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="mr-2 h-5 w-5" />
                Create Post
              </Button>
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="space-y-6"
            >
              {posts.map((post: any) => (
                <PostCard key={post.id} post={post} />
              ))}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="space-y-8 sticky top-8">
              {/* Profile Section */}
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-6`}>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={user.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${user.username}`}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
                    />
                    {user.isVerified && (
                      <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center text-white text-xs">
                        ✓
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {user.username}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.isAdmin ? 'Administrator' : 'User'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                      {user.posts?.length || 0}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Posts</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                      {user.followers || 0}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Followers</span>
                  </div>
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900 dark:text-white">
                      {user.following || 0}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Following</span>
                  </div>
                </div>
              </div>

              {/* Suggested Users Section */}
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Suggested for you</h3>
                  <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">
                    See All
                  </button>
                </div>
                <div className="space-y-3">
                  {suggestedUsers.map((suggested) => (
                    <div 
                      key={suggested.id} 
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-8 h-8">
                          <img
                            src={suggested.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${suggested.username}`}
                            alt={suggested.username}
                            className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
                          />
                          {suggested.isVerified && (
                            <span className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-3 h-3 flex items-center justify-center text-white text-xs">
                              ✓
                            </span>
                          )}
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {suggested.username}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {suggested.name}
                          </span>
                        </div>
                      </div>
                      <button 
                        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors px-3 py-1 rounded-full border-2 border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900"
                      >
                        Follow
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity Section */}
              <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 space-y-4`}>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-2">
                      <div className="relative w-6 h-6">
                        <img
                          src={activity.user.avatar_url || `https://api.dicebear.com/7.x/adventurer/svg?seed=${activity.user.username}`}
                          alt={activity.user.username}
                          className="w-full h-full rounded-full object-cover border-2 border-white dark:border-gray-800"
                        />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {activity.user.username} {activity.action} {activity.target}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Story Viewer */}
      {isViewingStory && <StoryViewer />}

      {/* Create Post Modal */}
      <CreatePostModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </div>
  );
};