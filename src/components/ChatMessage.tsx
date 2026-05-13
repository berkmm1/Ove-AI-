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
  const [isReasoningOpen, setIsReasoningOpen] = useState(true)

  return (
    <div className="flex w-full py-6">
      <div className={cn(
        "mx-auto flex w-full max-w-4xl px-4 md:px-6",
        isUser ? "justify-end" : "justify-start"
      )}>
        <div className={cn(
          "flex min-w-0 flex-col gap-2 max-w-[85%]",
          isUser ? "items-end" : "items-start"
        )}>

          {!isUser && message.reasoning && (
            <div className="w-full mb-2">
              <button
                onClick={() => setIsReasoningOpen(!isReasoningOpen)}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-2"
              >
                {isReasoningOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <Brain size={16} className={cn("text-primary", isReasoningOpen && "animate-pulse")} />
                Düşünce Süreci
              </button>

              {isReasoningOpen && (
                <div className="rounded-xl border-l-2 border-primary/50 bg-muted/20 p-4 text-sm text-muted-foreground whitespace-pre-wrap">
                  {message.reasoning}
                </div>
              )}
            </div>
          )}

          <div className={cn(
            "prose prose-invert break-words max-w-none px-4 py-3",
            isUser ? "bg-muted rounded-2xl rounded-tr-sm text-foreground" : "bg-transparent text-foreground"
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
