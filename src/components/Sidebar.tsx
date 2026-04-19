import { Plus, MessageSquare, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onNewChat: () => void;
}

export function Sidebar({ isOpen, setIsOpen, onNewChat }: SidebarProps) {
  const mockChats = [
    { id: 1, title: 'React Performance Tips' },
    { id: 2, title: 'Explain Quantum Computing' },
    { id: 3, title: 'Tailwind CSS Help' },
    { id: 4, title: 'Write a python script' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={cn(
          "fixed md:static inset-y-0 left-0 z-50 flex flex-col w-[260px] bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          !isOpen && "md:w-0 md:border-none md:overflow-hidden" // collapse on desktop if toggled
        )}
      >
        <div className="p-3">
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 w-full px-3 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <Plus size={20} />
            <span className="font-medium text-sm">New chat</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <div className="text-xs font-medium text-gray-500 mb-3 px-2">Recent</div>
          <div className="space-y-1">
            {mockChats.map(chat => (
              <button
                key={chat.id}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors text-left truncate"
              >
                <MessageSquare size={16} className="text-gray-400 shrink-0" />
                <span className="truncate">{chat.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
            <Settings size={18} className="text-gray-500" />
            <span>Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}
