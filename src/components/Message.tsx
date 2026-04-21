import { Bot, User } from 'lucide-react';
import { cn } from '../lib/utils';

export interface MessageType {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        "py-6 px-4 md:px-8 w-full flex justify-center",
        isAssistant ? "bg-gray-50" : "bg-white"
      )}
    >
      <div className="max-w-3xl w-full flex gap-4 md:gap-6">
        <div className="flex-shrink-0 mt-1">
          {isAssistant ? (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
              <Bot size={18} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white">
              <User size={18} />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 mb-1">
            {isAssistant ? 'DeepSeek' : 'You'}
          </div>
          <div className="prose prose-slate max-w-none text-gray-700 whitespace-pre-wrap leading-relaxed">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
}
