import React, { type ReactNode } from 'react';
import { Menu } from 'lucide-react';

interface MainContentProps {
  children: ReactNode;
  onOpenSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
}

export const MainContent: React.FC<MainContentProps> = ({
  children,
  onOpenSidebar,
  isSidebarOpen,
  isMobile
}) => {
  return (
    <div className="flex-1 flex flex-col h-full bg-white dark:bg-[#343541] relative">
      {/* Mobile Header for Sidebar Toggle */}
      {isMobile && !isSidebarOpen && (
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center z-10 bg-gradient-to-b from-white dark:from-[#343541] to-transparent">
          <button
            onClick={onOpenSidebar}
            className="p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          >
            <Menu size={24} />
          </button>
          <span className="ml-2 font-medium text-gray-800 dark:text-gray-200">DeepSeek Chat</span>
        </div>
      )}

      <div className="flex-1 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
};