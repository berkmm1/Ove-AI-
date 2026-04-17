import React from 'react';
import { Plus, MessageSquare, Settings, User } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 h-full bg-gray-900 text-gray-300 flex flex-col p-2 border-r border-gray-700">
      <button className="flex items-center gap-2 w-full p-3 rounded-md hover:bg-gray-800 transition-colors bg-blue-600 text-white font-medium mb-4">
        <Plus size={18} />
        <span>New Chat</span>
      </button>

      <div className="flex-1 overflow-y-auto">
        <div className="text-xs font-semibold text-gray-500 mb-2 px-2 uppercase">Recent</div>
        <div className="space-y-1">
          <button className="w-full text-left p-2 rounded-md hover:bg-gray-800 flex items-center gap-2 truncate text-sm">
            <MessageSquare size={16} />
            <span>React App Setup...</span>
          </button>
          <button className="w-full text-left p-2 rounded-md hover:bg-gray-800 flex items-center gap-2 truncate text-sm">
            <MessageSquare size={16} />
            <span>Understanding Hooks</span>
          </button>
          <button className="w-full text-left p-2 rounded-md hover:bg-gray-800 flex items-center gap-2 truncate text-sm">
            <MessageSquare size={16} />
            <span>Tailwind CSS Guide</span>
          </button>
        </div>
      </div>

      <div className="mt-auto border-t border-gray-700 pt-2 space-y-1">
        <button className="w-full text-left p-2 rounded-md hover:bg-gray-800 flex items-center gap-2 text-sm">
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="w-full text-left p-2 rounded-md hover:bg-gray-800 flex items-center gap-2 text-sm">
          <User size={18} />
          <span>Profile</span>
        </button>
      </div>
    </div>
  );
}
