import { Plus, MessageSquare, Settings, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  return (
    <div
      className={cn(
        "fixed md:relative flex-shrink-0 z-20 flex flex-col h-full bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-0 md:w-0 overflow-hidden"
      )}
    >
      <div className="p-3">
        <button className="flex items-center gap-2 w-full px-3 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium">
          <Plus size={20} />
          <span>New chat</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="text-xs font-semibold text-gray-500 mb-2 px-3">Recent</div>
        <div className="space-y-1">
          {[1, 2, 3].map((i) => (
            <button
              key={i}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors truncate"
            >
              <MessageSquare size={16} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">Discussing React architecture patterns...</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 border-t border-gray-200 mt-auto">
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
          <User size={18} className="text-gray-500" />
          <span>Profile</span>
        </button>
        <button className="flex items-center gap-3 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors mt-1">
          <Settings size={18} className="text-gray-500" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
