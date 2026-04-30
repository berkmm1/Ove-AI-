import React, { useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { BrainCircuit, Sparkles } from 'lucide-react';

export const ChatArea: React.FC = () => {
  const { messages, model, setModel } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col h-screen bg-ds-bg dark:bg-ds-bg-dark relative">
      {/* Header */}
      <header className="h-14 flex-shrink-0 border-b border-ds-border dark:border-ds-border-dark flex items-center justify-center bg-ds-bg/80 dark:bg-ds-bg-dark/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center p-1 bg-black/5 dark:bg-white/5 rounded-lg border border-ds-border dark:border-ds-border-dark">
          <button
            onClick={() => setModel('v3')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              model === 'v3'
                ? 'bg-white dark:bg-[#333] text-ds-text dark:text-ds-text-dark shadow-sm'
                : 'text-ds-muted dark:text-ds-muted-dark hover:text-ds-text dark:hover:text-ds-text-dark'
            }`}
          >
            <Sparkles size={16} />
            DeepSeek-V3
          </button>
          <button
            onClick={() => setModel('r1')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
              model === 'r1'
                ? 'bg-white dark:bg-[#333] text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-ds-muted dark:text-ds-muted-dark hover:text-ds-text dark:hover:text-ds-text-dark'
            }`}
          >
            <BrainCircuit size={16} />
            DeepSeek-R1
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-semibold mb-8 text-ds-text dark:text-ds-text-dark">Nasıl yardımcı olabilirim?</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
              {[
                { title: 'Kodlama yardımı', desc: 'React komponenti oluştur' },
                { title: 'Yaratıcı yazarlık', desc: 'Bir bilim kurgu hikayesi yaz' },
                { title: 'Veri Analizi', desc: 'Excel verimi nasıl analiz ederim?' },
                { title: 'Dil Öğrenimi', desc: 'İspanyolca pratik yapalım' }
              ].map((item, i) => (
                <button key={i} className="p-4 rounded-xl border border-ds-border dark:border-ds-border-dark text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <div className="font-medium text-ds-text dark:text-ds-text-dark">{item.title}</div>
                  <div className="text-sm text-ds-muted dark:text-ds-muted-dark mt-1">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="pb-8">
            {messages.map(msg => (
              <MessageItem key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 bg-gradient-to-t from-ds-bg dark:from-ds-bg-dark pt-2 pb-4">
        <ChatInput />
      </div>
    </div>
  );
};
