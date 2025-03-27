import { useState, useEffect } from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { PostCard } from '../components/post/PostCard';
import { useAuthStore } from '@/store/mockAuthStore';
import { useSuggestionsStore } from '@/store/suggestionsStore';
import { ProfileSuggestions } from '@/components/suggestions/ProfileSuggestions';
import { Highlights } from '../components/profile/Highlights';
import { Post } from '@/types';

export const Profile = () => {
  const { user } = useAuthStore();
  const { followUser } = useSuggestionsStore();

  // For now, we'll just display the current user's profile
  const profileUser = user;

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Show suggestions after following
  useEffect(() => {
    if (isFollowing) {
      setShowSuggestions(true);
    }
  }, [isFollowing]);

  // Generate sample posts for the current user
  const SAMPLE_POSTS: Post[] = [
    {
      id: '1',
      userId: profileUser?.id || '1',
      caption: 'Beautiful sunset at the beach',
      media_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      media_type: 'image',
      likes_count: 120,
      comments_count: 8,
      created_at: new Date().toISOString(),
      user: {
        id: profileUser?.id || '1',
        username: profileUser?.username || 'johndoe',
        avatar_url: profileUser?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        isVerified: profileUser?.isVerified || false
      },
      comments: []
    },
    {
      id: '2',
      userId: profileUser?.id || '1',
      caption: 'City lights',
      media_url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390',
      media_type: 'image',
      likes_count: 89,
      comments_count: 5,
      created_at: new Date().toISOString(),
      user: {
        id: profileUser?.id || '1',
        username: profileUser?.username || 'johndoe',
        avatar_url: profileUser?.avatar_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        isVerified: profileUser?.isVerified || false
      },
      comments: []
    },
  ];

  const handleFollow = async () => {
    try {
      setIsFollowing(!isFollowing);
      if (!isFollowing && profileUser) {
        followUser(profileUser.id);
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    }
  };

  if (!profileUser) {
    return <div className="text-center py-8">Loading profile...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-shrink-0">
          <img
            src={profileUser.avatar_url}
            alt={profileUser.username}
            className="w-40 h-40 rounded-full object-cover border-4 border-white dark:border-gray-800"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{profileUser.username}</h1>
            {profileUser.isVerified && (
              <span className="text-blue-600">✓</span>
            )}
            <div className="flex gap-2">
              {profileUser.isAdmin && (
                <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                  Admin
                </span>
              )}
              <Button
                variant={isFollowing ? 'secondary' : 'primary'}
                onClick={handleFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>
          </div>
          <div className="flex gap-8 mb-8">
            <div className="text-center">
              <div className="font-bold text-2xl text-gray-900 dark:text-white">
                {profileUser.stats?.posts || 0}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-gray-900 dark:text-white">
                {profileUser.stats?.followers.toLocaleString() || 0}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl text-gray-900 dark:text-white">
                {profileUser.stats?.following.toLocaleString() || 0}
              </div>
              <div className="text-gray-500 dark:text-gray-400">Following</div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-semibold text-gray-900 dark:text-white">Bio</h2>
            <p className="text-gray-700 dark:text-gray-300">{profileUser.bio || 'No bio yet'}</p>
            <div className="flex gap-4">
              {profileUser.website && (
                <a
                  href={profileUser.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Website
                </a>
              )}
              {profileUser.location && (
                <span className="text-gray-600 dark:text-gray-400">{profileUser.location}</span>
              )}
            </div>
          </div>

          {/* Highlights section */}
          <Highlights
            highlights={profileUser.highlights || []}
            userId={profileUser.id}
          />
        </div>
      </div>

      {/* Show suggestions after following */}
      {showSuggestions && <ProfileSuggestions userId={profileUser.id} />}

      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="flex justify-end gap-2 mb-4">
          <Button
            variant={view === 'grid' ? 'primary' : 'secondary'}
            onClick={() => setView('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'primary' : 'secondary'}
            onClick={() => setView('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>

        {view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {SAMPLE_POSTS.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};