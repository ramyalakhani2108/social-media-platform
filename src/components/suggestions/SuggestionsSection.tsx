import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User } from '@/types';
import { useSuggestionsStore } from '@/store/suggestionsStore';
import { useAuthStore } from '@/store/mockAuthStore';
import { Button } from '@/components/ui/Button';

export const SuggestionsSection = () => {
  const { getSuggestedUsers, followUser } = useSuggestionsStore();
  const { user } = useAuthStore();
  const [suggestions, setSuggestions] = useState<User[]>([]);

  useEffect(() => {
    if (user) {
      const suggestedUsers = getSuggestedUsers(user.id);
      setSuggestions(suggestedUsers);
    }
  }, [user, getSuggestedUsers]);

  const handleFollow = (userId: string) => {
    followUser(userId);
    // Update the suggestions list by removing the followed user
    setSuggestions(prev => prev.filter(suggestion => suggestion.id !== userId));
  };

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Suggested For You
        </h2>
        <Link
          to="/suggestions"
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          See All
        </Link>
      </div>
      <div className="space-y-4">
        {suggestions.map(suggestion => (
          <div
            key={suggestion.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <img
                src={suggestion.avatar_url}
                alt={suggestion.username}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  {suggestion.username}
                  {suggestion.isVerified && (
                    <span className="ml-1 text-blue-500 text-xs">✓</span>
                  )}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {suggestion.followers.toLocaleString()} followers
                </p>
              </div>
            </div>
            <Button
              onClick={() => handleFollow(suggestion.id)}
              variant="primary"
              className="text-sm"
            >
              Follow
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
