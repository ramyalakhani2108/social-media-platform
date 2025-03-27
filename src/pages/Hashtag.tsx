import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useHashtagStore } from '../store/mockHashtagStore';
import { Grid, Heart, MessageCircle, Users, TrendingUp, Image } from 'lucide-react';

interface Post {
  id: string;
  user_id: string;
  caption: string;
  media_url: string;
  media_type: 'image';
  likes_count: number;
  comments_count: number;
  created_at: string;
  user: {
    id: string;
    username: string;
    email: string;
    avatar_url: string;
    created_at: string;
  };
  hashtags: string[];
}

export const Hashtag = () => {
  const { hashtag } = useParams() as { hashtag: string };
  const hashtagStore = useHashtagStore();
  const [view, setView] = useState<'grid' | 'top' | 'recent'>('grid');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      setError(null);

      // Get all posts from hashtag store
      const hashtagData = hashtagStore.getHashtagData(hashtag);
      const allPosts = hashtagData?.featured_posts || [];
      
      // Filter posts by hashtag
      const filteredPosts = allPosts.filter(post =>
        post.caption.includes(`#${hashtag}`)
      );

      // If loading more, append to existing posts
      if (page > 1) {
        setPosts(prev => [...prev, ...filteredPosts]);
      } else {
        setPosts(filteredPosts);
      }

      // Set hasMore based on remaining posts
      setHasMore(filteredPosts.length > 0);
    } catch (err) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hashtagData = hashtagStore.getHashtagData(hashtag);
    if (!hashtagData) {
      // Initialize new hashtag if it doesn't exist
      hashtagStore.hashtags?.set(hashtag, {
        name: hashtag,
        post_count: 0,
        followers_count: 0,
        is_following: false
      });
    }
    fetchPosts(1);
  }, [hashtag]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">#{hashtag}</h1>
        <Button variant="outline" onClick={() => setView(prev => prev === 'grid' ? 'top' : 'grid')}>
          {view === 'grid' ? 'Top Posts' : 'Grid View'}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-6">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    #{hashtag}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Explore photos and videos
                  </p>
                </div>
                <Button
                  variant={hashtagStore.getHashtagData(hashtag)?.is_following ? 'outline' : 'default'}
                  onClick={() => {
                    if (hashtagStore.getHashtagData(hashtag)?.is_following) {
                      hashtagStore.unfollowHashtag(hashtag);
                    } else {
                      hashtagStore.followHashtag(hashtag);
                    }
                  }}
                >
                  {hashtagStore.getHashtagData(hashtag)?.is_following ? 'Following' : 'Follow'}
                </Button>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <Grid className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {hashtagStore.getHashtagData(hashtag)?.post_count.toLocaleString() || 0} posts
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-900 dark:text-white font-semibold">
                    {hashtagStore.getHashtagData(hashtag)?.followers_count.toLocaleString() || 0} followers
                  </span>
                </div>
              </div>

              {hashtagStore.getHashtagData(hashtag)?.related_tags && hashtagStore.getHashtagData(hashtag).related_tags.length > 0 && (
                <div className="flex items-center space-x-2 overflow-x-auto py-2">
                  {hashtagStore.getHashtagData(hashtag).related_tags.map((tag) => (
                    <Link
                      key={tag}
                      to={`/hashtag/${tag}`}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* View options */}
          <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-3">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setView('grid')}
                className={`flex items-center space-x-2 ${view === 'grid' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <Grid className="h-5 w-5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setView('top')}
                className={`flex items-center space-x-2 ${view === 'top' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <TrendingUp className="h-5 w-5" />
                <span>Top</span>
              </button>
              <button
                onClick={() => setView('recent')}
                className={`flex items-center space-x-2 ${view === 'recent' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              >
                <Image className="h-5 w-5" />
                <span>Recent</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  No posts yet
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Be the first to post with #{hashtag}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square group cursor-pointer"
                  >
                    <Link to={`/post/${post.id}`}>
                      <img
                        src={post.media_url}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center space-x-4">
                        <div className="opacity-0 group-hover:opacity-100 text-white flex items-center">
                          <span className="font-semibold">{post.likes_count}</span>
                          <Heart className="h-5 w-5 ml-1" />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 text-white flex items-center">
                          <span className="font-semibold">{post.comments_count}</span>
                          <MessageCircle className="h-5 w-5 ml-1" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
