import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStoryStore } from '@/store/mockStoryStore';
import { useAuthStore } from '@/store/mockAuthStore';
import { Story } from '@/types';

export const StoryViewer = () => {
  const { stories, activeStoryIndex, isViewingStory, closeStoryView, nextStory, previousStory, markAsSeen } = useStoryStore();
  const { user } = useAuthStore();
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  const activeStory: Story | undefined = stories[activeStoryIndex];

  useEffect(() => {
    if (!isViewingStory || !activeStory || !user) return;

    // Mark the story as seen
    markAsSeen(activeStory.id, user.id);

    // Reset progress when active story changes
    setProgress(0);

    // Auto-advance progress
    const interval = setInterval(() => {
      if (!paused) {
        setProgress((prev) => {
          const newProgress = prev + 0.5;
          if (newProgress >= 100) {
            clearInterval(interval);
            nextStory();
            return 0;
          }
          return newProgress;
        });
      }
    }, 50); // 50ms * 200 steps = ~10 seconds per story

    return () => clearInterval(interval);
  }, [activeStoryIndex, isViewingStory, paused, activeStory, user, markAsSeen, nextStory]);

  if (!isViewingStory || !activeStory) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        onClick={closeStoryView}
      >
        <div 
          className="relative h-[80vh] w-[90vw] max-w-md overflow-hidden rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Story progress bar */}
          <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-700">
              <div 
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Story header */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 pt-6">
            <div className="flex items-center">
              <img
                src={activeStory.user.avatar_url || `https://api.dicebear.com/7.x/avatars/svg?seed=${activeStory.user.username}`}
                alt={activeStory.user.username}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="ml-2 font-medium text-white">
                {activeStory.user.username}
              </span>
              <span className="ml-2 text-xs text-gray-300">
                {new Date(activeStory.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <button 
              className="rounded-full p-1 text-white hover:bg-gray-800"
              onClick={closeStoryView}
            >
              <X size={20} />
            </button>
          </div>

          {/* Story content */}
          <div 
            className="h-full w-full"
            onMouseDown={() => setPaused(true)}
            onMouseUp={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <img
              src={activeStory.media_url}
              alt="Story"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Navigation buttons */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70"
            onClick={(e) => {
              e.stopPropagation();
              previousStory();
            }}
            disabled={activeStoryIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-70"
            onClick={(e) => {
              e.stopPropagation();
              nextStory();
            }}
            disabled={activeStoryIndex === stories.length - 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
