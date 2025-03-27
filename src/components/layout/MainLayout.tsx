import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ChatWidget } from '../chat/ChatWidget';

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50/80 via-gray-50/90 to-slate-100/95 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border-r border-slate-200/30 dark:border-gray-700/30 shadow-[0_0_15px_rgba(0,0,0,0.05)] dark:shadow-[0_0_15px_rgba(0,0,0,0.2)]" />

        {/* Main Content */}
        <main className="flex-1 ml-64">
          <div className="container mx-auto px-4 py-8">
            <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.1)] border border-slate-200/30 dark:border-gray-700/30 p-6">
              {children || <Outlet />}
            </div>
          </div>
        </main>
      </div>

      <ChatWidget />

      {/* Global styles */}
      <style>
        {`
          :root {
            --background-start: #f8fafc;
            --background-mid: #f3f4f6;
            --background-end: #f1f5f9;
          }

          body {
            background-image: 
              linear-gradient(to bottom right, 
                rgba(248, 250, 252, 0.8), 
                rgba(243, 244, 246, 0.9), 
                rgba(241, 245, 249, 0.95)
              );
            color: #334155;
          }

          .dark body {
            background-image: 
              linear-gradient(to bottom right, 
                rgba(17, 24, 39, 1), 
                rgba(31, 41, 55, 1), 
                rgba(17, 24, 39, 1)
              );
            color: #e2e8f0;
          }

          /* Refined scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(241, 245, 249, 0.5);
            border-radius: 8px;
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.3);
            border-radius: 8px;
            border: 2px solid rgba(241, 245, 249, 0.5);
            backdrop-filter: blur(4px);
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.5);
          }

          /* Glass card effect */
          .glass-card {
            background: rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 
              0 4px 6px -1px rgba(0, 0, 0, 0.05),
              0 2px 4px -1px rgba(0, 0, 0, 0.03);
          }

          .dark .glass-card {
            background: rgba(17, 24, 39, 0.3);
            border-color: rgba(255, 255, 255, 0.05);
            box-shadow: 
              0 4px 6px -1px rgba(0, 0, 0, 0.2),
              0 2px 4px -1px rgba(0, 0, 0, 0.1);
          }

          /* Smooth transitions */
          * {
            transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
            transition-duration: 150ms;
          }
        `}
      </style>
    </div>
  );
};