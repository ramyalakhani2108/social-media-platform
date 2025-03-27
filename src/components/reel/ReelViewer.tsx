import { useState, useEffect, useRef } from 'react';
import { useReelStore } from '@/store/mockReelStore';
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReelCard } from './ReelCard';

export const ReelViewer = () => {
  const { reels, activeReelId, closeReelViewer } = useReelStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Find the index of the active reel
  useEffect(() => {
    const index = reels.findIndex((reel) => reel.id === activeReelId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [activeReelId, reels]);

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrevious();
    } else if (e.key === 'Escape') {
      closeReelViewer();
    }
  };

  // Add keyboard event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  // Handle swipe gestures
  const handleSwipe = (direction: number) => {
    if (direction > 0) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    // Find all videos and toggle mute
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => {
      video.muted = !isMuted;
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Close button */}
      <button
        onClick={closeReelViewer}
        className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Mute/Unmute button */}
      <button
        onClick={toggleMute}
        className="absolute top-4 left-4 z-10 rounded-full bg-black/50 p-2 text-white"
      >
        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
      </button>

      {/* Navigation buttons */}
      {currentIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-4 z-10 rounded-full bg-black/50 p-2 text-white"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
      )}

      {currentIndex < reels.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 z-10 rounded-full bg-black/50 p-2 text-white"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      )}

      {/* Reels container */}
      <div
        ref={containerRef}
        className="h-full w-full max-w-md overflow-hidden"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, info) => handleSwipe(info.offset.x)}
            className="h-full w-full"
          >
            {reels[currentIndex] && (
              <ReelCard reel={reels[currentIndex]} isActive={true} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress indicators */}
      <div className="absolute top-12 left-0 right-0 flex justify-center space-x-1 px-4">
        {reels.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
