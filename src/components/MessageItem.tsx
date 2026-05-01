import React from 'react';
import type { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Bot } from 'lucide-react';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={cn(
      "w-full py-6",
      isUser ? "bg-background" : "bg-muted/50"
    )}>
      <div className="container mx-auto max-w-3xl flex gap-4 px-4">
        <div className={cn(
          "flex w-8 h-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm",
          isUser ? "bg-background border-border" : "bg-primary text-primary-foreground"
        )}>
          {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
        </div>
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="prose prose-slate dark:prose-invert max-w-none break-words">
             <ReactMarkdown remarkPlugins={[remarkGfm]}>
               {message.content}
             </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};
