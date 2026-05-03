import React from 'react';
import { useChat } from '@/hooks/useChat';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { chats, activeChatId, setActiveChatId, createNewChat, deleteChat } = useChat();

  return (
    <div className="w-64 h-full bg-[#181825] border-r border-[#313244] flex flex-col">
      <div className="p-4">
        <button
          onClick={createNewChat}
          className="w-full flex items-center justify-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] text-white py-2 px-4 rounded-md transition-colors"
        >
          <Plus size={18} />
          <span>Yeni Sohbet</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        {chats.map(chat => (
          <div
            key={chat.id}
            className={cn(
              "group flex items-center justify-between px-3 py-3 rounded-md cursor-pointer transition-colors",
              activeChatId === chat.id
                ? "bg-[#313244] text-[#cdd6f4]"
                : "text-[#a6adc8] hover:bg-[#27273a] hover:text-[#cdd6f4]"
            )}
            onClick={() => setActiveChatId(chat.id)}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <MessageSquare size={18} className="shrink-0" />
              <span className="truncate text-sm">{chat.title}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteChat(chat.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-[#f38ba8] hover:text-[#f38ba8] transition-opacity"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
