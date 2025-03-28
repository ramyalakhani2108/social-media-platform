import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface MediaPlayerProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  isMuted?: boolean;
  onEnded?: () => void;
}

export const MediaPlayer = ({ 
  mediaUrl, 
  mediaType, 
  isMuted = true, 
  onEnded 
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRef = useRef<HTMLMediaElement>(null);

  const handlePlayPause = () => {
    if (mediaRef.current) {
      if (isPlaying) {
        mediaRef.current.pause();
      } else {
        mediaRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative aspect-square w-full">
      {mediaType === 'image' ? (
        <motion.img
          src={mediaUrl}
          alt="Post media"
          className="w-full h-full object-cover rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      ) : (
        <video
          ref={mediaRef}
          src={mediaUrl}
          muted={isMuted}
          loop
          className="w-full h-full object-cover rounded-lg"
          onEnded={onEnded}
          onClick={handlePlayPause}
        />
      )}
    </div>
  );
};
