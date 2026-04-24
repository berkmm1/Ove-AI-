import React, { useRef, useEffect } from 'react';
import { Send, Square } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSubmit,
  isLoading
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white dark:from-[#343541] via-white dark:via-[#343541] to-transparent pt-6 pb-6 px-4">
      <div className="max-w-3xl mx-auto relative">
        <div className="relative flex items-end bg-white dark:bg-[#40414F] border border-gray-200 dark:border-gray-700 rounded-xl shadow-md overflow-hidden">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Send a message..."
            className="w-full max-h-[200px] py-4 pl-4 pr-12 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 resize-none focus:outline-none focus:ring-0 leading-relaxed"
            rows={1}
          />
          <button
            onClick={onSubmit}
            disabled={!value.trim() || isLoading}
            className={cn(
              "absolute right-2 bottom-2 p-2 rounded-lg flex items-center justify-center transition-colors",
              value.trim() && !isLoading
                ? "bg-primary text-white hover:bg-blue-600"
                : "bg-gray-100 dark:bg-gray-600 text-gray-400 dark:text-gray-400 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Square size={18} className="fill-current" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
        <div className="text-center text-xs text-gray-400 dark:text-gray-500 mt-2">
          AI can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
};