import { useContext } from 'react';
import { ChatContext } from '@/store/ChatContext';

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
