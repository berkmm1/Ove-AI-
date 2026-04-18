import { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { ChatInput } from './components/ChatInput';
import { ChatMessage, type Message } from './components/ChatMessage';
import { EmptyState } from './components/EmptyState';

// Helper to simulate typing effect
function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string, useDeepThink: boolean, useSearch: boolean) => {
    // Add user message
    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content };
    setMessages(prev => [...prev, newUserMsg]);
    setIsGenerating(true);

    // Simulate network latency
    await sleep(600);

    // Initial assistant message state (empty, streaming)
    const assistantMsgId = (Date.now() + 1).toString();

    let currentThinking = '';
    let currentContent = '';

    setMessages(prev => [...prev, {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      thinking: useDeepThink ? '' : undefined,
      isStreaming: true
    }]);

    // Simulate "DeepThink" reasoning phase
    if (useDeepThink) {
      const thinkingSteps = [
        "Analyzing the user's request...",
        "\nChecking constraints and requirements.",
        "\nFormulating the optimal approach.",
        "\nDrafting the response structure.",
        "\nRefining the output for clarity."
      ];

      for (const step of thinkingSteps) {
        await sleep(400); // Simulate processing time
        currentThinking += step;
        setMessages(prev => prev.map(msg =>
          msg.id === assistantMsgId ? { ...msg, thinking: currentThinking } : msg
        ));
      }
      await sleep(500); // Pause before final answer
    } else if (useSearch) {
      // Simulate search phase
       const searchSteps = [
        "[Search] Querying database for relevant info...",
        "\n[Search] Found 3 reliable sources.",
        "\n[Search] Synthesizing information."
      ];
      for (const step of searchSteps) {
        await sleep(300);
        currentThinking += step;
        setMessages(prev => prev.map(msg =>
          msg.id === assistantMsgId ? { ...msg, thinking: currentThinking } : msg
        ));
      }
    }

    // Simulate streaming the actual response
    const mockResponse = "Here is a detailed response based on your request. I've designed this interface to closely resemble modern AI chat experiences, complete with reasoning blocks, streaming text, and a clean, responsive layout. \n\nKey features included:\n- **DeepThink Toggle**: Simulates R1 reasoning models.\n- **Search Toggle**: Simulates web browsing capabilities.\n- **Responsive UI**: Collapsible sidebar for mobile.\n- **Tailwind CSS**: Fast and clean styling.";

    const words = mockResponse.split(' ');

    for (let i = 0; i < words.length; i++) {
      await sleep(30); // Typing speed
      currentContent += (i === 0 ? '' : ' ') + words[i];
      setMessages(prev => prev.map(msg =>
        msg.id === assistantMsgId ? { ...msg, content: currentContent } : msg
      ));
    }

    // Finalize message
    setMessages(prev => prev.map(msg =>
      msg.id === assistantMsgId ? { ...msg, isStreaming: false } : msg
    ));
    setIsGenerating(false);
  };

  return (
    <div className="flex h-screen bg-white text-gray-900 font-sans overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative">
        {/* Mobile Header / Sidebar Toggle */}
        <div className="absolute top-0 left-0 p-4 z-10 flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
          >
            <Menu size={24} />
          </button>
          {/* Always visible toggle for desktop to expand/collapse if desired, normally it's fixed or auto. We'll leave it simple. */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors hidden md:block"
            title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Top Header Title */}
        <div className="h-14 flex items-center justify-center border-b border-gray-100/50 bg-white/80 backdrop-blur-sm z-0">
          <span className="font-semibold text-lg tracking-tight">DeepSeek clone</span>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto scrollbar-hide pb-32">
          {messages.length === 0 ? (
            <EmptyState onSuggestionClick={(text) => handleSendMessage(text, false, false)} />
          ) : (
            <div className="flex flex-col pb-8">
              {messages.map(msg => (
                <ChatMessage key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area (Fixed at bottom) */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-white via-white to-transparent pt-10">
          <ChatInput onSendMessage={handleSendMessage} disabled={isGenerating} />
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
