import React from 'react'
import { Plus, MessageSquare, Trash2 } from 'lucide-react'
import { useChatContext } from '@/store/ChatContext'
import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { chats, currentChatId, selectChat, createNewChat, deleteChat } = useChatContext()

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#f9f9f9] border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4">
          <button
            onClick={() => {
              createNewChat()
              if (window.innerWidth < 768) onClose()
            }}
            className="w-full flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium text-sm"
          >
            <Plus size={18} />
            Yeni Sohbet
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "group flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-colors text-sm",
                currentChatId === chat.id
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => {
                selectChat(chat.id)
                if (window.innerWidth < 768) onClose()
              }}
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <MessageSquare size={16} className={cn("shrink-0", currentChatId === chat.id ? "text-blue-600" : "text-gray-400")} />
                <span className="truncate">{chat.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteChat(chat.id)
                }}
                className={cn(
                  "p-1 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity",
                  currentChatId === chat.id ? "opacity-100" : ""
                )}
                title="Sil"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              U
            </div>
            <span className="text-sm font-medium text-gray-700">Kullanıcı</span>
          </div>
        </div>
      </div>
    </>
  )
}
