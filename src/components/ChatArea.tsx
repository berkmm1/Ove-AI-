import React, { useRef, useEffect } from 'react'
import { Brain, Globe } from 'lucide-react'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useChat } from '../hooks/useChat'
import { cn } from '../lib/utils'

export const ChatArea: React.FC = () => {
  const { chats, currentChatId, settings, toggleDeepThink, toggleWebSearch, isSending } = useChat()
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
      <header className="flex h-14 shrink-0 items-center justify-center border-b border-border bg-background/95 backdrop-blur px-4 md:px-6">
        <div className="flex items-center gap-2 rounded-lg bg-muted/30 p-1">
          <button
            onClick={toggleDeepThink}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
              settings.useDeepThink
                ? "bg-primary/20 text-primary shadow-sm"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Brain size={16} className={cn(settings.useDeepThink && "text-primary")} />
            DeepThink (R1)
          </button>
          <div className="h-4 w-px bg-border" />
          <button
            onClick={toggleWebSearch}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all",
              settings.useWebSearch
                ? "bg-blue-500/20 text-blue-400 shadow-sm"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            <Globe size={16} className={cn(settings.useWebSearch && "text-blue-400")} />
            Arama
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Brain size={32} className="text-primary" />
            </div>
            <h1 className="mb-2 text-2xl font-semibold text-foreground">Ove-AI'a Hoş Geldiniz</h1>
            <p className="max-w-md text-muted-foreground">
              Size nasıl yardımcı olabilirim? DeepThink R1 ile derinlemesine düşünebilir veya internette arama yapabilirim.
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
      <div className="shrink-0">
        <ChatInput />
      </div>
    </div>
  )
}
