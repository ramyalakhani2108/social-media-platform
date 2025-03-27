import { useState, useEffect } from 'react';
import { User } from '@/types';
import { useSuggestionsStore } from '@/store/suggestionsStore';
import { useAuthStore } from '@/store/mockAuthStore';
import { Button } from '@/components/ui/Button';

export const Suggestions = () => {
  const { getSuggestedUsers, followUser } = useSuggestionsStore();
  const { user } = useAuthStore();
  const [suggestions, setSuggestions] = useState<User[]>([]);

  useEffect(() => {
    if (user) {
      const suggestedUsers = getSuggestedUsers(user.id, 50); // Get more suggestions for the dedicated page
      setSuggestions(suggestedUsers);
    }
  }, [user, getSuggestedUsers]);

  const handleFollow = (userId: string) => {
    followUser(userId);
    // Update the suggestions list by removing the followed user
    setSuggestions(prev => prev.filter(suggestion => suggestion.id !== userId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Suggested For You
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map(suggestion => (
          <div
            key={suggestion.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={suggestion.avatar_url}
                alt={suggestion.username}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  {suggestion.username}
                  {suggestion.isVerified && (
                    <span className="ml-1 text-blue-500">✓</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {suggestion.bio}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {suggestion.followers.toLocaleString()} followers
                </p>
              </div>
            </div>
            <Button
              onClick={() => handleFollow(suggestion.id)}
              className="ml-4"
              variant="primary"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
