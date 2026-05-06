import React, { createContext, useState, type ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import type { Chat, Message, Settings } from '../types/chat'

interface ChatContextType {
  chats: Chat[]
  currentChatId: string | null
  settings: Settings
  isSending: boolean
  createNewChat: () => void
  selectChat: (id: string) => void
  deleteChat: (id: string) => void
  sendMessage: (content: string) => void
  toggleDeepThink: () => void
  toggleWebSearch: () => void
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined)

const MOCK_CHATS: Chat[] = [
  {
    id: uuidv4(),
    title: 'Kuantum Fiziği Nedir?',
    updatedAt: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
    messages: [
      {
        id: uuidv4(),
        role: 'user',
        content: 'Bana kuantum fiziğini 5 yaşındaki bir çocuğa anlatır gibi anlat.',
        timestamp: Date.now() - 1000 * 60 * 60 * 24,
      },
      {
        id: uuidv4(),
        role: 'assistant',
        content: 'Tabii! Hayal et ki sihirli bir oyuncak kutun var. O kutunun içindeki oyuncaklar sen onlara bakana kadar aynı anda her yerde olabilirler! Sen kutuyu açıp baktığında ise anında bir yere geçiverirler. İşte evrendeki en küçük şeyler de tıpkı bu sihirli oyuncaklar gibidir. Onlara bakmadığımızda tuhaf davranırlar, ama baktığımızda yerlerinde dururlar. Kuantum fiziği de bu sihirli, en küçük şeylerin kurallarını inceler.',
        reasoning: 'Kullanıcının isteğini analiz ediyorum: Kuantum fiziği, 5 yaş çocuğa göre analoji, anlaşılır dil.\n\nBir analoji bulmalıyım... Schrödinger\'in kedisi çok karmaşık. Belki "aynı anda birçok yerde olma" (süperpozisyon) kavramını basit bir oyun veya oyuncakla anlatabilirim.\n\nSihirli bir oyuncak kutusu metaforu işe yarayabilir.\n\nİçerik planı:\n1. Sihirli oyuncak kutusu analojisi (süperpozisyon ve gözlemci etkisi)\n2. Basit bir sonuç cümlesi.',
        timestamp: Date.now() - 1000 * 60 * 60 * 24 + 5000,
      }
    ]
  }
]

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>(MOCK_CHATS)
  const [currentChatId, setCurrentChatId] = useState<string | null>(chats[0].id)
  const [isSending, setIsSending] = useState(false)
  const [settings, setSettings] = useState<Settings>({
    useDeepThink: true,
    useWebSearch: false
  })

  const createNewChat = () => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'Yeni Sohbet',
      messages: [],
      updatedAt: Date.now()
    }
    setChats([newChat, ...chats])
    setCurrentChatId(newChat.id)
  }

  const selectChat = (id: string) => {
    setCurrentChatId(id)
  }

  const deleteChat = (id: string) => {
    const newChats = chats.filter(c => c.id !== id)
    setChats(newChats)
    if (currentChatId === id) {
      setCurrentChatId(newChats.length > 0 ? newChats[0].id : null)
    }
  }

  const toggleDeepThink = () => setSettings(s => ({ ...s, useDeepThink: !s.useDeepThink }))
  const toggleWebSearch = () => setSettings(s => ({ ...s, useWebSearch: !s.useWebSearch }))

  const sendMessage = async (content: string) => {
    if (!currentChatId || !content.trim()) return

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: Date.now()
    }

    setChats(prev => prev.map(chat => {
      if (chat.id === currentChatId) {
        // Update title if it's the first message
        const title = chat.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : chat.title
        return {
          ...chat,
          title,
          messages: [...chat.messages, userMessage],
          updatedAt: Date.now()
        }
      }
      return chat
    }))

    setIsSending(true)

    // Simulate API delay and streaming effect
    setTimeout(() => {
      const assistantMessageId = uuidv4()
      const reasoningText = settings.useDeepThink
        ? 'Kullanıcının sorusunu analiz ediyorum...\n\nSoru: ' + content + '\n\nBuna uygun mantıklı bir yanıt oluşturacağım.\n\nİlgili anahtar kelimeler ve kavramlar gözden geçiriliyor...\n\nYanıt hazır.'
        : undefined

      const mockResponse = `Bu, sorduğunuz soruya ("${content}") verilen örnek bir yanıttır. Gerçek bir API'ye bağlı olsaydım, daha detaylı bir cevap verebilirdim.`

      setChats(prev => prev.map(chat => {
        if (chat.id === currentChatId) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: assistantMessageId,
                role: 'assistant',
                content: mockResponse,
                reasoning: reasoningText,
                timestamp: Date.now()
              }
            ],
            updatedAt: Date.now()
          }
        }
        return chat
      }))
      setIsSending(false)
    }, 2000)
  }

  return (
    <ChatContext.Provider value={{
      chats,
      currentChatId,
      settings,
      isSending,
      createNewChat,
      selectChat,
      deleteChat,
      sendMessage,
      toggleDeepThink,
      toggleWebSearch
    }}>
      {children}
    </ChatContext.Provider>
  )
}
