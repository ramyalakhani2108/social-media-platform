import { ReactNode } from 'react';

interface AdminCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const AdminCard = ({ title, children, className = '' }: AdminCardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm dark:shadow-gray-700 overflow-hidden ${className}`}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};
