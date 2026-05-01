import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { SendHorizonal } from 'lucide-react';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { sendMessage } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
      if (textareaRef.current) {
         textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full pt-2 pb-4 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-end w-full p-2 overflow-hidden bg-background border rounded-2xl focus-within:ring-1 focus-within:ring-ring shadow-sm"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mesajınızı yazın..."
            className="w-full resize-none bg-transparent px-2 py-2 focus:outline-none max-h-[200px] min-h-[44px] overflow-y-auto"
            rows={1}
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <SendHorizonal className="w-4 h-4" />
          </button>
        </form>
        <div className="text-xs text-center text-muted-foreground mt-2">
          Yapay zeka hatalar yapabilir. Lütfen önemli bilgileri doğrulayın.
        </div>
      </div>
    </div>
  );
};
