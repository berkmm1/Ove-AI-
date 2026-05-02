import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, Globe } from 'lucide-react';
import { useChat } from '@/hooks/useChat';
import { cn } from '@/lib/utils';

export const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isDeepThink, setIsDeepThink] = useState(false);
  const [isWebSearch, setIsWebSearch] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { addMessage, activeChatId } = useChat();

  const handleSend = () => {
    if (message.trim() && activeChatId) {
      addMessage(message.trim(), isDeepThink, isWebSearch);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="relative bg-[#2a2a3e] rounded-2xl border border-[#444] shadow-lg flex flex-col transition-all focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Mesaj gönder..."
          className="w-full bg-transparent text-white p-4 pb-12 outline-none resize-none max-h-[200px] min-h-[56px] rounded-t-2xl placeholder:text-gray-500"
          rows={1}
        />

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setIsDeepThink(!isDeepThink)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                isDeepThink
                  ? "bg-blue-600/20 text-blue-400 border-blue-500/50"
                  : "bg-[#1e1e2f] text-gray-400 border-[#444] hover:bg-[#333] hover:text-gray-300"
              )}
            >
              <Brain size={14} />
              Derin Düşünce (R1)
            </button>
            <button
              onClick={() => setIsWebSearch(!isWebSearch)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors border",
                isWebSearch
                  ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/50"
                  : "bg-[#1e1e2f] text-gray-400 border-[#444] hover:bg-[#333] hover:text-gray-300"
              )}
            >
              <Globe size={14} />
              Web'de Ara
            </button>
          </div>

          <button
            onClick={handleSend}
            disabled={!message.trim() || !activeChatId}
            className={cn(
              "p-2 rounded-full flex items-center justify-center transition-colors",
              message.trim() && activeChatId
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-[#444] text-gray-600 cursor-not-allowed"
            )}
          >
            <Send size={18} className="mr-0.5" />
          </button>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-3">
        Yapay zeka hatalar yapabilir. Lütfen önemli bilgileri doğrulayın.
      </div>
    </div>
  );
};
