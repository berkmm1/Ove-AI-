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
        <div className="relative flex w-full items-end gap-2 rounded-2xl border border-border bg-muted/20 p-2 shadow-sm focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all">
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Paperclip size={20} />
          </button>

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="DeepSeek Klonu'na mesaj gönder..."
            className="max-h-[200px] min-h-[40px] w-full resize-none bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            rows={1}
            disabled={isSending}
          />
        </div>

        {/* DeepSeek Toggle Controls & Send Button */}
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDeepThink}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all border",
                settings.useDeepThink
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Brain size={14} className={cn(settings.useDeepThink && "text-primary")} />
              DeepThink (R1)
            </button>
            <button
              onClick={toggleWebSearch}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all border",
                settings.useWebSearch
                  ? "border-blue-500 bg-blue-500/10 text-blue-400"
                  : "border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              )}
            >
              <Globe size={14} className={cn(settings.useWebSearch && "text-blue-400")} />
              Arama
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim() || isSending}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all",
              input.trim() && !isSending
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <Send size={16} className={cn(input.trim() && !isSending && "translate-x-0.5")} />
          </button>
        </div>

        <div className="mt-3 text-center text-xs text-muted-foreground">
          DeepSeek Klonu hata yapabilir. Önemli bilgileri kontrol edin.
        </div>
      </div>
    </div>
  )
}
