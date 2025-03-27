import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HashtagPost {
  id: string;
  media_url: string;
  caption: string;
  likes_count: number;
  comments_count: number;
  user: {
    id: string;
    username: string;
    avatar_url: string;
    isVerified?: boolean;
  };
  created_at: string;
}

export interface Hashtag {
  id: string;
  name: string;
  post_count: number;
  followers_count: number;
  featured_posts: HashtagPost[];
  related_tags: string[];
  description?: string;
  is_following: boolean;
}

interface HashtagState {
  hashtags: Record<string, Hashtag>;
  followedHashtags: string[];
  getHashtagData: (name: string) => Hashtag | null;
  followHashtag: (name: string) => void;
  unfollowHashtag: (name: string) => void;
  addPost: (hashtagName: string, post: Omit<HashtagPost, 'id'>) => void;
}

export const useHashtagStore = create<HashtagState>()(
  persist(
    (set, get) => ({
      hashtags: {
        photography: {
          id: '1',
          name: 'photography',
          post_count: 15000000,
          followers_count: 500000,
          is_following: false,
          description: 'Capturing life\'s beautiful moments through the lens 📸',
          related_tags: ['nature', 'portrait', 'travel'],
          featured_posts: [
            {
              id: '1',
              media_url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
              caption: 'Beautiful sunset #photography #nature',
              likes_count: 1500,
              comments_count: 45,
              user: {
                id: 'user1',
                username: 'photography_lover',
                avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=photo',
                isVerified: true,
              },
              created_at: '2 hours ago',
            },
            // Add more sample posts
          ],
        },
        nature: {
          id: '2',
          name: 'nature',
          post_count: 25000000,
          followers_count: 750000,
          is_following: false,
          description: 'Exploring the beauty of mother nature 🌿',
          related_tags: ['photography', 'landscape', 'wildlife'],
          featured_posts: [
            {
              id: '2',
              media_url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
              caption: 'Morning hike #nature #adventure',
              likes_count: 2300,
              comments_count: 78,
              user: {
                id: 'user2',
                username: 'nature_explorer',
                avatar_url: 'https://api.dicebear.com/7.x/avatars/svg?seed=nature',
                isVerified: true,
              },
              created_at: '5 hours ago',
            },
            // Add more sample posts
          ],
        },
      },
      followedHashtags: [],

      getHashtagData: (name: string) => {
        const { hashtags } = get();
        return hashtags[name] || null;
      },

      followHashtag: (name: string) => {
        const { hashtags, followedHashtags } = get();
        if (hashtags[name]) {
          set({
            hashtags: {
              ...hashtags,
              [name]: {
                ...hashtags[name],
                is_following: true,
                followers_count: hashtags[name].followers_count + 1,
              },
            },
            followedHashtags: [...followedHashtags, name],
          });
        }
      },

      unfollowHashtag: (name: string) => {
        const { hashtags, followedHashtags } = get();
        if (hashtags[name]) {
          set({
            hashtags: {
              ...hashtags,
              [name]: {
                ...hashtags[name],
                is_following: false,
                followers_count: Math.max(0, hashtags[name].followers_count - 1),
              },
            },
            followedHashtags: followedHashtags.filter(tag => tag !== name),
          });
        }
      },

      addPost: (hashtagName: string, post: Omit<HashtagPost, 'id'>) => {
        const { hashtags } = get();
        if (hashtags[hashtagName]) {
          const newPost = {
            ...post,
            id: Math.random().toString(36).substr(2, 9),
          };
          set({
            hashtags: {
              ...hashtags,
              [hashtagName]: {
                ...hashtags[hashtagName],
                post_count: hashtags[hashtagName].post_count + 1,
                featured_posts: [newPost, ...hashtags[hashtagName].featured_posts],
              },
            },
          });
        }
      },
    }),
    {
      name: 'hashtags-storage',
    }
  )
);
