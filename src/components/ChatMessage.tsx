import { useState } from 'react';
import { User, Copy, ThumbsUp, ThumbsDown, RefreshCw, ChevronDown, ChevronRight, BrainCircuit } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

export type MessageRole = 'user' | 'assistant';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  thinking?: string;
  isStreaming?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(true);

  return (
    <div className={cn("w-full py-6", isUser ? "bg-white" : "bg-[#f9f9f9]")}>
      <div className="max-w-3xl mx-auto px-4 flex gap-4 md:gap-6">

        {/* Avatar */}
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <User size={18} />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
              <BrainCircuit size={18} />
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="flex-1 space-y-4 min-w-0">
          <div className="font-semibold text-sm text-gray-800">
            {isUser ? 'You' : 'DeepSeek'}
          </div>

          {/* Thinking Process (R1 feature) */}
          {message.thinking && !isUser && (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
                className="w-full flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                {isThinkingExpanded ? (
                  <ChevronDown size={16} className="text-gray-500" />
                ) : (
                  <ChevronRight size={16} className="text-gray-500" />
                )}
                <span className="text-sm font-medium text-gray-600">Thinking Process</span>
                {message.isStreaming && isThinkingExpanded && (
                  <span className="flex h-2 w-2 ml-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                )}
              </button>

              <AnimatePresence>
                {isThinkingExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 text-sm text-gray-600 whitespace-pre-wrap leading-relaxed font-mono bg-[#fdfdfd]">
                      {message.thinking}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Main Message Content */}
          <div className="prose prose-slate max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-gray-100">
            {/* For a real app, you'd use react-markdown here. Simulating it with whitespace-pre-wrap for now. */}
            <div className="whitespace-pre-wrap text-[15px] text-gray-800 leading-relaxed">
              {message.content}
              {message.isStreaming && !message.thinking && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-blue-600 animate-pulse align-middle"></span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {!isUser && !message.isStreaming && (
            <div className="flex items-center gap-2 pt-2 text-gray-400">
              <button className="p-1.5 hover:bg-gray-200 hover:text-gray-600 rounded-md transition-colors" title="Copy">
                <Copy size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-200 hover:text-gray-600 rounded-md transition-colors" title="Regenerate">
                <RefreshCw size={16} />
              </button>
              <div className="h-4 w-px bg-gray-300 mx-1"></div>
              <button className="p-1.5 hover:bg-gray-200 hover:text-gray-600 rounded-md transition-colors" title="Good response">
                <ThumbsUp size={16} />
              </button>
              <button className="p-1.5 hover:bg-gray-200 hover:text-gray-600 rounded-md transition-colors" title="Bad response">
                <ThumbsDown size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
