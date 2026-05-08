import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Brain, ChevronDown, ChevronRight } from 'lucide-react'
import type { Message } from '../types/chat'
import { cn } from '../lib/utils'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(false)

  return (
    <div className="flex w-full py-4 px-4 md:px-6">
      <div className={cn(
        "mx-auto flex w-full max-w-4xl gap-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className={cn(
          "flex min-w-0 flex-col",
          isUser ? "items-end" : "items-start w-full"
        )}>
          {!isUser && message.reasoning && (
            <div className="mb-4">
              <button
                onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                {isReasoningExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <Brain size={16} className={cn("text-primary", isReasoningExpanded && "animate-pulse")} />
                Düşünce Süreci (DeepThink)
              </button>
              {isReasoningExpanded && (
                <div className="border-l-2 border-primary/30 pl-4 py-2 ml-2">
                  <div className="prose prose-sm prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                    {message.reasoning}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className={cn(
            "prose prose-invert max-w-none break-words",
            isUser ? "bg-muted px-4 py-3 rounded-2xl rounded-tr-sm text-foreground max-w-[80%]" : "w-full"
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
