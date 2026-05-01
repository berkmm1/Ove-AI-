import React from 'react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';
import { Plus, MessageSquare, PanelLeftClose } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { chats, currentChat, isSidebarOpen, createNewChat, selectChat, toggleSidebar } = useChat();

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col bg-sidebar-background transition-transform duration-300 ease-in-out md:relative md:translate-x-0 border-r border-sidebar-border",
        !isSidebarOpen && "-translate-x-full md:hidden" // Hide on mobile when closed, completely remove from flow on desktop when closed (handled by parent layout usually)
      )}
    >
      <div className="flex items-center justify-between p-3">
        <button
          onClick={createNewChat}
          className="flex-1 flex items-center gap-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground px-3 py-2 text-sm transition-colors text-sidebar-foreground font-medium"
        >
          <Plus className="w-4 h-4" />
          Yeni Sohbet
        </button>
        <button
          onClick={toggleSidebar}
          className="ml-2 flex h-9 w-9 items-center justify-center rounded-md hover:bg-sidebar-accent text-sidebar-foreground md:hidden"
        >
          <PanelLeftClose className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="space-y-1">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              className={cn(
                "w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors text-left truncate text-sidebar-foreground",
                currentChat?.id === chat.id ? "bg-sidebar-accent font-medium" : "hover:bg-sidebar-accent/50"
              )}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              <span className="truncate">{chat.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
