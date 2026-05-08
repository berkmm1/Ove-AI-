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
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <h1 className="mb-8 text-4xl font-semibold text-foreground">Merhaba, ben DeepSeek Klonu</h1>
            <p className="max-w-md text-muted-foreground mb-8">
              Size nasıl yardımcı olabilirim?
            </p>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
              {['Kuantum fiziği nedir?', 'Bana bir şiir yaz', 'React öğrenmeye nasıl başlarım?', 'Türkiye\'nin başkenti neresidir?'].map((suggestion, index) => (
                <button
                  key={index}
                  className="px-4 py-2 rounded-full border border-border bg-muted/20 text-sm text-foreground hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    const input = document.querySelector('textarea')
                    if (input) {
                      input.value = suggestion
                      const event = new Event('input', { bubbles: true })
                      input.dispatchEvent(event)
                      input.focus()
                    }
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
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
