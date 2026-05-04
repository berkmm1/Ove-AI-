import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';
import { type Message as MessageType } from '@/store/ChatContext';
import { cn } from '@/lib/utils';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isAssistant = message.role === 'assistant';

  return (
    <div
      className={cn(
        "py-6 px-4 sm:px-6 w-full flex justify-center",
        isAssistant ? "bg-[var(--color-ds-bg)]" : "bg-white"
      )}
    >
      <div className="w-full max-w-3xl flex gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="shrink-0 mt-1">
          {isAssistant ? (
            <div className="w-8 h-8 rounded-full bg-[var(--color-ds-blue)] flex items-center justify-center text-white shadow-sm">
              <Bot size={20} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-600 shadow-sm">
              <User size={20} />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="font-semibold text-sm text-[var(--color-ds-text)]">
            {isAssistant ? 'Ove-AI' : 'Siz'}
          </div>

          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none break-words text-[var(--color-ds-text)]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
