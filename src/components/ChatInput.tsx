import React, { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { sendMessage, isGenerating } = useChat();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSend = () => {
    if (input.trim() && !isGenerating) {
      sendMessage(input);
      setInput('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6 pt-2">
      <div className="relative flex flex-col bg-white border border-[var(--color-ds-border)] rounded-2xl shadow-sm focus-within:ring-1 focus-within:ring-[var(--color-ds-blue)] focus-within:border-[var(--color-ds-blue)] transition-all">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ove-AI'ye bir şeyler sorun..."
          className="w-full resize-none bg-transparent px-4 py-4 max-h-[200px] overflow-y-auto focus:outline-none text-[var(--color-ds-text)] placeholder-[var(--color-ds-text-secondary)]"
          rows={1}
          disabled={isGenerating}
        />

        <div className="flex items-center justify-between px-3 py-2 border-t border-[var(--color-ds-border)]/50">
          <div className="flex items-center">
            <button
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              title="Dosya Ekle"
            >
              <Paperclip size={20} />
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!input.trim() || isGenerating}
            className={cn(
              "flex items-center justify-center p-2 rounded-lg transition-colors",
              input.trim() && !isGenerating
                ? "bg-[var(--color-ds-blue)] text-white hover:bg-[var(--color-ds-blue-hover)]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <div className="text-center mt-2 text-xs text-[var(--color-ds-text-secondary)]">
        Yapay zeka hata yapabilir. Lütfen önemli bilgileri doğrulayın.
      </div>
    </div>
  );
};
