import React, { useRef, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ChatProvider } from '@/store/ChatContext';
import { useChat } from '@/hooks/useChat';
import { Sparkles } from 'lucide-react';

const ChatArea: React.FC = () => {
  const { activeChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat?.messages]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1e1e2f] relative">
      <Header />

      <div className="flex-1 overflow-y-auto">
        {!activeChat || activeChat.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] flex items-center justify-center text-white shadow-xl mb-6">
              <Sparkles size={32} />
            </div>
            <h1 className="text-3xl font-semibold text-[#cdd6f4] mb-3">Sana nasıl yardımcı olabilirim?</h1>
            <p className="text-[#a6adc8] max-w-md">
              Kodlama, analiz, yaratıcı yazarlık veya merak ettiğiniz herhangi bir konu hakkında sorular sorabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full pb-32">
            {activeChat.messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <ChatInput />
      </div>
    </div>
  );
};

function App() {
  return (
    <ChatProvider>
      <div className="flex h-screen w-full bg-[#1e1e2f] text-[#cdd6f4] overflow-hidden font-sans">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <ChatArea />
      </div>
    </ChatProvider>
  );
}

export default App;
