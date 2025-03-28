import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Highlight, Post } from '@/types';

// Predefined test accounts for easy testing
const TEST_ACCOUNTS = {
  admin: {
    id: '1',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true,
    username: 'admin',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    isVerified: true,
    bio: 'Administrator',
    location: 'Global',
    website: 'https://admin.com',
    created_at: new Date().toISOString(),
    posts: [],
    followers: 1000,
    following: 500,
    highlights: [
      {
        id: '1',
        title: 'Trip to Paris',
        cover: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
        type: 'image',
        content: {
          media_url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
          media_type: 'image'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Foodie',
        cover: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        type: 'text',
        content: {
          text: 'From street food to fine dining, exploring the world through my taste buds 🍽️ #Foodie #FoodPhotography'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        title: 'Travel Diaries',
        cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
        type: 'image',
        content: {
          media_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
          media_type: 'image'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '4',
        title: 'My Workout',
        cover: 'https://images.unsplash.com/photo-1557861983-f7beb8881f91',
        type: 'video',
        content: {
          media_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          media_type: 'video'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '5',
        title: 'Daily Quote',
        cover: 'https://images.unsplash.com/photo-1573497019305-2f6670d53884',
        type: 'text',
        content: {
          text: 'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '6',
        title: 'Project Update',
        cover: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
        type: 'image',
        content: {
          media_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
          media_type: 'image'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  },
  user: {
    id: '2',
    email: 'user@example.com',
    password: 'user123',
    isAdmin: false,
    username: 'user',
    avatar_url: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6',
    isVerified: false,
    bio: 'Regular user',
    location: 'Local',
    website: 'https://user.com',
    created_at: new Date().toISOString(),
    posts: [],
    followers: 100,
    following: 200,
    highlights: [
      {
        id: '7',
        title: 'My Journey',
        cover: 'https://images.unsplash.com/photo-1557861983-f7beb8881f91',
        type: 'image',
        content: {
          media_url: 'https://images.unsplash.com/photo-1557861983-f7beb8881f91',
          media_type: 'image'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '8',
        title: 'Fitness',
        cover: 'https://images.unsplash.com/photo-1557861983-f7beb8881f91',
        type: 'video',
        content: {
          media_url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          media_type: 'video'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '9',
        title: 'Daily Thoughts',
        cover: 'https://images.unsplash.com/photo-1573497019305-2f6670d53884',
        type: 'text',
        content: {
          text: 'Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill'
        },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
  }
};

// Export SAMPLE_USERS for use in other files
export const SAMPLE_USERS: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    username: 'johndoe',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    isVerified: true,
    isAdmin: false,
    bio: 'Dancer | Creator | #viral',
    location: 'New York, NY',
    website: 'https://johndoe.com',
    created_at: new Date().toISOString(),
    posts: [],
    followers: 1234,
    following: 567,
    highlights: [],
    stats: {
      posts: 150,
      followers: 1234,
      following: 567
    }
  },
  // Add the rest of the users here
];

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isFetchingFollowers: boolean;
  isFetchingFollowing: boolean;
  theme: 'light' | 'dark';
  notifications_enabled: boolean;
  privacy_settings: {
    posts: 'public' | 'friends' | 'only_me';
    stories: 'public' | 'friends' | 'only_me';
    comments: 'everyone' | 'friends' | 'only_me';
  };
  settingsLoading: boolean;
  settingsError: string | null;
  followers: {
    id: string;
    username: string;
    avatar_url: string;
    is_following: boolean;
  }[];
  following: {
    id: string;
    username: string;
    avatar_url: string;
    is_following: boolean;
  }[];
  savedPosts: Post[];
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isFetchingFollowers: false,
  isFetchingFollowing: false,
  theme: 'light',
  notifications_enabled: true,
  privacy_settings: {
    posts: 'public',
    stories: 'friends',
    comments: 'everyone',
  },
  settingsLoading: false,
  settingsError: null,
  followers: [],
  following: [],
  savedPosts: [],
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          // Determine which account to use based on credentials
          const account = email === 'admin@example.com' && password === 'admin123' 
            ? TEST_ACCOUNTS.admin 
            : TEST_ACCOUNTS.user;

          // Remove password from account object
          const { password: _, ...user } = account;

          // Simulate fetching followers and following
          const followers = Array.from({ length: 5 }, (_, i) => ({
            id: `user-${i}`,
            username: `user${i}`,
            avatar_url: `https://randomuser.me/api/portraits/men/${i}.jpg`,
            is_following: true,
          }));

          const following = Array.from({ length: 10 }, (_, i) => ({
            id: `following-${i}`,
            username: `following${i}`,
            avatar_url: `https://randomuser.me/api/portraits/women/${i}.jpg`,
            is_following: true,
          }));

          // Instagram-like saved posts with various collections
          const savedPosts = [
            // Travel Collection
            {
              id: '1',
              userId: 'user-1',
              user: {
                id: 'user-1',
                username: 'travelblogger',
                avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                isVerified: true
              },
              caption: 'Santorini sunset 🌅 #travel #greekislands',
              media_url: 'https://images.unsplash.com/photo-1512314889840-32013113b6cc',
              media_type: 'image' as const,
              likes_count: 1500,
              comments_count: 250,
              comments: [
                {
                  id: '1',
                  userId: 'user-2',
                  content: 'Amazing shot! 🌟',
                  created_at: new Date().toISOString()
                },
                {
                  id: '2',
                  userId: 'user-3',
                  content: 'Dream destination!',
                  created_at: new Date().toISOString()
                }
              ],
              created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              saved: true,
              collection: 'Travel'
            },
            {
              id: '2',
              userId: 'user-2',
              user: {
                id: 'user-2',
                username: 'foodie',
                avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7',
                isVerified: true
              },
              caption: 'Street food adventure in Bangkok 🍜 #foodie #thailand',
              media_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
              media_type: 'image' as const,
              likes_count: 1200,
              comments_count: 180,
              comments: [
                {
                  id: '3',
                  userId: 'user-1',
                  content: 'Yum! What did you try?',
                  created_at: new Date().toISOString()
                }
              ],
              created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              saved: true,
              collection: 'Food'
            },
            {
              id: '3',
              userId: 'user-3',
              user: {
                id: 'user-3',
                username: 'fashionista',
                avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
                isVerified: true
              },
              caption: 'New season, new vibe 🎀 #fashion #style',
              media_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
              media_type: 'image' as const,
              likes_count: 2100,
              comments_count: 320,
              comments: [],
              created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
              saved: true,
              collection: 'Fashion'
            },
            {
              id: '4',
              userId: 'user-4',
              user: {
                id: 'user-4',
                username: 'nature_lover',
                avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                isVerified: false
              },
              caption: 'Mountain views 🏔️ #nature #landscape',
              media_url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
              media_type: 'image' as const,
              likes_count: 800,
              comments_count: 120,
              comments: [],
              created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
              saved: true,
              collection: 'Nature'
            },
            {
              id: '5',
              userId: 'user-5',
              user: {
                id: 'user-5',
                username: 'pet_lover',
                avatar_url: 'https://images.unsplash.com/photo-1590587000002-739236c4a21d',
                isVerified: false
              },
              caption: 'My furry friend 🐾 #petsofinstagram #cute',
              media_url: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d',
              media_type: 'image' as const,
              likes_count: 1800,
              comments_count: 280,
              comments: [
                {
                  id: '4',
                  userId: 'user-1',
                  content: 'What a beautiful dog!',
                  created_at: new Date().toISOString()
                }
              ],
              created_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
              saved: true,
              collection: 'Pets'
            },
            {
              id: '6',
              userId: 'user-6',
              user: {
                id: 'user-6',
                username: 'artistic',
                avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
                isVerified: true
              },
              caption: 'Street art in Berlin 🎨 #art #streetart',
              media_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
              media_type: 'image' as const,
              likes_count: 1400,
              comments_count: 200,
              comments: [],
              created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
              saved: true,
              collection: 'Art'
            }
          ];

          set({
            user: user as User,
            isAuthenticated: true,
            isLoading: false,
            followers,
            following,
            savedPosts,
          });
        } catch (error) {
          set({
            error: 'Failed to login',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set(initialState);
      },

      updateSettings: async (settings: Partial<AuthState>) => {
        set({ settingsLoading: true, settingsError: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          set((state) => ({
            ...state,
            ...settings,
            settingsLoading: false,
          }));
        } catch (error) {
          set({
            settingsError: 'Failed to update settings',
            settingsLoading: false,
          });
        }
      },

      updateFollowStatus: async (userId: string, isFollowing: boolean) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          set((state) => {
            const newState = { ...state };
            if (isFollowing) {
              newState.following.push({
                id: userId,
                username: `user${userId}`,
                avatar_url: `https://randomuser.me/api/portraits/women/${userId}.jpg`,
                is_following: true,
              });
            } else {
              newState.following = newState.following.filter(u => u.id !== userId);
            }
            return newState;
          });
        } catch (error) {
          set({
            error: 'Failed to update follow status',
            isLoading: false,
          });
        }
      },

      fetchFollowers: async () => {
        set({ isFetchingFollowers: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const followers = Array.from({ length: 5 }, (_, i) => ({
            id: `user-${i}`,
            username: `user${i}`,
            avatar_url: `https://randomuser.me/api/portraits/men/${i}.jpg`,
            is_following: true,
          }));

          set((state) => ({
            ...state,
            followers,
            isFetchingFollowers: false,
          }));
        } catch (error) {
          set({
            error: 'Failed to fetch followers',
            isFetchingFollowers: false,
          });
        }
      },

      fetchFollowing: async () => {
        set({ isFetchingFollowing: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const following = Array.from({ length: 10 }, (_, i) => ({
            id: `following-${i}`,
            username: `following${i}`,
            avatar_url: `https://randomuser.me/api/portraits/women/${i}.jpg`,
            is_following: true,
          }));

          set((state) => ({
            ...state,
            following,
            isFetchingFollowing: false,
          }));
        } catch (error) {
          set({
            error: 'Failed to fetch following',
            isFetchingFollowing: false,
          });
        }
      },

      savePost: async (postId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          const post: Post = {
            id: postId,
            userId: 'user-1',
            user: {
              id: 'user-1',
              username: 'user1',
              avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
              isVerified: false,
            },
            caption: 'Post caption',
            media_url: 'https://picsum.photos/600/400?random=1',
            media_type: 'image' as const,
            likes_count: Math.floor(Math.random() * 100),
            comments_count: Math.floor(Math.random() * 50),
            comments: [],
            created_at: new Date().toISOString(),
            saved: true,
            collection: 'General',
          };

          set((state) => ({
            ...state,
            savedPosts: [...state.savedPosts, post],
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: 'Failed to save post',
            isLoading: false,
          });
        }
      },

      unsavePost: async (postId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));
          
          set((state) => ({
            ...state,
            savedPosts: state.savedPosts.filter(post => post.id !== postId),
            isLoading: false,
          }));
        } catch (error) {
          set({
            error: 'Failed to unsave post',
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
