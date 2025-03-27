import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Highlight } from '@/types';

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
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
  isLoading: boolean;
  settingsMenu: Array<{
    id: string;
    title: string;
    icon: string;
    action: () => void;
  }>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      error: null,
      isLoading: false,
      settingsMenu: [
        {
          id: '1',
          title: 'Edit Profile',
          icon: 'user',
          action: () => {
            console.log('Edit Profile clicked');
          },
        },
        {
          id: '2',
          title: 'Settings',
          icon: 'cog',
          action: () => {
            console.log('Settings clicked');
          },
        },
        {
          id: '3',
          title: 'Archive',
          icon: 'archive',
          action: () => {
            console.log('Archive clicked');
          },
        },
        {
          id: '4',
          title: 'Saved',
          icon: 'bookmark',
          action: () => {
            console.log('Saved clicked');
          },
        },
        {
          id: '5',
          title: 'Close Friends',
          icon: 'users',
          action: () => {
            console.log('Close Friends clicked');
          },
        },
        {
          id: '6',
          title: 'Themes',
          icon: 'brush',
          action: () => {
            console.log('Themes clicked');
          },
        },
        {
          id: '7',
          title: 'Log Out',
          icon: 'logout',
          action: () => {
            set({ isAuthenticated: false, user: null });
          },
        },
      ],
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Find matching test account
          const account = Object.values(TEST_ACCOUNTS).find(
            (acc) => acc.email === email && acc.password === password
          );

          if (!account) {
            throw new Error('Invalid credentials');
          }

          // Create user object from account, excluding password
          const { password: _, ...user } = account;

          set({
            isAuthenticated: true,
            user: user as User,
            isLoading: false,
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false,
          });
        }
      },
      logout: () => {
        set({
          isAuthenticated: false,
          user: null,
        });
      },
      updateUser: (updates) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
