import Link from 'next/link';
import { ReactNode } from 'react';

interface SidebarItemProps {
  name: string;
  href: string;
  icon: ReactNode;
  isActive?: boolean;
}

export const SidebarItem = ({ name, href, icon, isActive = false }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center px-6 py-3 transition-colors rounded-lg ${
        isActive
          ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
      }`}
    >
      <div className="flex items-center space-x-4">
        <div className="text-xl">{icon}</div>
        <span>{name}</span>
      </div>
    </Link>
  );
};
