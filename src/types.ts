export type Role = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  thoughtProcess?: string; // For DeepThink (R1) mock
}

export interface ChatSession {
  id: string;
  title: string;
  updatedAt: number;
}
