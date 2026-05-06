import { useState, useCallback } from 'react'
import { useChatContext } from '@/store/ChatContext'

export const useChat = () => {
  const context = useChatContext()
  const [isTyping, setIsTyping] = useState(false)

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    // Kullanıcı mesajını ekle
    context.addMessage(content, 'user')
    setIsTyping(true)

    // Yapay zeka yanıtını simüle et
    setTimeout(() => {
      const mockResponses = [
        "Bu ilginç bir soru. Size bu konuda nasıl daha fazla yardımcı olabilirim?",
        "Anladım. DeepSeek benzeri bir arayüz tasarlamak gerçekten heyecan verici bir proje. Başka detaylar eklemek ister misiniz?",
        "Kesinlikle! Bu konuda size yardımcı olmaktan memnuniyet duyarım.",
        "Mükemmel bir yaklaşım. Kullanıcı deneyimini artırmak için tasarım detaylarına dikkat etmek önemli.",
        "Bu konuda biraz daha fazla bilgi verebilir misiniz?"
      ]

      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]
      context.addMessage(randomResponse, 'assistant')
      setIsTyping(false)
    }, 1500) // 1.5 saniye gecikme
  }, [context])

  return {
    ...context,
    isTyping,
    sendMessage
  }
}
