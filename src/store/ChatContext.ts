import { createContext } from 'react';
import type { Message, ChatSession } from '../types';

export interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, role?: 'user' | 'assistant') => void;
  isGenerating: boolean;
  model: 'v3' | 'r1';
  setModel: (model: 'v3' | 'r1') => void;
  useSearch: boolean;
  setUseSearch: (use: boolean) => void;
  sessions: ChatSession[];
  currentSessionId: string | null;
  createNewSession: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);
