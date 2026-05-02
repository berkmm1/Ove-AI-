import { createContext } from 'react';
import type { Chat } from '@/types';

export interface ChatContextType {
  chats: Chat[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  createNewChat: () => void;
  addMessage: (content: string, isDeepThink?: boolean, isWebSearch?: boolean) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);
