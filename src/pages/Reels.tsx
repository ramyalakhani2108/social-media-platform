import { useState, useRef, useEffect } from 'react';
import { useReelStore } from '@/store/mockReelStore';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ReelCard } from '@/components/reel/ReelCard';

export const Reels = () => {
  const { reels } = useReelStore();
  const [isCreatingReel, setIsCreatingReel] = useState(false);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  const reelRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  // Initialize refs array
  useEffect(() => {
    reelRefs.current = reelRefs.current.slice(0, reels.length);
  }, [reels.length]);

  const handleCreateReel = () => {
    // In a real app, this would open a camera or file picker
    setIsCreatingReel(true);
    alert('Create Reel functionality would be implemented here');
    setIsCreatingReel(false);
  };
  
  // Handle scroll to detect which reel is currently in view
  useEffect(() => {
    const handleScroll = () => {
      if (!reelsContainerRef.current) return;
      
      const containerTop = reelsContainerRef.current.getBoundingClientRect().top;
      const containerHeight = reelsContainerRef.current.clientHeight;
      const viewportCenter = containerTop + containerHeight / 2;
      
      let closestReelIndex = 0;
      let closestDistance = Infinity;
      
      reelRefs.current.forEach((reelRef, index) => {
        if (!reelRef) return;
        
        const reelTop = reelRef.getBoundingClientRect().top;
        const reelCenter = reelTop + reelRef.clientHeight / 2;
        const distance = Math.abs(reelCenter - viewportCenter);
        
        if (distance < closestDistance) {
          closestDistance = distance;
          closestReelIndex = index;
        }
      });
      
      if (closestReelIndex !== currentReelIndex) {
        setCurrentReelIndex(closestReelIndex);
      }
    };
    
    const container = reelsContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [currentReelIndex]);
  
  // Auto-scroll to the next reel when current one finishes
  const handleReelEnd = () => {
    if (currentReelIndex < reels.length - 1) {
      const nextReelRef = reelRefs.current[currentReelIndex + 1];
      if (nextReelRef && reelsContainerRef.current) {
        nextReelRef.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Reels
        </h1>
        <Button onClick={handleCreateReel} disabled={isCreatingReel} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Create
        </Button>
      </div>

      {/* Vertical scrolling reels container */}
      <div 
        ref={reelsContainerRef}
        className="flex-1 overflow-y-auto snap-y snap-mandatory"
      >
        {reels.map((reel, index) => (
          <div 
            key={reel.id}
            ref={el => reelRefs.current[index] = el}
            className="h-full w-full snap-start snap-always"
          >
            <ReelCard 
              reel={reel} 
              isActive={index === currentReelIndex} 
              onEnded={handleReelEnd}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
