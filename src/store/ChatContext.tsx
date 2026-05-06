import React, { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Chat } from '@/types'

interface ChatContextType {
  chats: Chat[]
  currentChatId: string | null
  currentChat: Chat | undefined
  createNewChat: () => void
  selectChat: (id: string) => void
  addMessage: (content: string, role: 'user' | 'assistant') => void
  deleteChat: (id: string) => void
  isTyping: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

// Mock data (in Turkish)
const MOCK_INITIAL_CHATS: Chat[] = [
  {
    id: 'mock-1',
    title: 'Derin Öğrenme Nedir?',
    createdAt: Date.now() - 100000,
    updatedAt: Date.now() - 100000,
    messages: [
      { id: 'm1', role: 'user', content: 'Derin öğrenme nedir kısaca açıklar mısın?', timestamp: Date.now() - 100000 },
      { id: 'm2', role: 'assistant', content: 'Derin öğrenme, yapay zekanın bir alt dalı olan makine öğreniminin bir yöntemidir. İnsan beyninin işleyişinden ilham alan yapay sinir ağlarını kullanarak, büyük miktarda veriden öğrenme ve karar verme yeteneğine sahiptir.', timestamp: Date.now() - 90000 }
    ]
  }
]

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(MOCK_INITIAL_CHATS)
  const [currentChatId, setCurrentChatId] = useState<string | null>('mock-1')
  const isTyping = false

  const currentChat = chats.find(c => c.id === currentChatId)

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'Yeni Sohbet',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    }
    setChats(prev => [newChat, ...prev])
    setCurrentChatId(newChat.id)
  }

  const selectChat = (id: string) => {
    setCurrentChatId(id)
  }

  const deleteChat = (id: string) => {
    setChats(prev => prev.filter(c => c.id !== id))
    if (currentChatId === id) {
      setCurrentChatId(null)
    }
  }

  const addMessage = (content: string, role: 'user' | 'assistant') => {
    if (!currentChatId) {
      const newChatId = uuidv4()
      const newChat: Chat = {
        id: newChatId,
        title: content.slice(0, 30) + '...',
        messages: [{ id: uuidv4(), role, content, timestamp: Date.now() }],
        createdAt: Date.now(),
        updatedAt: Date.now()
      }
      setChats(prev => [newChat, ...prev])
      setCurrentChatId(newChatId)
      return
    }

    setChats(prev => prev.map(chat => {
      if (chat.id === currentChatId) {
        return {
          ...chat,
          updatedAt: Date.now(),
          // Sadece ilk mesaj eklendiğinde başlığı güncelle (eğer varsayılan başlıksa)
          title: chat.messages.length === 0 && role === 'user' ? content.slice(0, 30) + '...' : chat.title,
          messages: [...chat.messages, { id: uuidv4(), role, content, timestamp: Date.now() }]
        }
      }
      return chat
    }))
  }

  return (
    <ChatContext.Provider value={{
      chats,
      currentChatId,
      currentChat,
      createNewChat,
      selectChat,
      addMessage,
      deleteChat,
      isTyping
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider')
  }
  return context
}
