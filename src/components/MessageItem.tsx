import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Message } from '../types';
import { Bot, User, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const MessageItem: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.role === 'user';
  const [showThought, setShowThought] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "py-6 px-4 w-full flex justify-center group",
        isUser
          ? ""
          : "bg-ds-bot-msg dark:bg-ds-bot-msg-dark"
      )}
    >
      <div className="max-w-3xl w-full flex gap-4 md:gap-6">
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-ds-border dark:bg-ds-border-dark flex items-center justify-center text-ds-text dark:text-ds-text-dark">
              <User size={18} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-ds-primary flex items-center justify-center text-white">
              <Bot size={18} />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4 overflow-hidden">
          {!isUser && message.thoughtProcess && (
            <div className="border border-ds-border dark:border-ds-border-dark rounded-xl overflow-hidden bg-black/5 dark:bg-white/5">
              <button
                onClick={() => setShowThought(!showThought)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-ds-muted dark:text-ds-muted-dark hover:text-ds-text dark:hover:text-ds-text-dark transition-colors"
              >
                {showThought ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="font-medium">Düşünce Süreci (DeepThink)</span>
              </button>
              <AnimatePresence>
                {showThought && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-3 text-sm text-ds-muted dark:text-ds-muted-dark italic border-t border-ds-border dark:border-ds-border-dark pt-2"
                  >
                    {message.thoughtProcess}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <div className={cn(
            "prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-gray-900 prose-pre:text-gray-100",
            isUser ? "text-ds-text dark:text-ds-text-dark" : "text-ds-text dark:text-ds-text-dark"
          )}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>

          {!isUser && (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleCopy}
                className="p-1.5 text-ds-muted dark:text-ds-muted-dark hover:text-ds-text dark:hover:text-ds-text-dark rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Kopyala"
              >
                {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
