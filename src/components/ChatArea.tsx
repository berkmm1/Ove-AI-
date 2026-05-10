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
      <div className="flex-1 overflow-y-auto pt-4 md:pt-8">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center pb-32">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600/10 shadow-sm border border-blue-600/20">
              <Brain size={40} className="text-primary" />
            </div>
            <h1 className="mb-2 text-3xl font-semibold text-foreground">DeepSeek Klonu</h1>
            <p className="max-w-md text-muted-foreground mt-2">
              Merhaba, ben DeepSeek Klonu. Size nasıl yardımcı olabilirim?
            </p>
          </div>
        ) : (
          <div className="pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isSending && (
              <div className="flex w-full py-4">
                <div className="mx-auto flex w-full max-w-4xl justify-start gap-4 px-4 md:px-6">
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
      <div className="shrink-0 relative z-10 bg-gradient-to-t from-background via-background to-transparent pt-6">
        <ChatInput />
      </div>
    </div>
  )
}
