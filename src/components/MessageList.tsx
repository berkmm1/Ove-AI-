import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Bot, User } from 'lucide-react'
import type { Message } from '@/types'
import { cn } from '@/lib/utils'

interface MessageListProps {
  messages: Message[]
  isTyping: boolean
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  return (
    <div className="flex-1 overflow-y-auto w-full px-4 py-6 space-y-6 max-w-4xl mx-auto">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-4">
          <Bot size={48} className="text-gray-400" />
          <div>
            <h2 className="text-xl font-semibold mb-2">Nasıl yardımcı olabilirim?</h2>
            <p className="max-w-md">Mesaj yazarak hemen sohbete başlayabilirsiniz.</p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-4 w-full",
              message.role === 'user' ? "flex-row-reverse" : "flex-row"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
              message.role === 'user' ? "bg-blue-600" : "bg-emerald-600"
            )}>
              {message.role === 'user' ? (
                <User size={18} className="text-white" />
              ) : (
                <Bot size={18} className="text-white" />
              )}
            </div>

            <div className={cn(
              "max-w-[85%] sm:max-w-[75%] rounded-2xl px-5 py-3.5",
              message.role === 'user'
                ? "bg-blue-600 text-white rounded-tr-sm"
                : "bg-gray-100 text-gray-800 rounded-tl-sm"
            )}>
              {message.role === 'user' ? (
                <p className="whitespace-pre-wrap">{message.content}</p>
              ) : (
                <div className="prose prose-sm md:prose-base max-w-none dark:prose-invert">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))
      )}

      {isTyping && (
        <div className="flex gap-4 w-full flex-row">
          <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
            <Bot size={18} className="text-white" />
          </div>
          <div className="bg-gray-100 text-gray-800 rounded-2xl rounded-tl-sm px-5 py-4 flex gap-1 items-center">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}
    </div>
  )
}
