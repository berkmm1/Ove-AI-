import React from 'react';
import { Plus, MessageSquare, PanelLeftClose, PanelLeft } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { chats, activeChatId, setActiveChatId, createNewChat } = useChat();

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-[#1e1e2f] border-r border-[#333] transition-all duration-300 overflow-hidden",
        isOpen ? "w-64" : "w-0 md:w-16"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        {isOpen && <span className="font-semibold text-lg whitespace-nowrap overflow-hidden">Ove-AI</span>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-[#2a2a3e] rounded-md transition-colors text-gray-400 hover:text-white"
        >
          {isOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} className="hidden md:block" />}
        </button>
      </div>

      <div className="px-3 pb-3">
        <button
          onClick={createNewChat}
          className={cn(
            "w-full flex items-center gap-2 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors",
            !isOpen && "justify-center"
          )}
        >
          <Plus size={20} />
          {isOpen && <span>Yeni Sohbet</span>}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3">
        {isOpen && <div className="text-xs font-semibold text-gray-500 mb-2 px-2 mt-4 uppercase tracking-wider">Geçmiş</div>}
        <div className="flex flex-col gap-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className={cn(
                "flex items-center gap-3 w-full p-2.5 rounded-md text-sm text-left transition-colors whitespace-nowrap overflow-hidden group",
                activeChatId === chat.id
                  ? "bg-[#2a2a3e] text-white"
                  : "text-gray-400 hover:bg-[#2a2a3e] hover:text-white",
                !isOpen && "justify-center px-0"
              )}
            >
              <MessageSquare size={16} className="shrink-0" />
              {isOpen && <span className="truncate">{chat.title}</span>}
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
         <div className="p-4 border-t border-[#333]">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center font-bold text-sm">
               U
             </div>
             <span className="text-sm font-medium">Kullanıcı</span>
           </div>
         </div>
      )}
    </div>
  );
};
