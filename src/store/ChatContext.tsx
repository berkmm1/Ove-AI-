import React, { createContext, useState, type ReactNode } from 'react';
import type { Chat, Message } from '@/types/chat';

interface ChatContextType {
  chats: Chat[];
  activeChatId: string | null;
  activeChat: Chat | null;
  setActiveChatId: (id: string) => void;
  createNewChat: () => void;
  sendMessage: (content: string) => void;
  deleteChat: (id: string) => void;
  isGenerating: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(() => {
    const defaultChat: Chat = {
      id: crypto.randomUUID(),
      title: 'Yeni Sohbet',
      messages: [],
      updatedAt: new Date(),
    };
    return [defaultChat];
  });
  const [activeChatId, setActiveChatId] = useState<string | null>(() => chats[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  const createNewChat = () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'Yeni Sohbet',
      messages: [],
      updatedAt: new Date(),
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const deleteChat = (id: string) => {
    setChats(prev => prev.filter(chat => chat.id !== id));
    if (activeChatId === id) {
      setActiveChatId(null);
    }
  };

  const sendMessage = async (content: string) => {
    if (!activeChatId) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setChats(prevChats =>
      prevChats.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            title: chat.messages.length === 0 ? content.slice(0, 30) + '...' : chat.title,
            messages: [...chat.messages, userMessage],
            updatedAt: new Date(),
          };
        }
        return chat;
      })
    );

    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: generateMockResponse(content),
        timestamp: new Date(),
      };

      setChats(prevChats =>
        prevChats.map(chat => {
          if (chat.id === activeChatId) {
            return {
              ...chat,
              messages: [...chat.messages, assistantMessage],
              updatedAt: new Date(),
            };
          }
          return chat;
        })
      );
      setIsGenerating(false);
    }, 1000);
  };

  const activeChat = chats.find(c => c.id === activeChatId) || null;

  return (
    <ChatContext.Provider value={{
      chats,
      activeChatId,
      activeChat,
      setActiveChatId,
      createNewChat,
      sendMessage,
      deleteChat,
      isGenerating
    }}>
      {children}
    </ChatContext.Provider>
  );
};

function generateMockResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('merhaba') || lowerInput.includes('selam')) {
    return 'Merhaba! Sana nasıl yardımcı olabilirim?';
  } else if (lowerInput.includes('nasılsın')) {
    return 'Ben bir yapay zekayım, duygularım yok ama harika çalışıyorum! Sen nasılsın?';
  } else if (lowerInput.includes('react')) {
    return 'React, kullanıcı arayüzleri oluşturmak için kullanılan popüler bir JavaScript kütüphanesidir. Bileşen tabanlı bir mimariye sahiptir.';
  } else {
    return `Bu, "${input}" isteğine verdiğim örnek bir yapay zeka yanıtıdır. DeepSeek benzeri bir arayüz geliştiriyorsun, harika iş!`;
  }
}
