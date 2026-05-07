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
    <div className="flex w-full py-6">
      <div className={cn(
        "mx-auto flex w-full max-w-4xl gap-4 px-4 md:px-6",
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <div className="flex-shrink-0 pt-1">
          {isUser ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <User size={18} />
            </div>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <Bot size={18} />
            </div>
          )}
        </div>

        <div className={cn(
          "flex min-w-0 flex-1 flex-col",
          isUser ? "items-end" : "items-start gap-4"
        )}>
          {isUser ? (
            <div className="rounded-2xl bg-muted px-5 py-3 text-foreground max-w-[85%] break-words">
              {message.content}
            </div>
          ) : (
            <>
              {!isUser && message.reasoning && (
                <div className="flex flex-col gap-2 border-l-2 border-border/50 pl-4 w-full max-w-[85%]">
                  <button
                    onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-fit"
                  >
                    {isReasoningExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <Brain size={16} className={cn("text-muted-foreground", !isReasoningExpanded && "animate-pulse text-primary")} />
                    Düşünce Süreci (DeepThink)
                  </button>
                  {isReasoningExpanded && (
                    <div className="prose prose-sm prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                      {message.reasoning}
                    </div>
                  )}
                </div>
              )}

              <div className="prose prose-invert max-w-none break-words text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
