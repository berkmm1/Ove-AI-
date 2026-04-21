import { useState, useRef, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Message, type MessageType } from './components/Message';
import { ChatInput } from './components/ChatInput';
import { Menu } from 'lucide-react';
import './App.css';

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (content: string) => {
    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I am a simulated DeepSeek-like AI. I received your message:\n\n"${content}"\n\nHow can I help you further?`,
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden font-sans">
      <Sidebar isOpen={isSidebarOpen} />

      <div className="flex-1 flex flex-col h-full min-w-0 relative">
        {/* Mobile Header / Sidebar Toggle */}
        <header className="absolute top-0 left-0 right-0 z-10 flex items-center p-2 pointer-events-none">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors pointer-events-auto"
          >
            <Menu size={20} />
          </button>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto w-full pt-14 pb-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center px-4">
              <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
                How can I help you today?
              </h1>
            </div>
          ) : (
            <div className="flex flex-col w-full pb-8">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {isTyping && (
                <div className="py-6 px-4 md:px-8 w-full flex justify-center bg-gray-50">
                   <div className="max-w-3xl w-full flex gap-4 md:gap-6">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white animate-pulse">
                        </div>
                      </div>
                      <div className="flex-1 flex items-center">
                        <div className="text-gray-400 flex gap-1">
                          <span className="animate-bounce">●</span>
                          <span className="animate-bounce delay-100">●</span>
                          <span className="animate-bounce delay-200">●</span>
                        </div>
                      </div>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="w-full bg-gradient-to-t from-white via-white to-transparent pt-6">
          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}

export default App;
