export type Role = 'user' | 'assistant'

export interface Message {
  id: string
  role: Role
  content: string
  reasoning?: string // Represents DeepSeek's thinking process
  timestamp: number
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
}

export interface Settings {
  useDeepThink: boolean
  useWebSearch: boolean
}
