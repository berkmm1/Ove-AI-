import React from 'react';
import { Plus, MessageSquare, Trash2, Settings, User } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export const Sidebar: React.FC = () => {
  const { chats, currentChatId, createNewChat, selectChat, deleteChat } = useChat();

  return (
    <div className="flex flex-col w-64 h-full bg-[var(--color-ds-sidebar)] border-r border-[var(--color-ds-border)] transition-all duration-300">
      {/* Top Section */}
      <div className="p-4">
        <button
          onClick={createNewChat}
          className="flex items-center w-full gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[var(--color-ds-blue)] hover:bg-[var(--color-ds-blue-hover)] rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span>Yeni Sohbet</span>
        </button>
      </div>

      {/* Chat History List */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "group relative flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-colors text-sm",
                currentChatId === chat.id
                  ? "bg-white text-[var(--color-ds-text)] shadow-sm font-medium"
                  : "text-[var(--color-ds-text-secondary)] hover:bg-black/5"
              )}
              onClick={() => selectChat(chat.id)}
            >
              <MessageSquare size={16} className="shrink-0" />
              <div className="flex-1 truncate">
                {chat.title}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className={cn(
                  "opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 rounded transition-all",
                  currentChatId === chat.id && "opacity-100"
                )}
                title="Sohbeti Sil"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[var(--color-ds-border)]">
        <div className="flex flex-col gap-1">
          <button className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-ds-text-secondary)] hover:bg-black/5 rounded-lg transition-colors">
            <Settings size={18} />
            <span>Ayarlar</span>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 text-sm text-[var(--color-ds-text-secondary)] hover:bg-black/5 rounded-lg transition-colors">
            <User size={18} />
            <span>Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};
