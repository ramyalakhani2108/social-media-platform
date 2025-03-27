import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../../types';
import { Comments } from './Comments';
import { UserAvatar } from '../shared/UserAvatar';
import { MediaPlayer } from '../media/MediaPlayer';
import { PostActions } from '../shared/PostActions';

interface PostModalProps {
  post: Post;
  onClose: () => void;
  isOpen: boolean;
}

export const PostModal = ({ post, onClose, isOpen }: PostModalProps) => {
  const navigate = useNavigate();

  const handleProfileClick = (userId: string) => {
    onClose();
    navigate(`/profile/${userId}`);
  };

  const modalVariants = {
    initial: {
      opacity: 0,
      y: '100%'
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      y: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25
      }
    }
  };

  return (
    <AnimatePresence>

    </AnimatePresence>
  );
};
