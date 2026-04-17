import React from 'react';
import { ChevronDown, Send, Bot, User as UserIcon } from 'lucide-react';

export default function MainChat() {
  return (
    <div className="flex-1 flex flex-col bg-gray-800 text-gray-100">
      {/* Header */}
      <header className="h-14 border-b border-gray-700 flex items-center justify-center bg-gray-800/90 backdrop-blur-sm px-4">
        <button className="flex items-center gap-2 hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-colors text-lg font-semibold">
          DeepSeek-V3 <ChevronDown size={18} className="text-gray-400" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* User Message */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <UserIcon size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-300 mb-1">You</div>
              <div className="text-gray-100 leading-relaxed">
                Can you explain what React is and how it works?
              </div>
            </div>
          </div>

          {/* AI Message */}
          <div className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0 border border-gray-600">
              <Bot size={18} />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-gray-300 mb-1">DeepSeek</div>
              <div className="text-gray-100 leading-relaxed space-y-4">
                <p>
                  React is a popular, open-source JavaScript library used for building user interfaces (UIs), particularly single-page applications where data changes over time. It was created by Facebook (now Meta) and is maintained by them along with a community of individual developers and companies.
                </p>
                <p>Here are the core concepts of how it works:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li><strong>Components:</strong> React applications are built out of components. A component is a self-contained module that renders some output.</li>
                  <li><strong>Virtual DOM:</strong> Instead of manipulating the browser's DOM directly, React creates a virtual DOM in memory.</li>
                  <li><strong>State and Props:</strong> React uses state (internal data) and props (data passed from parent to child) to manage data flow.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-gradient-to-t from-gray-800 to-transparent">
        <div className="max-w-3xl mx-auto relative flex items-end bg-gray-700 border border-gray-600 rounded-2xl shadow-lg focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 transition-all p-1">
          <textarea
            className="w-full bg-transparent text-gray-100 placeholder-gray-400 border-0 focus:ring-0 resize-none p-3 max-h-48 min-h-[56px]"
            placeholder="Message DeepSeek..."
            rows={1}
          />
          <div className="p-2 flex-shrink-0">
            <button className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Send size={20} />
            </button>
          </div>
        </div>
        <div className="text-center text-xs text-gray-400 mt-3">
          AI can make mistakes. Consider verifying important information.
        </div>
      </div>
    </div>
  );
}
