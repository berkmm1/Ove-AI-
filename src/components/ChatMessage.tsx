import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Brain, Bot, ChevronDown, ChevronRight } from 'lucide-react'
import type { Message } from '../types/chat'

interface ChatMessageProps {
  message: Message
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user'
  const [isReasoningExpanded, setIsReasoningExpanded] = useState(true)

  // Use a stable reference for plugins
  const plugins = [remarkGfm]

  return (
    <div className="flex w-full py-4">
      <div className="mx-auto flex w-full max-w-4xl px-4 md:px-6">

        {isUser ? (
          // User Message
          <div className="flex w-full justify-end">
            <div className="max-w-[80%] bg-muted px-5 py-3 rounded-2xl rounded-tr-sm break-words text-foreground">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={plugins}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ) : (
          // Assistant Message
          <div className="flex w-full justify-start gap-4 max-w-[85%]">
            <div className="flex-shrink-0 pt-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                <Bot size={18} />
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-3">
              {message.reasoning && (
                <div className="flex flex-col gap-2 rounded-xl bg-muted/30 border border-border/50 p-3">
                  <button
                    onClick={() => setIsReasoningExpanded(!isReasoningExpanded)}
                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    {isReasoningExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    <Brain size={16} className="text-muted-foreground" />
                    Düşünce Süreci
                  </button>
                  {isReasoningExpanded && (
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap pl-6 border-l-2 border-border/50 ml-2 py-1">
                      {message.reasoning}
                    </div>
                  )}
                </div>
              )}

              <div className="prose prose-invert max-w-none break-words leading-relaxed text-foreground">
                <ReactMarkdown remarkPlugins={plugins}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
