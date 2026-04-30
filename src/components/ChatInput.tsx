import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, BrainCircuit } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { cn } from '../lib/utils';

export const ChatInput: React.FC = () => {
  const [input, setInput] = useState('');
  const { addMessage, isGenerating, model, setModel, useSearch, setUseSearch } = useChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isGenerating) return;

    addMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="relative rounded-2xl bg-white dark:bg-[#2a2a2a] border border-ds-border dark:border-ds-border-dark shadow-sm focus-within:border-ds-primary dark:focus-within:border-ds-primary-dark transition-colors">

        <form onSubmit={handleSubmit} className="p-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Mesajınızı buraya yazın..."
            className="w-full max-h-[200px] bg-transparent border-none focus:ring-0 resize-none text-ds-text dark:text-ds-text-dark placeholder:text-ds-muted dark:placeholder:text-ds-muted-dark outline-none py-2 px-1 scrollbar-thin"
            rows={1}
            disabled={isGenerating}
          />

          <div className="flex items-center justify-between mt-2 pt-2 border-t border-ds-border dark:border-ds-border-dark">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setModel(model === 'r1' ? 'v3' : 'r1')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                  model === 'r1'
                    ? "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50"
                    : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                )}
              >
                <BrainCircuit size={14} />
                <span>DeepThink (R1)</span>
              </button>

              <button
                type="button"
                onClick={() => setUseSearch(!useSearch)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                  useSearch
                    ? "bg-ds-primary/10 text-ds-primary border-ds-primary/20 dark:bg-ds-primary-dark/20 dark:text-ds-primary-dark dark:border-ds-primary-dark/30"
                    : "bg-gray-50 text-gray-600 border-gray-200 dark:bg-white/5 dark:text-gray-400 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10"
                )}
              >
                <Search size={14} />
                <span>Arama</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isGenerating}
              className="p-2 rounded-lg bg-ds-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </form>
      </div>
      <div className="text-center mt-3 text-xs text-ds-muted dark:text-ds-muted-dark">
        Yapay zeka hata yapabilir. Önemli bilgileri kontrol edin.
      </div>
    </div>
  );
};
