import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChat } from '@/hooks/useChat';
import { MessageInput } from './MessageInput';
import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatArea: React.FC = () => {
  const { chats, activeChatId } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  if (!activeChatId) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center h-full bg-[#1e1e2f]">
        <Bot size={64} className="text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-300">Nasıl yardımcı olabilirim?</h2>
        <p className="text-gray-500 mt-2">Sol taraftan yeni bir sohbet başlatın.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e2f] relative">
      <div className="flex-1 overflow-y-auto w-full px-4 pt-8 pb-32">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          {activeChat?.messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20">
              <Bot size={64} className="text-gray-600 mb-6" />
              <h2 className="text-3xl font-semibold mb-2">Nasıl yardımcı olabilirim?</h2>
            </div>
          ) : (
            <AnimatePresence>
              {activeChat?.messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-4 p-4 rounded-xl",
                    msg.role === 'user' ? "bg-[#2a2a3e]/50" : "bg-transparent"
                  )}
                >
                  <div className="shrink-0 mt-1">
                    {msg.role === 'user' ? (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User size={18} />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-white text-black rounded-full flex items-center justify-center">
                        <Bot size={18} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2 overflow-hidden">
                    <div className="font-semibold text-sm text-gray-300">
                      {msg.role === 'user' ? 'Siz' : 'Ove-AI'}
                    </div>
                    <div className="prose prose-invert max-w-none text-gray-100 prose-pre:bg-[#11111b] prose-pre:border prose-pre:border-[#333] prose-p:leading-relaxed">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1e1e2f] via-[#1e1e2f]/90 to-transparent pt-10">
        <MessageInput />
      </div>
    </div>
  );
};
