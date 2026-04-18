import { useState, useRef, useEffect } from 'react';
import { Paperclip, BrainCircuit, Globe, ArrowUp } from 'lucide-react';
import { cn } from '../utils/cn';

interface ChatInputProps {
  onSendMessage: (message: string, useDeepThink: boolean, useSearch: boolean) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [useDeepThink, setUseDeepThink] = useState(false);
  const [useSearch, setUseSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSendMessage(input.trim(), useDeepThink, useSearch);
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
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm focus-within:ring-1 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all p-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message DeepSeek..."
          disabled={disabled}
          className="w-full max-h-[200px] resize-none border-none focus:ring-0 text-base placeholder-gray-400 bg-transparent py-2 scrollbar-hide outline-none"
          rows={1}
        />

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Attach files"
            >
              <Paperclip size={18} />
            </button>

            <div className="h-4 w-px bg-gray-200 mx-1"></div>

            <button
              type="button"
              onClick={() => setUseDeepThink(!useDeepThink)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                useDeepThink
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-500 hover:bg-gray-100 border border-transparent"
              )}
            >
              <BrainCircuit size={16} />
              <span>DeepThink (R1)</span>
            </button>

            <button
              type="button"
              onClick={() => setUseSearch(!useSearch)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                useSearch
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-gray-500 hover:bg-gray-100 border border-transparent"
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
              "p-2 rounded-full flex items-center justify-center transition-all",
              input.trim() && !disabled
                ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                : "bg-gray-100 text-gray-400"
            )}
          >
            <ArrowUp size={20} className="stroke-[2.5]" />
          </button>
        </div>
      </div>
      <div className="text-center mt-3 text-xs text-gray-400">
        AI-generated content may be incorrect.
      </div>
    </div>
  );
}
