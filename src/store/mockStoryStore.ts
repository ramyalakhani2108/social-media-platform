import { create } from 'zustand';
import { Story } from '@/types';
import { useAuthStore } from './mockAuthStore';

interface StoryState {
  stories: Story[];
  activeStoryIndex: number;
  isViewingStory: boolean;
  addStory: (userId: string, mediaUrl: string, mediaType: 'image' | 'video') => void;
  viewStory: (storyId: string) => void;
  closeStoryView: () => void;
  nextStory: () => void;
  previousStory: () => void;
  markAsSeen: (storyId: string, userId: string) => void;
}

// Helper to generate a random ID
const generateId = () => Math.random().toString(36).substring(2, 15);

// Helper to check if a story is expired (24 hours)
const isStoryExpired = (expiresAt: string) => {
  return new Date(expiresAt) < new Date();
};

// We use this function in the StoryList component

export const useStoryStore = create<StoryState>((set, get) => ({
  stories: [
    {
      id: 'story1',
      user_id: 'user1',
      media_url: 'https://source.unsplash.com/random/800x800/?nature',
      media_type: 'image',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      seen_by: [],
      user: {
        id: 'user1',
        email: 'travel_photography@example.com',
        username: 'travel_photography',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=travel_photography',
        isVerified: true,
        bio: 'Exploring the world one photo at a time 🌍',
        location: 'Iceland',
        website: 'https://travelphotography.com',
        isAdmin: false,
        created_at: new Date().toISOString()
      }
    },
    {
      id: 'story2',
      user_id: 'user2',
      media_url: 'https://source.unsplash.com/random/800x800/?food',
      media_type: 'image',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      seen_by: [],
      user: {
        id: 'user2',
        email: 'foodie_adventures@example.com',
        username: 'foodie_adventures',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=foodie_adventures',
        bio: 'Food lover and culinary explorer 🍽️',
        location: 'Tokyo, Japan',
        isAdmin: false,
        created_at: new Date().toISOString()
      }
    },
    {
      id: 'story3',
      user_id: 'user3',
      media_url: 'https://source.unsplash.com/random/800x800/?fitness',
      media_type: 'image',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      seen_by: [],
      user: {
        id: 'user3',
        email: 'fitness_guru@example.com',
        username: 'fitness_guru',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=fitness_guru',
        isVerified: true,
        bio: 'Fitness coach | Motivational speaker 💪',
        location: 'Los Angeles, USA',
        isAdmin: false,
        created_at: new Date().toISOString()
      }
    },
    {
      id: 'story4',
      user_id: 'user4',
      media_url: 'https://source.unsplash.com/random/800x800/?art',
      media_type: 'image',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      seen_by: [],
      user: {
        id: 'user4',
        email: 'art_gallery@example.com',
        username: 'art_gallery',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=art_gallery',
        bio: 'Art curator | Gallery owner 🎨',
        location: 'Paris, France',
        isAdmin: false,
        created_at: new Date().toISOString()
      }
    },
    {
      id: 'story5',
      user_id: 'user5',
      media_url: 'https://source.unsplash.com/random/800x800/?music',
      media_type: 'image',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      seen_by: [],
      user: {
        id: 'user5',
        email: 'music_lover@example.com',
        username: 'music_lover',
        avatar_url: 'https://api.dicebear.com/7.x/adventurer/svg?seed=music_lover',
        bio: 'Vinyl collector | Music enthusiast 🎶',
        location: 'London, UK',
        isAdmin: false,
        created_at: new Date().toISOString()
      }
    }
  ],
  activeStoryIndex: 0,
  isViewingStory: false,

  addStory: (userId, mediaUrl, mediaType) => {
    const { user } = useAuthStore.getState();
    if (!user) return;

    const newStory: Story = {
      id: generateId(),
      user_id: userId,
      media_url: mediaUrl,
      media_type: mediaType,
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours from now
      seen_by: [],
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        avatar_url: user.avatar_url,
        isAdmin: user.isAdmin || false,
        created_at: new Date().toISOString()
      },
    };

    set((state) => ({
      stories: [...state.stories, newStory],
    }));
  },

  viewStory: (storyId) => {
    const { stories } = get();
    const storyIndex = stories.findIndex((story) => story.id === storyId);
    
    if (storyIndex !== -1) {
      set({
        activeStoryIndex: storyIndex,
        isViewingStory: true,
      });
    }
  },

  closeStoryView: () => {
    set({
      isViewingStory: false,
    });
  },

  nextStory: () => {
    const { stories, activeStoryIndex } = get();
    
    if (activeStoryIndex < stories.length - 1) {
      set({
        activeStoryIndex: activeStoryIndex + 1,
      });
    } else {
      // If we're at the last story, close the story view
      set({
        isViewingStory: false,
      });
    }
  },

  previousStory: () => {
    const { activeStoryIndex } = get();
    
    if (activeStoryIndex > 0) {
      set({
        activeStoryIndex: activeStoryIndex - 1,
      });
    }
  },

  markAsSeen: (storyId, userId) => {
    set((state) => ({
      stories: state.stories.map((story) => {
        if (story.id === storyId && !story.seen_by.includes(userId)) {
          return {
            ...story,
            seen_by: [...story.seen_by, userId],
          };
        }
        return story;
      }),
    }));
  },
}));
