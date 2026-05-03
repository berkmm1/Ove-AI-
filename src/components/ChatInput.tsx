import React, { useState, useRef, useEffect } from 'react';
import { SendHorizontal } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage, isGenerating } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    sendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-gradient-to-t from-[#1e1e2f] via-[#1e1e2f] to-transparent">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end w-full border border-[#313244] bg-[#27273a] rounded-xl overflow-hidden focus-within:border-[#89b4fa] focus-within:ring-1 focus-within:ring-[#89b4fa] transition-all"
      >
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="DeepSeek AI'ye bir mesaj gönder..."
          className="w-full max-h-[200px] min-h-[56px] py-4 pl-4 pr-12 bg-transparent text-[#cdd6f4] placeholder-[#7f849c] resize-none outline-none"
          rows={1}
          disabled={isGenerating}
        />

        <button
          type="submit"
          disabled={!input.trim() || isGenerating}
          className={cn(
            "absolute right-2 bottom-2 p-2 rounded-lg transition-colors flex items-center justify-center",
            input.trim() && !isGenerating
              ? "bg-[#4f46e5] text-white hover:bg-[#4338ca]"
              : "text-[#6c7086] cursor-not-allowed bg-[#313244]"
          )}
        >
          <SendHorizontal size={20} />
        </button>
      </form>
      <div className="text-center text-xs text-[#6c7086] mt-3">
        Yapay zeka hatalar yapabilir. Önemli bilgileri kontrol edin.
      </div>
    </div>
  );
};
