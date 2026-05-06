import React, { useState, useRef, useEffect } from 'react'
import { Send, Image, Paperclip, Globe } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { cn } from '@/lib/utils'

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const { sendMessage, isTyping } = useChat()

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim() || isTyping) return

    sendMessage(input.trim())
    setInput('')

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2 bg-white sticky bottom-0">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col bg-[#f4f6f8] rounded-2xl border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all shadow-sm overflow-hidden"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Yapay zekaya bir şey sorun..."
          className="w-full max-h-[200px] min-h-[56px] resize-none bg-transparent px-4 py-4 text-gray-800 focus:outline-none scrollbar-thin"
          rows={1}
          disabled={isTyping}
        />

        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1 text-gray-400">
            <button type="button" className="p-2 hover:bg-gray-200 hover:text-gray-600 rounded-lg transition-colors" title="Dosya ekle">
              <Paperclip size={18} />
            </button>
            <button type="button" className="p-2 hover:bg-gray-200 hover:text-gray-600 rounded-lg transition-colors hidden sm:block" title="Görsel ekle">
              <Image size={18} />
            </button>
            <button type="button" className="p-2 hover:bg-gray-200 hover:text-gray-600 rounded-lg transition-colors hidden sm:flex items-center gap-1.5" title="İnternette ara">
              <Globe size={18} />
              <span className="text-xs font-medium">Ara</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className={cn(
              "flex items-center justify-center p-2 rounded-xl transition-all duration-200",
              input.trim() && !isTyping
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            <Send size={18} className={input.trim() && !isTyping ? "translate-x-0.5 -translate-y-0.5" : ""} />
          </button>
        </div>
      </form>
      <div className="text-center mt-3">
        <p className="text-xs text-gray-400">
          Yapay zeka hata yapabilir. Önemli bilgileri kontrol edin.
        </p>
      </div>
    </div>
  )
}
