import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '../lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI assistant. How can I help you today?"
  }
];

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Here is a response to: *"${userMessage.content}"*\n\nI can help you with programming, writing, analysis, and more. Here's a quick code example:\n\n\`\`\`javascript\nconst greeting = "Hello World";\nconsole.log(greeting);\n\`\`\``
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#1a1b26] relative">
      <header className="h-14 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 bg-white/80 dark:bg-[#1a1b26]/80 backdrop-blur-sm sticky top-0 z-10">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-200">DeepSeek Clone</h1>
        <div className="flex gap-2">
          {/* Header actions can go here */}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={cn("flex gap-4", message.role === 'user' ? "justify-end" : "justify-start")}>
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 mt-1">
                  <Bot size={18} className="text-white" />
                </div>
              )}

              <div className={cn(
                "px-4 py-3 rounded-2xl max-w-[85%] sm:max-w-[75%]",
                message.role === 'user'
                  ? "bg-gray-100 dark:bg-[#2f334d] text-gray-800 dark:text-gray-100 rounded-tr-sm"
                  : "bg-transparent text-gray-800 dark:text-gray-100"
              )}>
                {message.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {message.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>

               {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center shrink-0 mt-1">
                  <User size={18} className="text-gray-600 dark:text-gray-300" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 md:p-6 bg-gradient-to-t from-white via-white dark:from-[#1a1b26] dark:via-[#1a1b26] to-transparent">
        <div className="max-w-3xl mx-auto relative">
          <form
            onSubmit={handleSubmit}
            className="flex items-end gap-2 bg-white dark:bg-[#111218] border border-gray-300 dark:border-gray-700 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-shadow"
          >
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors shrink-0"
            >
              <Paperclip size={20} />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message DeepSeek Clone..."
              className="flex-1 max-h-48 min-h-[44px] bg-transparent border-0 focus:ring-0 resize-none py-3 px-2 text-gray-800 dark:text-gray-100 text-sm md:text-base outline-none scrollbar-hide"
              rows={1}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 mb-0.5 mr-0.5"
            >
              <Send size={18} />
            </button>
          </form>
          <div className="text-center mt-3 text-xs text-gray-500 dark:text-gray-400">
            AI can make mistakes. Consider verifying important information.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
