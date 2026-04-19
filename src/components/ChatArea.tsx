import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Mic, Globe, PanelLeft } from 'lucide-react';
import { cn } from '../lib/utils';
import type { Message } from '../App';

interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  toggleSidebar: () => void;
}

export function ChatArea({ messages, onSendMessage, isLoading, toggleSidebar }: ChatAreaProps) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f9f9f9] relative">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-[#f9f9f9]/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="p-2 -ml-2 rounded-md hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <PanelLeft size={20} />
          </button>
          <span className="font-semibold text-lg text-gray-800">DeepSeek</span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 md:px-0">
        <div className="max-w-3xl mx-auto py-6 pb-32 space-y-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center mt-20">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <span className="text-white text-3xl font-bold">D</span>
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">How can I help you today?</h1>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-3",
                    msg.role === 'user'
                      ? "bg-gray-100 text-gray-800 rounded-tr-sm"
                      : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm"
                  )}
                >
                  <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-white max-w-[85%] md:max-w-[75%] rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-gray-100 flex items-center gap-2">
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#f9f9f9] via-[#f9f9f9] to-transparent pt-10 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="relative bg-white rounded-2xl shadow-sm border border-gray-200 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all flex flex-col"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message DeepSeek..."
              className="w-full max-h-[200px] min-h-[60px] resize-none bg-transparent px-4 py-3 outline-none text-gray-800 placeholder:text-gray-400"
              rows={1}
              style={{ overflowY: 'hidden' }}
            />

            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex items-center gap-1">
                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip size={18} />
                </button>
                <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                  <Globe size={18} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {input.trim().length === 0 && (
                   <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                     <Mic size={20} />
                   </button>
                )}
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "p-2 rounded-full transition-colors flex items-center justify-center",
                    input.trim() && !isLoading
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-400"
                  )}
                >
                  <Send size={18} className={input.trim() && !isLoading ? "translate-x-[-1px] translate-y-[1px]" : ""} />
                </button>
              </div>
            </div>
          </form>
          <div className="text-center mt-2 text-xs text-gray-400">
            AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  );
}
