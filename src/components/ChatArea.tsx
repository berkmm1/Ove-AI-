import React, { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Message } from './Message';
import { ChatInput } from './ChatInput';

export const ChatArea: React.FC = () => {
  const { currentChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {currentChat?.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <h1 className="text-4xl font-semibold mb-4 text-[var(--color-ds-text)] tracking-tight">Ove-AI'ye Hoş Geldiniz</h1>
            <p className="text-[var(--color-ds-text-secondary)] max-w-md">
              Size nasıl yardımcı olabilirim? Herhangi bir konu hakkında soru sorabilir veya sohbet başlatabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="flex flex-col pb-4">
            {currentChat?.messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white/80 backdrop-blur-sm pt-2">
        <ChatInput />
      </div>
    </div>
  );
};
