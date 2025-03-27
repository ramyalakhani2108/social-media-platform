import { ReactNode } from 'react';
import { FiMenu } from 'react-icons/fi';

interface AdminHeaderProps {
  title: string;
  onToggleSidebar: () => void;
  children?: ReactNode;
}

export const AdminHeader = ({ title, onToggleSidebar, children }: AdminHeaderProps) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FiMenu size={20} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white ml-4">{title}</h2>
      </div>
      <div className="flex items-center space-x-4">
        {children}
      </div>
    </header>
  );
};
