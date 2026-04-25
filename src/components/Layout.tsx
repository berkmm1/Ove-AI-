import React, { type ReactNode } from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen bg-[#eceff1] dark:bg-[#1a1b26] text-gray-900 dark:text-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {children}
      </main>
    </div>
  );
};

export default Layout;
