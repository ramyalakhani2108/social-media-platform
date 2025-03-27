import { useEffect, useState, useRef } from 'react';
import { useStoryStore } from '@/store/mockStoryStore';
import { useAuthStore } from '@/store/mockAuthStore';
import { useLayoutStore } from '@/store/layoutStore';
import { StoryCircle } from './StoryCircle';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { User } from '@/types';

export const StoryList = () => {
  const { stories, viewStory } = useStoryStore();
  const { user } = useAuthStore();
  const { storiesLayout } = useLayoutStore();
  const [storyUsers, setStoryUsers] = useState<User[]>([]);

  useEffect(() => {
    const userMap = new Map<string, User>();
    stories.forEach((story) => {
      const isExpired = new Date(story.expires_at) < new Date();
      if (!isExpired) {
        userMap.set(story.user_id, story.user);
      }
    });
    setStoryUsers(Array.from(userMap.values()));
  }, [stories]);

  const handleAddStory = () => {
    // In a real app, this would open a file picker or camera
    alert('Add story functionality would be implemented here');
  };

  const handleViewStory = (userId: string) => {
    const userStory = stories.find(
      (story) => story.user_id === userId && new Date(story.expires_at) > new Date()
    );
    if (userStory) {
      viewStory(userStory.id);
    }
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (storiesLayout === 'vertical') return;
    
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 20);
    setShowRightArrow(container.scrollLeft < (container.scrollWidth - container.clientWidth - 20));
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const targetScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container && storiesLayout !== 'vertical') {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();

      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [storiesLayout]);

  return (
    <div className="mb-8">
      <div className={`${storiesLayout === 'vertical' ? 'flex flex-col space-y-2' : 'flex items-center justify-between'} mb-4`}>
        <h2 className="text-lg font-semibold">Stories</h2>
        {storiesLayout === 'vertical' ? (
          <button
            onClick={handleAddStory}
            className="flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Story
          </button>
        ) : (
          <button
            onClick={handleAddStory}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Story
          </button>
        )}
      </div>

      <div 
        ref={scrollContainerRef}
        className={`${storiesLayout === 'vertical' ? 'overflow-y-auto max-h-[400px]' : 'overflow-x-auto'} scrollbar-hide -mx-2 px-2`}
      >
        <div className={`${storiesLayout === 'vertical' ? 'flex flex-col space-y-2' : 'flex space-x-2'}`}>
          {user && (
            <StoryCircle
              user={{
                id: user.id,
                username: user.username,
                avatar_url: user.avatar_url,
                isVerified: user.isVerified,
              }}
              onClick={handleAddStory}
              isAddStory
            />
          )}
          {storyUsers.map((storyUser) => (
            <StoryCircle
              key={storyUser.id}
              user={storyUser}
              onClick={() => handleViewStory(storyUser.id)}
              isActive={stories.some(
                (story) =>
                  story.user_id === storyUser.id &&
                  new Date(story.expires_at) > new Date()
              )}
            />
          ))}
        </div>
      </div>

      {storiesLayout !== 'vertical' && (
        <>
          {showLeftArrow && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2"
            >
              ←
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full shadow-lg p-2"
            >
              →
            </button>
          )}
        </>
      )}
    </div>
  );
};
