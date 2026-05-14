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
    <div className="flex w-full py-4">
      <div className={cn(
        "mx-auto flex w-full max-w-3xl gap-4 px-4 md:px-6",
        isUser && "justify-end"
      )}>
        {!isUser && (
          <div className="flex-shrink-0 pt-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <Bot size={18} />
            </div>
          </div>
        )}

        <div className={cn(
          "flex flex-col gap-3 max-w-[85%]",
          isUser && "items-end"
        )}>
          {isUser ? (
            <div className="rounded-2xl bg-muted/50 px-5 py-3 text-[15px]">
              <div className="whitespace-pre-wrap break-words">{message.content}</div>
            </div>
          ) : (
            <div className="flex min-w-0 flex-1 flex-col gap-4 pt-1">
              {message.reasoning && (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                    className="flex items-center gap-2 w-fit text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {isReasoningExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <Brain size={16} className={cn(!isReasoningExpanded && "text-muted-foreground")} />
                    Düşünce Süreci (DeepThink)
                  </button>

                  {isReasoningExpanded && (
                    <div className="rounded-xl border border-border bg-muted/20 px-4 py-3 pl-4 ml-2 border-l-2 border-l-border/50">
                      <div className="prose prose-sm prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                        {message.reasoning}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="prose prose-invert max-w-none break-words text-[15px] leading-relaxed">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
