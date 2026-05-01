import React, { createContext, useState, type ReactNode } from 'react';
import type { Chat, Message } from '@/types/chat';

interface ChatContextType {
  chats: Chat[];
  currentChat: Chat | null;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  createNewChat: () => void;
  selectChat: (chatId: string) => void;
  sendMessage: (content: string) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Merhaba Dünya',
      updatedAt: new Date(),
      messages: [
        {
          id: 'm1',
          role: 'assistant',
          content: 'Merhaba! Ben DeepSeek benzeri bir yapay zeka asistanıyım. Size nasıl yardımcı olabilirim?',
          timestamp: new Date()
        }
      ]
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>('1');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const currentChat = chats.find(c => c.id === currentChatId) || null;

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'Yeni Sohbet',
      updatedAt: new Date(),
      messages: []
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // Mobil görünümde sohbet seçildiğinde sidebar'ı kapat
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };

    let activeChatId = currentChatId;

    // Eğer hiç sohbet yoksa veya mesajı yeni bir sohbete gönderiyorsak
    if (!activeChatId) {
      const newChat: Chat = {
        id: Date.now().toString(),
        title: content.substring(0, 30) + (content.length > 30 ? '...' : ''), // İlk mesajın başı başlık olsun
        updatedAt: new Date(),
        messages: []
      };
      activeChatId = newChat.id;
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(activeChatId);
    }

    // Kullanıcı mesajını ekle
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        // Eğer ilk mesajsa başlığı güncelle
        const title = chat.messages.length === 0 ? (content.substring(0, 30) + (content.length > 30 ? '...' : '')) : chat.title;
        return {
          ...chat,
          title,
          updatedAt: new Date(),
          messages: [...chat.messages, userMessage]
        };
      }
      return chat;
    }));

    // Sahte yapay zeka yanıtını simüle et
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Bu, "${content}" mesajınıza otomatik oluşturulan bir yanıttır. Gerçek bir API'ye bağlanana kadar bu şekilde yanıt vereceğim.`,
        timestamp: new Date()
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            updatedAt: new Date(),
            messages: [...chat.messages, aiResponse]
          };
        }
        return chat;
      }));
    }, 1000);
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        isSidebarOpen,
        toggleSidebar,
        createNewChat,
        selectChat,
        sendMessage
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
