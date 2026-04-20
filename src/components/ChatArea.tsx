import { useState } from "react";
import { Send, Paperclip, Globe, Brain, Menu } from "lucide-react";
import { Message } from "./Message";
import { cn } from "../lib/utils";

interface ChatAreaProps {
  onMenuClick: () => void;
}

type MessageType = { role: "user" | "ai"; content: string };

export function ChatArea({ onMenuClick }: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [deepThink, setDeepThink] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    { role: "ai", content: "Hello! I'm ready to help you. What's on your mind today?" }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([...messages, { role: "user" as const, content: input }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai" as const, content: "I'm a simulated DeepSeek AI. This is a frontend clone!" }
      ]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-screen relative">
      <header className="h-14 flex items-center px-4 border-b border-border md:hidden">
        <button onClick={onMenuClick} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-md">
          <Menu className="h-5 w-5" />
        </button>
        <div className="font-semibold ml-2">DeepSeek Clone</div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto flex flex-col gap-6 pb-32">
          {messages.map((msg, idx) => (
            <Message key={idx} role={msg.role} content={msg.content} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background to-transparent pt-6 pb-6 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative flex flex-col bg-input-bg border border-border rounded-2xl p-3 shadow-sm focus-within:ring-1 focus-within:ring-primary focus-within:border-primary transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message DeepSeek..."
              className="w-full bg-transparent resize-none outline-none min-h-[44px] max-h-48 text-sm sm:text-base py-1"
              rows={1}
            />

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
              <div className="flex items-center gap-1 sm:gap-2">
                <button className="p-1.5 sm:p-2 text-gray-500 hover:text-foreground hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors" title="Attach file">
                  <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <button
                  onClick={() => setDeepThink(!deepThink)}
                  className={cn(
                    "flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors",
                    deepThink
                      ? "bg-blue-100 text-primary dark:bg-blue-900/30"
                      : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  <Brain className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  DeepThink (R1)
                </button>
                <button
                  onClick={() => setWebSearch(!webSearch)}
                  className={cn(
                    "flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors",
                    webSearch
                      ? "bg-blue-100 text-primary dark:bg-blue-900/30"
                      : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Search
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className={cn(
                  "p-1.5 sm:p-2 rounded-full transition-colors flex items-center justify-center",
                  input.trim()
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                )}
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
          <div className="text-center text-xs text-gray-400 mt-3">
            AI can make mistakes. Verify important information.
          </div>
        </div>
      </div>
    </div>
  );
}
