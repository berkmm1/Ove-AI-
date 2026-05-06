import React, { useRef, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { MessageList } from './MessageList'
import { useChat } from '@/hooks/useChat'

interface ChatAreaProps {
  onMenuClick: () => void
}

export const ChatArea: React.FC<ChatAreaProps> = ({ onMenuClick }) => {
  const { currentChat, isTyping } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change or typing status changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [currentChat?.messages, isTyping])

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Header (Mobile only) */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-gray-100 text-gray-600"
        >
          <Menu size={24} />
        </button>
        <span className="font-medium text-gray-800 truncate px-4">
          {currentChat?.title || 'Yeni Sohbet'}
        </span>
        <div className="w-8" /> {/* Spacer for centering */}
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto w-full relative">
        <MessageList
          messages={currentChat?.messages || []}
          isTyping={isTyping}
        />
      </div>
    </div>
  )
}
