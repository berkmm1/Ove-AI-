import { useState, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { MainContent } from './components/MainContent';
import { Message, type MessageType } from './components/Message';
import { ChatInput } from './components/ChatInput';

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle responsive sidebar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newUserMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);

    // Mock AI Response
    setTimeout(() => {
      const newAiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Here is a detailed response reflecting your request. I can format with **Markdown**, create lists:\n- Item 1\n- Item 2\n\nAnd even include code blocks:\n```javascript\nconsole.log('Hello from DeepSeek Clone!');\n```\nHow else can I help you today?",
      };
      setMessages((prev) => [...prev, newAiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#343541]">
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMobile={isMobile}
      />

      <MainContent
        isSidebarOpen={isSidebarOpen}
        onOpenSidebar={() => setIsSidebarOpen(true)}
        isMobile={isMobile}
      >
        <div className="flex flex-col h-full relative pt-12 md:pt-0 pb-32">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-4">
              <h1 className="text-4xl font-semibold mb-8 text-gray-800 dark:text-gray-100">DeepSeek Clone</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                {/* Example cards */}
                {['Plan a trip', 'Explain quantum computing', 'Write a React component', 'Debug a Python script'].map((text, i) => (
                  <button key={i} className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl text-left hover:bg-gray-50 dark:hover:bg-[#40414F] transition-colors text-gray-700 dark:text-gray-300">
                    <p className="text-sm">{text} &rarr;</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {messages.map((msg) => (
                <Message key={msg.id} message={msg} />
              ))}
              {isLoading && (
                <Message
                  message={{ id: 'loading', role: 'assistant', content: '' }}
                  isStreaming={true}
                />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}

          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSubmit={handleSendMessage}
            isLoading={isLoading}
          />
        </div>
      </MainContent>
    </div>
  );
}

export default App;