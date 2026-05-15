import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Brain, ChevronDown, ChevronRight, Bot } from 'lucide-react'
import type { Message } from '../types/chat'
import { cn } from '../lib/utils'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(false)

  if (isUser) {
    return (
      <div className="flex w-full py-6 bg-background">
        <div className="mx-auto flex w-full max-w-4xl px-4 md:px-6 justify-end">
          <div className="bg-muted/50 rounded-3xl rounded-tr-sm px-5 py-3.5 max-w-[80%] text-foreground prose prose-invert break-words">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full py-6 bg-background">
      <div className="mx-auto flex w-full max-w-4xl gap-4 px-4 md:px-6">
        <div className="flex-shrink-0 pt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
            <Bot size={18} />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {message.reasoning && (
            <div className="rounded-lg border border-border bg-muted/30">
              <button
                onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 transition-colors rounded-lg"
              >
                {isReasoningExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
                <Brain size={16} className={cn(!isReasoningExpanded && "text-muted-foreground", isReasoningExpanded && "text-primary animate-pulse")} />
                Düşünce Süreci (DeepThink)
              </button>
              {isReasoningExpanded && (
                <div className="px-4 pb-4 pt-1">
                  <div className="prose prose-sm prose-invert max-w-none text-muted-foreground whitespace-pre-wrap border-l-2 border-primary/20 pl-4 ml-2">
                    {message.reasoning}
                  </div>
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
