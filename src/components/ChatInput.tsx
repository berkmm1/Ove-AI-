import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Globe, BrainCircuit } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [isDeepThink, setIsDeepThink] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 pb-6">
      <div className="relative flex flex-col bg-white border border-gray-300 rounded-2xl shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all duration-200">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message DeepSeek..."
          className="w-full max-h-[200px] py-3 px-4 bg-transparent border-0 resize-none focus:ring-0 text-gray-900 placeholder-gray-500 m-0 overflow-y-auto scrollbar-hide text-base leading-relaxed"
          rows={1}
          disabled={disabled}
        />

        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-1">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Paperclip size={18} />
            </button>
            <button
              onClick={() => setIsDeepThink(!isDeepThink)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                isDeepThink
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-transparent text-gray-500 border-transparent hover:bg-gray-100"
              )}
            >
              <BrainCircuit size={16} />
              <span>DeepThink</span>
            </button>
            <button
              onClick={() => setIsSearch(!isSearch)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                isSearch
                  ? "bg-blue-50 text-blue-600 border-blue-200"
                  : "bg-transparent text-gray-500 border-transparent hover:bg-gray-100"
              )}
            >
              <Globe size={16} />
              <span>Search</span>
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className={cn(
              "p-2 rounded-xl flex items-center justify-center transition-colors",
              input.trim() && !disabled
                ? "bg-primary text-white hover:bg-primary-hover"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            <Send size={18} />
          </button>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-3">
        AI can make mistakes. Consider verifying important information.
      </div>
    </div>
  );
}
