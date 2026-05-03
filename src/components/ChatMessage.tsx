import React from 'react';
import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Sparkles } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "py-6 px-4 md:px-8 flex gap-4 md:gap-6 w-full",
      isUser ? "bg-transparent" : "bg-[#27273a]"
    )}>
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-8 h-8 rounded-full bg-[#4f46e5] flex items-center justify-center text-white">
            <User size={18} />
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] flex items-center justify-center text-white">
            <Sparkles size={18} />
          </div>
        )}
      </div>

      <div className="flex-1 space-y-2 overflow-hidden">
        <div className="font-semibold text-sm">
          {isUser ? 'Sen' : 'DeepSeek AI'}
        </div>
        <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-[#11111b] prose-pre:border prose-pre:border-[#313244] max-w-none text-[#cdd6f4]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};
