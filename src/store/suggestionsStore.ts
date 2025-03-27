import { create } from 'zustand';
import { User } from '@/types';
import { SAMPLE_USERS } from './mockAuthStore';

interface SuggestionsState {
  followedUsers: Set<string>;
  getSuggestedUsers: (userId: string, limit?: number) => User[];
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  getProfileSuggestions: (userId: string, limit?: number) => User[];
}

export const useSuggestionsStore = create<SuggestionsState>((set, get) => ({
  followedUsers: new Set<string>(),

  getSuggestedUsers: (userId: string, limit = 5) => {
    const { followedUsers } = get();
    return SAMPLE_USERS
      .filter(user => 
        user.id !== userId && 
        !followedUsers.has(user.id)
      )
      .sort(() => Math.random() - 0.5) // Randomize suggestions
      .slice(0, limit);
  },

  getProfileSuggestions: (userId: string, limit = 5) => {
    const { followedUsers } = get();
    // Get users with similar interests/location as the profile being viewed
    return SAMPLE_USERS
      .filter(user => 
        user.id !== userId && 
        !followedUsers.has(user.id)
      )
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  },

  followUser: (userId: string) => {
    set(state => ({
      followedUsers: new Set([...state.followedUsers, userId])
    }));
  },

  unfollowUser: (userId: string) => {
    set(state => {
      const newFollowedUsers = new Set(state.followedUsers);
      newFollowedUsers.delete(userId);
      return { followedUsers: newFollowedUsers };
    });
  },
}));
