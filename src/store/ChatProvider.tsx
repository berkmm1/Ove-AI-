import React, { useState, useEffect } from 'react';
import type { Message, ChatSession } from '../types';
import { ChatContext } from './ChatContext';

// Initial sessions outside to avoid purity issues
const INITIAL_SESSIONS: ChatSession[] = [
  { id: '1', title: 'React Projesi Hakkında', updatedAt: 1714498513590 },
  { id: '2', title: 'Next.js ve Tailwind', updatedAt: 1714498013590 }
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [model, setModel] = useState<'v3' | 'r1'>('v3');
  const [useSearch, setUseSearch] = useState(false);

  const [sessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>('1');

  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');
  const toggleSidebar = () => setIsSidebarOpen(s => !s);

  const createNewSession = () => {
    setMessages([]);
    setCurrentSessionId(null);
  };

  const addMessage = (content: string, role: 'user' | 'assistant' = 'user') => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);

    if (role === 'user') {
      setIsGenerating(true);
      // Mock response
      setTimeout(() => {
        const botMessage: Message = {
          id: Math.random().toString(36).substring(7),
          role: 'assistant',
          content: 'Ben bir DeepSeek klonu AI asistanıyım. Size nasıl yardımcı olabilirim?\n\n```javascript\nconsole.log("Merhaba Dünya!");\n```',
          timestamp: Date.now(),
          thoughtProcess: model === 'r1' ? 'Kullanıcı bir mesaj gönderdi. Önce ne istediğini analiz etmeliyim. Ardından kibar ve yardımcı bir yanıt oluşturmalıyım.' : undefined
        };
        setMessages(prev => [...prev, botMessage]);
        setIsGenerating(false);
      }, 1500);
    }
  };

  return (
    <ChatContext.Provider value={{
      messages, addMessage, isGenerating,
      model, setModel, useSearch, setUseSearch,
      sessions, currentSessionId, createNewSession,
      theme, toggleTheme,
      isSidebarOpen, toggleSidebar
    }}>
      {children}
    </ChatContext.Provider>
  );
};
