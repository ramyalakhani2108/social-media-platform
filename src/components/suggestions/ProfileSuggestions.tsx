import { useState, useEffect } from 'react';
import { User } from '@/types';
import { useSuggestionsStore } from '@/store/suggestionsStore';
import { Button } from '@/components/ui/Button';

interface ProfileSuggestionsProps {
  userId: string;
}

export const ProfileSuggestions = ({ userId }: ProfileSuggestionsProps) => {
  const { getProfileSuggestions, followUser } = useSuggestionsStore();
  const [suggestions, setSuggestions] = useState<User[]>([]);

  useEffect(() => {
    const profileSuggestions = getProfileSuggestions(userId);
    setSuggestions(profileSuggestions);
  }, [userId, getProfileSuggestions]);

  const handleFollow = (suggestionId: string) => {
    followUser(suggestionId);
    setSuggestions(prev => prev.filter(s => s.id !== suggestionId));
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
        Suggested for you
      </h3>
      <div className="relative">
        <div className="flex overflow-x-auto space-x-4 scrollbar-hide pb-4">
          {suggestions.map(suggestion => (
            <div
              key={suggestion.id}
              className="flex-shrink-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow p-4"
            >
              <div className="flex flex-col items-center">
                <img
                  src={suggestion.avatar_url}
                  alt={suggestion.username}
                  className="w-16 h-16 rounded-full object-cover mb-2"
                />
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm flex items-center">
                  {suggestion.username}
                  {suggestion.isVerified && (
                    <span className="ml-1 text-blue-500 text-xs">✓</span>
                  )}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2">
                  {suggestion.bio?.slice(0, 30)}...
                </p>
                <Button
                  onClick={() => handleFollow(suggestion.id)}
                  variant="primary"
                  className="w-full text-sm"
                >
                  Follow
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
