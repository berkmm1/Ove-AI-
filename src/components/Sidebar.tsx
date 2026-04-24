import React from 'react';
import { Plus, MessageSquare, Settings, X, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, isMobile }) => {
  const sidebarVariants = {
    open: { width: isMobile ? '100%' : '260px', opacity: 1 },
    closed: { width: '0px', opacity: 0 },
  };

  const content = (
    <div className="flex flex-col h-full bg-[#f9f9f9] dark:bg-[#202123] text-gray-900 dark:text-gray-100 border-r border-gray-200 dark:border-gray-800">
      <div className="p-3 flex items-center justify-between">
        <button className="flex-1 flex items-center gap-2 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors bg-white dark:bg-[#2A2B32] border border-gray-200 dark:border-gray-700 shadow-sm text-sm">
          <Plus size={16} />
          <span>New Chat</span>
        </button>
        {isMobile && (
          <button onClick={onToggle} className="p-3 ml-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 px-3 uppercase tracking-wider">
          Recent
        </div>
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-[#2A2B32] transition-colors text-sm text-left truncate"
            >
              <MessageSquare size={16} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />
              <span className="truncate">How to build a react app...</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
        <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-[#2A2B32] transition-colors text-sm">
          <Settings size={16} className="text-gray-500 dark:text-gray-400" />
          <span>Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-[#2A2B32] transition-colors text-sm">
          <LogOut size={16} className="text-gray-500 dark:text-gray-400" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar Container */}
      <motion.div
        className={cn(
          "flex-shrink-0 overflow-hidden h-full z-50",
          isMobile ? "fixed left-0 top-0 bottom-0" : "relative"
        )}
        initial="open"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={cn("h-full w-[260px]", isMobile ? "w-full max-w-[300px]" : "")}>
           {content}
        </div>
      </motion.div>

      {/* Floating toggle button when sidebar is closed (Desktop) */}
      {!isMobile && !isOpen && (
        <button
          onClick={onToggle}
          className="absolute top-4 left-4 z-40 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          title="Open sidebar"
        >
          <PanelLeftOpen size={24} />
        </button>
      )}

      {/* Floating toggle button when sidebar is open (Desktop - positioned on the content side) */}
      {!isMobile && isOpen && (
         <button
          onClick={onToggle}
          className="absolute top-4 left-[260px] z-40 p-2 ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
          title="Close sidebar"
        >
          <PanelLeftClose size={24} />
        </button>
      )}
    </>
  );
};