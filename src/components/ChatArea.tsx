import React, { useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { PanelLeftOpen, Bot } from 'lucide-react';

export const ChatArea: React.FC = () => {
  const { currentChat, isSidebarOpen, toggleSidebar } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat?.messages]);

  return (
    <div className="flex flex-col flex-1 h-screen relative bg-background overflow-hidden">
      {/* Header for mobile or when sidebar is closed */}
      <header className="sticky top-0 z-10 flex items-center h-14 px-4 bg-background/80 backdrop-blur-sm border-b md:border-b-0">
        {!isSidebarOpen && (
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-muted text-foreground"
            title="Sidebar'ı Aç"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}
        <div className="flex-1 text-center font-semibold text-sm truncate px-4">
          {currentChat?.title || "Yeni Sohbet"}
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {currentChat?.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-4 text-center pb-20">
             <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                 <Bot className="w-8 h-8" />
             </div>
             <h2 className="text-2xl font-semibold mb-2">Nasıl yardımcı olabilirim?</h2>
             <p className="text-muted-foreground max-w-md">
                Bir soru sorarak, kod yazdırmak isteyerek veya sadece sohbet ederek başlayabilirsiniz.
             </p>
          </div>
        ) : (
          <div className="pb-[20px]">
            {currentChat?.messages.map((message) => (
              <MessageItem key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} className="h-4" />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="shrink-0">
        <ChatInput />
      </div>
    </div>
  );
};
