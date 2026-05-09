import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Brain, Bot, ChevronDown, ChevronRight } from 'lucide-react'
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
        "flex w-full py-6",
        isUser ? "justify-end" : "justify-start bg-transparent"
      )}
    >
      <div className={cn(
        "flex w-full max-w-4xl gap-4 px-4 md:px-6",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {!isUser && (
          <div className="flex-shrink-0 pt-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <Bot size={18} />
            </div>
          </div>
        )}

        <div className={cn(
          "flex min-w-0 flex-col gap-2",
          isUser ? "max-w-[80%] items-end" : "flex-1"
        )}>
          {!isUser && message.reasoning && (
            <div className="rounded-lg border border-border bg-muted/30 w-full overflow-hidden transition-all duration-300">
              <button
                onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                className="w-full flex items-center justify-between p-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Brain size={16} className="text-primary" />
                  <span>Düşünce Süreci (DeepThink)</span>
                </div>
                {isReasoningExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>

              {isReasoningExpanded && (
                <div className="p-4 pt-0 border-t border-border/50">
                  <div className="prose prose-sm prose-invert max-w-none text-muted-foreground whitespace-pre-wrap mt-3">
                    {message.reasoning}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className={cn(
            "prose prose-invert max-w-none break-words",
            isUser ? "bg-muted text-foreground rounded-2xl rounded-tr-sm px-5 py-3" : "pt-2"
          )}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
