import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Brain, Bot } from 'lucide-react'
import type { Message } from '../types/chat'
import { cn } from '../lib/utils'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'

  return (
    <div className="flex w-full py-4">
      <div className={cn(
        "mx-auto flex w-full max-w-4xl gap-4 px-4 md:px-6",
        isUser ? "justify-end" : "justify-start"
      )}>
        {!isUser && (
          <div className="flex-shrink-0 pt-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
              <Bot size={18} />
            </div>
          </div>
        )}

        <div className={cn(
          "flex min-w-0 flex-col gap-2 max-w-[85%]",
          isUser ? "items-end" : "items-start"
        )}>
          {isUser ? (
            <div className="rounded-2xl bg-muted/80 px-5 py-3 text-foreground break-words whitespace-pre-wrap">
              {message.content}
            </div>
          ) : (
            <div className="flex flex-col gap-4 w-full">
              {message.reasoning && (
                <details className="group rounded-lg border border-border/50 bg-muted/10">
                  <summary className="flex cursor-pointer items-center gap-2 p-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors list-none [&::-webkit-details-marker]:hidden">
                    <Brain size={16} className="text-muted-foreground group-open:text-primary transition-colors" />
                    Düşünce Süreci (DeepThink)
                    <span className="ml-auto text-xs opacity-50 group-open:hidden">Genişlet</span>
                    <span className="ml-auto text-xs opacity-50 hidden group-open:block">Daralt</span>
                  </summary>
                  <div className="p-4 pt-1 border-t border-border/50 text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {message.reasoning}
                  </div>
                </details>
              )}

              <div className="prose prose-invert max-w-none break-words leading-relaxed text-foreground">
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
