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
      {/* Header */}
      <header className="flex h-14 shrink-0 items-center border-b border-border bg-background/95 backdrop-blur px-4 md:px-6 z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg">Ove-AI</span>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center mt-[-10%]">
            <div className="mb-4 flex h-16 w-16 items-center justify-center">
              <Brain size={48} className="text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-foreground tracking-tight">Ove-AI</h1>
            <p className="text-lg text-muted-foreground">
              Nasıl yardımcı olabilirim?
            </p>
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isSending && (
              <div className="flex w-full py-6">
                <div className="mx-auto flex w-full max-w-4xl gap-4 px-4 md:px-6">
                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shrink-0">
                    <Brain size={18} className="animate-pulse" />
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    Ove-AI düşünüyor...
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-gradient-to-t from-background to-transparent pt-6">
        <ChatInput />
      </div>
    </div>
  )
}
