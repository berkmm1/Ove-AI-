import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Brain, User, Bot, ChevronDown, ChevronRight } from 'lucide-react'
import type { Message } from '../types/chat'
import { cn } from '../lib/utils'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(false)

  return (
    <div
      className={cn(
        "flex w-full py-4 px-4 md:px-6",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn("flex max-w-4xl gap-4", isUser ? "flex-row-reverse" : "flex-row", "w-full")}>
        <div className="flex-shrink-0 mt-1">
          {isUser ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <User size={18} />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Bot size={18} />
            </div>
          )}
        </div>

        <div className={cn("flex min-w-0 flex-col gap-2", isUser ? "items-end" : "items-start", "w-full")}>
          {!isUser && message.reasoning && (
            <div className="rounded-lg border border-border bg-muted/30 w-full max-w-2xl text-left overflow-hidden">
              <button
                onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                className="flex items-center gap-2 w-full p-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                {isReasoningExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <Brain size={16} className="text-primary" />
                Düşünce Süreci
              </button>
              {isReasoningExpanded && (
                <div className="p-3 pt-0 border-t border-border/50 text-sm text-muted-foreground whitespace-pre-wrap">
                  {message.reasoning}
                </div>
              )}
            </div>
          )}

          <div
            className={cn(
              "prose prose-invert max-w-none break-words px-4 py-3 rounded-2xl",
              isUser ? "bg-muted text-foreground rounded-tr-sm" : "bg-transparent text-foreground w-full text-left"
            )}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
