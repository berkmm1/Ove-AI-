import React, { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';

export type Role = 'user' | 'assistant';

export interface Message {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

interface ChatContextType {
  chats: Chat[];
  currentChatId: string | null;
  currentChat: Chat | undefined;
  createNewChat: () => void;
  selectChat: (id: string) => void;
  deleteChat: (id: string) => void;
  sendMessage: (content: string) => void;
  isGenerating: boolean;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

const generateId = () => Math.random().toString(36).substring(2, 9);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(() => [
    {
      id: 'default',
      title: 'Yeni Sohbet',
      messages: [],
      updatedAt: Date.now(),
    }
  ]);
  const [currentChatId, setCurrentChatId] = useState<string | null>('default');
  const [isGenerating, setIsGenerating] = useState(false);

  const currentChat = chats.find((c) => c.id === currentChatId);

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: generateId(),
      title: 'Yeni Sohbet',
      messages: [],
      updatedAt: Date.now(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  }, []);

  const selectChat = useCallback((id: string) => {
    setCurrentChatId(id);
  }, []);

  const deleteChat = useCallback((id: string) => {
    setChats((prev) => prev.filter(c => c.id !== id));
    if (currentChatId === id) {
      setCurrentChatId(null);
    }
  }, [currentChatId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isGenerating) return;

    let chatId = currentChatId;

    // Create a chat if one doesn't exist
    if (!chatId) {
      const newChatId = generateId();
      const newChat: Chat = {
        id: newChatId,
        title: content.slice(0, 30) + (content.length > 30 ? '...' : ''),
        messages: [],
        updatedAt: Date.now(),
      };
      setChats(prev => [newChat, ...prev]);
      setCurrentChatId(newChatId);
      chatId = newChatId;
    }

    const userMessage: Message = {
      id: generateId(),
      role: 'user',
      content,
      createdAt: Date.now(),
    };

    setChats((prev) =>
      prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            title: chat.messages.length === 0 ? (content.slice(0, 30) + (content.length > 30 ? '...' : '')) : chat.title,
            messages: [...chat.messages, userMessage],
            updatedAt: Date.now()
          };
        }
        return chat;
      })
    );

    setIsGenerating(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: generateId(),
        role: 'assistant',
        content: `Bu bir simülasyon yanıtıdır. Söylediğiniz: "${content}". DeepSeek benzeri bir arayüz geliştiriyorsunuz, harika! \n\nİşte örnek bir kod bloğu:\n\n\`\`\`javascript\nconsole.log("Merhaba Dünya!");\n\`\`\``,
        createdAt: Date.now(),
      };

      setChats((prev) =>
        prev.map(chat => {
          if (chat.id === chatId) {
            return {
              ...chat,
              messages: [...chat.messages, aiResponse],
              updatedAt: Date.now()
            };
          }
          return chat;
        })
      );
      setIsGenerating(false);
    }, 1500);

  }, [currentChatId, isGenerating]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChatId,
        currentChat,
        createNewChat,
        selectChat,
        deleteChat,
        sendMessage,
        isGenerating
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
