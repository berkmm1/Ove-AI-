import { useState, useRef, useEffect } from 'react';
import { Paperclip, Globe, Lightbulb, ArrowUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface ChatInputProps {
  onSendMessage: (content: string, useSearch: boolean, useReasoning: boolean) => void;
  disabled?: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const [useSearch, setUseSearch] = useState(false);
  const [useReasoning, setUseReasoning] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = () => {
    if (!input.trim() || disabled) return;
    onSendMessage(input.trim(), useSearch, useReasoning);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 pb-6">
      <div className="relative bg-background border border-border rounded-2xl shadow-sm focus-within:ring-1 focus-within:ring-border focus-within:border-border transition-all">

        {/* Input Area */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message DeepSeek..."
          disabled={disabled}
          className="w-full max-h-[200px] bg-transparent resize-none border-0 focus:ring-0 px-4 py-4 scrollbar-hide text-foreground placeholder:text-muted-foreground m-0"
          rows={1}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between px-3 pb-3 pt-1">
          <div className="flex items-center gap-2">
            <button
              title="Attach file"
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
            >
              <Paperclip size={18} />
            </button>

            <button
              onClick={() => setUseReasoning(!useReasoning)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                useReasoning
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-transparent text-muted-foreground border-transparent hover:bg-accent"
              )}
            >
              <Lightbulb size={16} className={cn(useReasoning && "fill-primary/20")} />
              DeepThink (R1)
            </button>

            <button
              onClick={() => setUseSearch(!useSearch)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                useSearch
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-transparent text-muted-foreground border-transparent hover:bg-accent"
              )}
            >
              <Globe size={16} />
              Search
            </button>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!input.trim() || disabled}
            className={cn(
              "p-2 rounded-lg flex items-center justify-center transition-all",
              input.trim() && !disabled
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "bg-accent text-muted-foreground cursor-not-allowed"
            )}
          >
            <ArrowUp size={18} className="stroke-[3]" />
          </button>
        </div>
      </div>

      <div className="text-center mt-3 text-xs text-muted-foreground">
        AI can make mistakes. Please verify important information.
      </div>
    </div>
  );
}
