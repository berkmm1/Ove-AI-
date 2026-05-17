import React, { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Brain, Globe } from 'lucide-react'
import { useChat } from '../hooks/useChat'
import { cn } from '../lib/utils'

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { sendMessage, isSending, settings, toggleDeepThink, toggleWebSearch } = useChat()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleSend = () => {
    if (input.trim() && !isSending) {
      sendMessage(input)
      setInput('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full bg-background pt-2 pb-6 px-4 md:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-2 rounded-2xl border border-border bg-muted/20 p-3 shadow-sm focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="DeepSeek Klonu'na mesaj gönder..."
            className="max-h-[200px] min-h-[40px] w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            rows={1}
            disabled={isSending}
          />

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
              >
                <Paperclip size={18} />
              </button>

              <button
                type="button"
                onClick={toggleDeepThink}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                  settings.useDeepThink
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                )}
              >
                <Brain size={14} />
                DeepThink (R1)
              </button>

              <button
                type="button"
                onClick={toggleWebSearch}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                  settings.useWebSearch
                    ? "border-blue-500 text-blue-500 bg-blue-500/10"
                    : "border-border text-muted-foreground hover:bg-muted/50"
                )}
              >
                <Globe size={14} />
                Arama
              </button>
            </div>

            <button
              onClick={handleSend}
              disabled={!input.trim() || isSending}
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all",
                input.trim() && !isSending
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              )}
            >
              <Send size={16} className={cn(input.trim() && !isSending && "translate-x-px")} />
            </button>
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-muted-foreground">
          Yapay zeka hata yapabilir. Önemli bilgileri kontrol edin.
        </div>
      </div>
    </div>
  )
}
