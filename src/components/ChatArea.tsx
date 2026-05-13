import React, { useRef, useEffect } from 'react'
import { Brain } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useChat } from '../hooks/useChat'

export const ChatArea: React.FC = () => {
  const { chats, currentChatId, isSending } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const currentChat = chats.find(c => c.id === currentChatId)
  const messages = currentChat?.messages || []

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, isSending])

  return (
    <div className="flex flex-col h-full w-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Brain size={40} className="text-primary" />
            </div>
            <h1 className="text-3xl font-semibold text-foreground">DeepSeek Klonu'na Hoş Geldiniz</h1>
            <p className="max-w-md text-muted-foreground text-lg">
              Size nasıl yardımcı olabilirim?
            </p>
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isSending && (
              <div className="flex w-full py-6">
                <div className="mx-auto flex w-full max-w-4xl px-4 md:px-6 justify-start">
                   <div className="flex min-w-0 flex-col gap-2 max-w-[85%] items-start">
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                       <Brain size={16} className="text-primary animate-pulse" />
                       DeepSeek Klonu düşünüyor...
                     </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0">
        <ChatInput />
      </div>
    </div>
  )
}
