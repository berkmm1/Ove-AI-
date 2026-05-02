import React, { useState } from 'react';
import type { Chat, Message } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { ChatContext } from './ChatContextInstance';

const MOCK_CHAT: Chat = {
  id: '1',
  title: 'Merhaba DeepSeek',
  updatedAt: new Date(),
  messages: [
    {
      id: 'm1',
      role: 'assistant',
      content: 'Merhaba! Size nasıl yardımcı olabilirim?',
      createdAt: new Date(),
    }
  ]
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([MOCK_CHAT]);
  const [activeChatId, setActiveChatId] = useState<string | null>('1');

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'Yeni Sohbet',
      updatedAt: new Date(),
      messages: [],
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChatId(newChat.id);
  };

  const addMessage = (content: string, isDeepThink = false, isWebSearch = false) => {
    if (!activeChatId) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      createdAt: new Date(),
    };

    setChats(prevChats => prevChats.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          updatedAt: new Date(),
          messages: [...chat.messages, userMessage],
        };
      }
      return chat;
    }));

    // Mock AI Response
    setTimeout(() => {
      const aiMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: isDeepThink
          ? '> Derin Düşünce aktif edildi. \n\n' + 'İşte bu konu hakkında detaylı analizim...'
          : 'Anladım. Bu konuda size şu şekilde yardımcı olabilirim...',
        createdAt: new Date(),
        isDeepThink,
        isWebSearch
      };

      setChats(prevChats => prevChats.map(chat => {
        if (chat.id === activeChatId) {
          // Update title if it's the first user message
          let newTitle = chat.title;
          if (chat.messages.length === 0) {
              newTitle = content.substring(0, 30) + (content.length > 30 ? '...' : '');
          }
          return {
            ...chat,
            title: newTitle,
            updatedAt: new Date(),
            messages: [...chat.messages, aiMessage],
          };
        }
        return chat;
      }));
    }, 1000);
  };

  return (
    <ChatContext.Provider value={{ chats, activeChatId, setActiveChatId, createNewChat, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};
