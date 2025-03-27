import { useState } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { AdminSidebar } from './ui/AdminSidebar';
import { AdminContent } from './ui/AdminContent';
import { AdminHeader } from './ui/AdminHeader';
import { SidebarItem } from './ui/SidebarItem';

const sidebarItems = [
  { name: 'Dashboard', href: '/admin', icon: <FiMenu /> },
  { name: 'Users', href: '/admin/users', icon: <FiMenu /> },
  { name: 'Posts', href: '/admin/posts', icon: <FiMenu /> },
  { name: 'Comments', href: '/admin/comments', icon: <FiMenu /> },
  { name: 'Reports', href: '/admin/reports', icon: <FiMenu /> },
  { name: 'Settings', href: '/admin/settings', icon: <FiMenu /> },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 md:hidden z-50 p-2 rounded-md bg-white dark:bg-gray-800 shadow-lg"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <AdminSidebar items={sidebarItems} isSidebarOpen={isSidebarOpen}>
        <AdminHeader 
          title={title} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <FiMenu size={20} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <FiMenu size={20} />
          </button>
        </AdminHeader>

        <AdminContent>
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </AdminContent>
      </AdminSidebar>
    </div>
  );
};

export default AdminLayout;
