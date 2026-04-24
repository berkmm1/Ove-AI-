import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { User, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export interface MessageType {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageProps {
  message: MessageType;
  isStreaming?: boolean;
}

export const Message: React.FC<MessageProps> = ({ message, isStreaming }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "group w-full py-6",
        isUser ? "bg-transparent" : "bg-gray-50 dark:bg-[#444654]"
      )}
    >
      <div className="max-w-3xl mx-auto px-4 flex gap-4 md:gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0 flex flex-col items-center">
          <div className={cn(
            "w-8 h-8 flex items-center justify-center rounded-sm",
            isUser
              ? "bg-blue-500 text-white"
              : "bg-emerald-600 text-white"
          )}>
            {isUser ? <User size={20} /> : <Sparkles size={20} />}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-2 overflow-hidden">
          <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none break-words">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
            {isStreaming && (
              <span className="inline-block w-2 h-4 bg-black dark:bg-white ml-1 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};