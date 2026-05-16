import React from 'react'
import { Plus, MessageSquare, Trash2, PanelLeftClose, PanelLeft } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import { cn } from '../lib/utils'

interface SidebarProps {
  isOpen: boolean
  toggleSidebar: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { chats, currentChatId, selectChat, deleteChat, createNewChat } = useChat()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-muted/30 border-r border-border transition-transform duration-300 md:static md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full hidden md:flex md:w-0 md:border-0 md:overflow-hidden"
        )}
      >
        <div className={cn("flex flex-col h-full", !isOpen && "md:hidden")}>
          <div className="p-4">
            <button
              onClick={createNewChat}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-transparent px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
            >
              <Plus size={18} />
              Yeni Sohbet
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 pt-0">
            <div className="flex flex-col gap-1">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className={cn(
                    "group flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    currentChatId === chat.id
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                  onClick={() => selectChat(chat.id)}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <MessageSquare size={16} className="shrink-0" />
                    <span className="truncate">{chat.title}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteChat(chat.id)
                    }}
                    className="invisible shrink-0 text-muted-foreground hover:text-destructive group-hover:visible"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>DeepSeek Klonu</span>
            <button onClick={toggleSidebar} className="md:hidden p-1 hover:text-foreground">
              <PanelLeftClose size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button for Desktop when closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="hidden md:flex absolute top-4 left-4 z-40 p-2 text-muted-foreground hover:text-foreground bg-background rounded-md border border-border"
        >
          <PanelLeft size={20} />
        </button>
      )}
    </>
  )
}
