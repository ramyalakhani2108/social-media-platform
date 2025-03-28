import { ReactNode } from 'react';

interface AdminContentProps {
  children: ReactNode;
}

export const AdminContent = ({ children }: AdminContentProps) => {
  return (
    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6 py-8">
        {children}
      </div>
    </main>
  );
};
