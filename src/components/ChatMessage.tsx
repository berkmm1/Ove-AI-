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

  if (isUser) {
    return (
      <div className="flex w-full py-4 bg-transparent">
        <div className="mx-auto flex w-full max-w-4xl justify-end px-4 md:px-6">
          <div className="max-w-[80%] rounded-2xl bg-muted px-5 py-3 text-foreground break-words prose prose-invert prose-p:my-1 max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full py-6 bg-transparent">
      <div className="mx-auto flex w-full max-w-4xl gap-4 px-4 md:px-6">
        <div className="flex-shrink-0 pt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
            <Bot size={18} />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-4 pt-1.5">
          {message.reasoning && (
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                className="flex w-fit items-center gap-2 rounded-md bg-muted/30 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
              >
                {isReasoningExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                <Brain size={14} className={cn(isReasoningExpanded && "text-primary")} />
                Düşünce Süreci (DeepThink)
              </button>

              {isReasoningExpanded && (
                <div className="rounded-lg border-l-2 border-primary/30 bg-muted/10 p-4 ml-2">
                  <div className="prose prose-sm prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                    {message.reasoning}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="prose prose-invert max-w-none break-words text-foreground">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
