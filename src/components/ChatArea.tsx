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
    <div className="flex flex-col h-full w-full bg-background relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pt-6">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Brain size={32} className="text-primary" />
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-foreground">DeepSeek Klonu'na Hoş Geldiniz</h1>
            <p className="max-w-md text-muted-foreground">
              Size nasıl yardımcı olabilirim?
            </p>
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isSending && (
              <div className="flex w-full py-6 bg-muted/10">
                <div className="mx-auto flex w-full max-w-4xl gap-4 px-4 md:px-6">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shrink-0">
                    <Brain size={18} className="animate-pulse" />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    DeepSeek Klonu düşünüyor...
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
