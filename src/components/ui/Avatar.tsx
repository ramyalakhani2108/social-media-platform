import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  src: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar = ({ src, size = 'md', className }: AvatarProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  return (
    <img
      src={src}
      alt="User avatar"
      className={twMerge(
        'rounded-full object-cover',
        sizeClasses[size],
        className
      )}
    />
  );
};
