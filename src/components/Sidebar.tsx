import React from 'react';
import { Plus, MessageSquare, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: isOpen ? 260 : 60 }}
      className="h-full bg-white dark:bg-[#111218] border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 relative group z-10"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-white dark:bg-[#111218] border border-gray-200 dark:border-gray-800 rounded-full p-1 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 z-20 hidden group-hover:block"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="p-3">
        <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 px-3 transition-colors">
          <Plus size={20} />
          {isOpen && <span className="font-medium">New chat</span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {isOpen && (
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2 mt-4">
            Today
          </div>
        )}
        <button className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1b26] transition-colors text-left text-sm group/item">
          <MessageSquare size={18} className="text-gray-500 min-w-[18px]" />
          {isOpen && (
             <span className="truncate text-gray-700 dark:text-gray-300">Understanding React Hooks</span>
          )}
        </button>
        <button className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1b26] transition-colors text-left text-sm group/item">
          <MessageSquare size={18} className="text-gray-500 min-w-[18px]" />
          {isOpen && (
            <span className="truncate text-gray-700 dark:text-gray-300">How to cook pasta</span>
          )}
        </button>
      </div>

      <div className="p-3 border-t border-gray-200 dark:border-gray-800">
        <button className="w-full flex items-center gap-3 px-2 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1a1b26] transition-colors text-left text-sm">
          <Settings size={20} className="text-gray-500 min-w-[20px]" />
          {isOpen && <span className="font-medium text-gray-700 dark:text-gray-300">Settings</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
