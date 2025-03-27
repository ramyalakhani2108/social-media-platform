import { create } from 'zustand';
import { useAuthStore } from './mockAuthStore';

interface SidebarState {
  suggestions: Array<{
    id: string;
    username: string;
    avatar_url: string;
    is_following: boolean;
    mutual_followers: number;
    bio: string;
    isVerified: boolean;
  }>;
  trending: Array<{
    id: string;
    hashtag: string;
    post_count: number;
    related_tags: string[];
  }>;
  notifications: Array<{
    id: string;
    type: 'like' | 'comment' | 'follow' | 'mention';
    from_user: {
      id: string;
      username: string;
      avatar_url: string;
      isVerified: boolean;
    };
    post?: {
      id: string;
      media_url: string;
      caption: string;
    };
    timestamp: string;
    read: boolean;
    content: string;
  }>;
  user: {
    id: string;
    email: string;
    username: string;
    avatar_url: string;
    created_at: string;
    isAdmin: boolean;
    isVerified: boolean;
    bio: string;
    location: string;
    website: string;
    followers: number;
    following: number;
    posts: number;
  };
  getUserData: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  suggestions: [
    {
      id: 's1',
      username: 'travel_photography',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=travel_photography',
      is_following: false,
      mutual_followers: 3,
      bio: 'Exploring the world one photo at a time 🌍',
      isVerified: true
    },
    {
      id: 's2',
      username: 'foodie_adventures',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=foodie_adventures',
      is_following: false,
      mutual_followers: 2,
      bio: 'Food lover and culinary explorer 🍽️',
      isVerified: false
    },
    {
      id: 's3',
      username: 'fitness_guru',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=fitness_guru',
      is_following: false,
      mutual_followers: 5,
      bio: 'Fitness coach | Motivational speaker 💪',
      isVerified: true
    },
    {
      id: 's4',
      username: 'art_gallery',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=art_gallery',
      is_following: false,
      mutual_followers: 4,
      bio: 'Art curator | Gallery owner 🎨',
      isVerified: false
    },
    {
      id: 's5',
      username: 'music_lover',
      avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=music_lover',
      is_following: false,
      mutual_followers: 1,
      bio: 'Vinyl collector | Music enthusiast 🎶',
      isVerified: false
    }
  ],
  trending: [
    {
      id: 't1',
      hashtag: 'travel',
      post_count: 1000000,
      related_tags: ['photography', 'adventure', 'vacation']
    },
    {
      id: 't2',
      hashtag: 'food',
      post_count: 800000,
      related_tags: ['cooking', 'recipe', 'dinner']
    },
    {
      id: 't3',
      hashtag: 'fitness',
      post_count: 600000,
      related_tags: ['workout', 'gym', 'health']
    },
    {
      id: 't4',
      hashtag: 'art',
      post_count: 500000,
      related_tags: ['painting', 'drawing', 'creativity']
    },
    {
      id: 't5',
      hashtag: 'music',
      post_count: 700000,
      related_tags: ['concert', 'live', 'performance']
    }
  ],
  notifications: [
    {
      id: 'n1',
      type: 'like',
      from_user: {
        id: 'user1',
        username: 'travel_photography',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=travel_photography',
        isVerified: true
      },
      post: {
        id: 'post1',
        media_url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
        caption: 'Exploring the hidden gems of Iceland 🇮🇸 #travel #photography'
      },
      timestamp: '2 hours ago',
      read: false,
      content: 'Amazing shot! 📸✨'
    },
    {
      id: 'n2',
      type: 'comment',
      from_user: {
        id: 'user2',
        username: 'foodie_adventures',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=foodie_adventures',
        isVerified: false
      },
      post: {
        id: 'post2',
        media_url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
        caption: 'Exploring the hidden gems of Iceland 🇮🇸 #travel #photography'
      },
      timestamp: '3 hours ago',
      read: true,
      content: 'Love the colors in this shot! 🌈'
    },
    {
      id: 'n3',
      type: 'follow',
      from_user: {
        id: 'user3',
        username: 'fitness_guru',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=fitness_guru',
        isVerified: true
      },
      timestamp: '4 hours ago',
      read: false,
      content: ''
    },
    {
      id: 'n4',
      type: 'mention',
      from_user: {
        id: 'user4',
        username: 'art_gallery',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=art_gallery',
        isVerified: false
      },
      post: {
        id: 'post3',
        media_url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
        caption: 'Exploring the hidden gems of Iceland 🇮🇸 #travel #photography'
      },
      timestamp: '5 hours ago',
      read: true,
      content: 'Check out this amazing shot! @user'
    }
  ],
  user: {
    id: 'user',
    email: 'user@example.com',
    username: 'user',
    avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=user',
    created_at: new Date().toISOString(),
    isAdmin: false,
    isVerified: false,
    bio: 'No bio yet',
    location: 'Somewhere',
    website: '',
    followers: 100,
    following: 50,
    posts: 20
  },
  
  // Function to get user data from auth store
  getUserData: () => {
    const authUser = useAuthStore.getState().user;
    if (authUser) {
      set({
        user: {
          ...useAuthStore.getState().user,
          id: authUser.id || 'user',
          email: authUser.email || 'user@example.com',
          username: authUser.username || 'user',
          avatar_url: authUser.avatar_url || 'https://api.dicebear.com/7.x/adventurer/svg?seed=user',
          created_at: authUser.created_at || new Date().toISOString(),
          isAdmin: authUser.isAdmin || false,
          isVerified: authUser.isVerified || false,
          bio: authUser.isAdmin ? 'Administrator' : 'Regular user',
          location: authUser.location || 'Somewhere',
          website: authUser.website || '',
          followers: 100,
          following: 50,
          posts: 20
        }
      });
    }
  }
}));
