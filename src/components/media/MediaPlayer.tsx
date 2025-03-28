import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface MediaPlayerProps {
  mediaUrl: string;
  mediaType: 'image' | 'video';
  isMuted?: boolean;
  onEnded?: () => void;
  className?: string;
}

export const MediaPlayer = ({ 
  mediaUrl, 
  mediaType, 
  isMuted = true, 
  onEnded,
  className = ''
}: MediaPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const mediaRef = useRef<HTMLVideoElement>(null);

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
    <div className={`relative aspect-square w-full ${className}`}>
      {mediaType === 'image' ? (
        <motion.img
          src={mediaUrl}
          alt="Post media"
          className={`w-full h-full object-cover rounded-lg ${className}`}
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
          className={`w-full h-full object-cover rounded-lg ${className}`}
          onEnded={onEnded}
          onClick={handlePlayPause}
        />
      )}
    </div>
  );
};
