import { useState, useEffect } from 'react';
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
import { homeApi } from '@/services/api.service';

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

interface Story {
  id: string;
  media_url: string;
  media_type: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
}

interface Activity {
  id: string;
  action: string;
  target: string;
  created_at: string;
  user: {
    id: string;
    username: string;
    avatar_url: string;
  };
}

export const Home = () => {
  const { user, checkAuth } = useAuthStore();
  const { storiesLayout } = useLayoutStore();
  const { isViewingStory } = useStoryStore();
  const { posts } = usePostStore();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [feedData, setFeedData] = useState<{ posts: Post[]; stories: Story[]; activities: Activity[] }>({
    posts: [],
    stories: [],
    activities: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAndFetchFeed = async () => {
      try {
        await checkAuth();
        if (user?.id) {
          const data = await homeApi.getFeed();
          setFeedData(data);
        }
      } catch (error) {
        console.error('Error checking auth and fetching feed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAndFetchFeed();
  }, [checkAuth, user?.id]);

  const handleCreatePost = async (post: any) => {
    try {
      await homeApi.createPost(post);
      // Refresh feed
      const data = await homeApi.getFeed();
      setFeedData(data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      await homeApi.likePost(postId);
      // Refresh feed
      const data = await homeApi.getFeed();
      setFeedData(data);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: string, comment: string) => {
    try {
      await homeApi.addComment(postId, comment);
      // Refresh feed
      const data = await homeApi.getFeed();
      setFeedData(data);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center h-screen">Please login to view your feed</div>;
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <h1 className="text-xl font-bold">Home</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col gap-4">
        {/* Stories Section */}
        <div className="p-4">
          <StoryList stories={feedData.stories} />
        </div>

        {/* Posts Section */}
        <div className="flex flex-col gap-4">
          {feedData.posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLikePost(post.id)}
              onComment={(comment) => handleAddComment(post.id, comment)}
            />
          ))}
        </div>

        {/* Activities Section */}
        <div className="p-4 border-t">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <div className="space-y-2">
            {feedData.activities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-2">
                <img
                  src={activity.user.avatar_url}
                  alt={activity.user.username}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.user.username}</span> {activity.action}{' '}
                    <span className="text-gray-500">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(activity.created_at).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreatePost}
      />
    </div>
  );
};