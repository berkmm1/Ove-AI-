import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Brain, User, Bot, ChevronRight, ChevronDown } from 'lucide-react'
import type { Message } from '../types/chat'
import { cn } from '../lib/utils'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div
      className={cn(
        "flex w-full py-6",
        isUser ? "bg-background" : "bg-muted/10"
      )}
    >
      <div className="mx-auto flex w-full max-w-4xl gap-4 px-4 md:px-6">
        <div className="flex-shrink-0 pt-1">
          {isUser ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
              <User size={18} />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <Bot size={18} />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {!isUser && message.reasoning && (
            <div className="rounded-lg border border-border bg-muted/30 p-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mb-2 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <Brain size={16} className="text-primary animate-pulse" />
                Düşünce Süreci (DeepThink)
              </button>
              {isExpanded && (
                <div className="prose prose-sm prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                  {message.reasoning}
                </div>
              )}
            </div>
          )}

          <div className="prose prose-invert max-w-none break-words">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
