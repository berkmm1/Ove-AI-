import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
};

// Mock chats for the sidebar
const MOCK_CHATS = [
  { id: '1', title: 'React Performance Optimization', date: 'Today' },
  { id: '2', title: 'Understanding Server Components', date: 'Yesterday' },
  { id: '3', title: 'Tailwind CSS Best Practices', date: 'Previous 7 Days' },
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeChatId, setActiveChatId] = useState<string | undefined>('1');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I am DeepSeek. How can I help you today?'
    }
  ]);
  const [isStreaming, setIsStreaming] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isStreaming]);

  const handleSendMessage = async (content: string, _useSearch: boolean, useReasoning: boolean) => {
    // Add user message
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages(prev => [...prev, userMessage]);

    // Setup initial assistant response
    setIsStreaming(true);
    const assistantId = (Date.now() + 1).toString();

    setMessages(prev => [
      ...prev,
      {
        id: assistantId,
        role: 'assistant',
        content: '',
        reasoning: useReasoning ? '' : undefined
      }
    ]);

    // Simulate streaming response
    if (useReasoning) {
      // 1. Stream reasoning first
      const mockReasoning = `Okay, let's think about this.\nThe user is asking about: "${content}".\nI should provide a detailed, accurate response.\nFirst, I'll analyze the requirements...\nThen, I'll formulate the solution step-by-step.`;

      for (let i = 0; i <= mockReasoning.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 20));
        setMessages(prev =>
          prev.map(msg =>
            msg.id === assistantId
              ? { ...msg, reasoning: mockReasoning.substring(0, i) }
              : msg
          )
        );
      }

      // Wait a moment after reasoning
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // 2. Stream actual content
    const mockContent = `Based on your request "${content}", here is a detailed response.\n\n### Key Points\n\n1. **First aspect**: This is an important detail.\n2. **Second aspect**: Consider this factor as well.\n\n\`\`\`javascript\n// Here is some example code\nconst example = "Hello DeepSeek";\nconsole.log(example);\n\`\`\`\n\nIf you have any more questions, feel free to ask!`;

    for (let i = 0; i <= mockContent.length; i += 3) {
      await new Promise(resolve => setTimeout(resolve, 15));
      setMessages(prev =>
        prev.map(msg =>
          msg.id === assistantId
            ? { ...msg, content: mockContent.substring(0, i) }
            : msg
        )
      );
    }

    setIsStreaming(false);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Hello! I am DeepSeek. How can I help you today?'
      }
    ]);
    setActiveChatId(undefined);
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onNewChat={handleNewChat}
        chats={MOCK_CHATS}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
      />

      <main className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Header Spacer - For mobile mostly, but keeping consistent layout */}
        <div className="h-14 flex items-center justify-center border-b border-border/50 shrink-0">
          <span className="font-semibold tracking-wide">DeepSeek-V3</span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="flex flex-col pb-4">
            {messages.length === 1 && messages[0].role === 'assistant' && (
              <div className="mt-20 mb-10 text-center">
                <h1 className="text-4xl font-semibold mb-2">DeepSeek</h1>
                <p className="text-muted-foreground">How can I help you today?</p>
              </div>
            )}

            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id}
                role={msg.role}
                content={msg.content}
                reasoning={msg.reasoning}
                isStreaming={isStreaming && index === messages.length - 1}
              />
            ))}
            <div ref={messagesEndRef} className="h-6" />
          </div>
        </div>

        {/* Input Area */}
        <div className="w-full bg-gradient-to-t from-background via-background to-transparent pt-6 shrink-0">
          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isStreaming}
          />
        </div>
      </main>
    </div>
  );
}
