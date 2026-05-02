export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
  isDeepThink?: boolean;
  isWebSearch?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: Date;
}
