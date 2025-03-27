import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface AdminSidebarProps {
  children: React.ReactNode;
  items: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
}

export const AdminSidebar = ({ children, items }: AdminSidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 md:hidden z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-800 shadow-lg md:shadow-none transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
        </div>

        <nav className="mt-6">
          <ul>
            {items.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className="flex items-center px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-xl">{item.icon}</div>
                    <span>{item.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {children}
    </>
  );
};
