import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User, ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  isStreaming?: boolean;
}

export function ChatMessage({ role, content, reasoning, isStreaming }: ChatMessageProps) {
  const [showReasoning, setShowReasoning] = useState(true);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full group">
      <div className="max-w-3xl mx-auto px-4 py-6 flex gap-4 md:gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {role === 'user' ? (
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
              <User size={18} className="text-foreground" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Bot size={18} className="text-primary-foreground" />
            </div>
          )}
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0 space-y-4">
          <div className="font-medium text-sm text-foreground/80">
            {role === 'user' ? 'You' : 'DeepSeek'}
          </div>

          {/* Reasoning Block */}
          {role === 'assistant' && reasoning && (
            <div className="border border-border rounded-lg bg-accent/30 overflow-hidden">
              <button
                onClick={() => setShowReasoning(!showReasoning)}
                className="w-full flex items-center gap-2 p-3 text-sm text-muted-foreground hover:bg-accent/50 transition-colors"
              >
                {showReasoning ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="font-medium">DeepThink Process</span>
                {isStreaming && content.length === 0 && (
                  <span className="flex gap-1 ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse delay-150" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse delay-300" />
                  </span>
                )}
              </button>

              <AnimatePresence>
                {showReasoning && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 text-sm text-muted-foreground font-mono whitespace-pre-wrap">
                      {reasoning}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Final Content */}
          {(content || (isStreaming && !reasoning)) && (
            <div className="prose prose-invert prose-p:leading-relaxed prose-pre:bg-accent prose-pre:border prose-pre:border-border max-w-none break-words text-foreground">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
              {isStreaming && (
                <span className="inline-block w-2 h-4 bg-primary ml-1 animate-pulse align-middle" />
              )}
            </div>
          )}

          {/* Action Bar */}
          {role === 'assistant' && !isStreaming && content && (
            <div className="flex items-center gap-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={copyToClipboard}
                className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                title="Copy message"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
