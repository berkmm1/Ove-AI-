import { Plus, MessageSquare, MoreHorizontal, Settings, User } from 'lucide-react';
import { cn } from '../utils/cn';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const recentChats = [
    { id: '1', title: 'DeepSeek UI clone layout' },
    { id: '2', title: 'React Performance Tips' },
    { id: '3', title: 'Tailwind CSS Grid Guide' },
  ];

  return (
    <div
      className={cn(
        'fixed md:relative flex flex-col h-full bg-[#f9f9f9] border-r border-gray-200 transition-all duration-300 z-20',
        isOpen ? 'w-[260px] translate-x-0' : 'w-0 -translate-x-full md:w-0 md:-translate-x-full overflow-hidden'
      )}
    >
      <div className="p-3">
        <button className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          <Plus size={16} />
          New chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-hide">
        <div className="text-xs font-semibold text-gray-500 mb-3 px-2">Recent</div>
        <div className="space-y-1">
          {recentChats.map((chat) => (
            <button
              key={chat.id}
              className="flex items-center gap-2 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-left group"
            >
              <MessageSquare size={16} className="text-gray-400 group-hover:text-gray-600" />
              <span className="truncate flex-1">{chat.title}</span>
              <MoreHorizontal size={14} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600" />
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200">
        <button className="flex items-center gap-3 w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-left">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
            <User size={16} />
          </div>
          <span className="flex-1 font-medium">User Profile</span>
          <Settings size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}
