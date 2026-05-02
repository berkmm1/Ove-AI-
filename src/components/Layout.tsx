import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';
import { PanelLeft } from 'lucide-react';

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#1e1e2f] text-white">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col h-full relative overflow-hidden transition-all duration-300">
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-10 p-2 text-gray-400 hover:text-white hover:bg-[#2a2a3e] rounded-md md:hidden"
          >
            <PanelLeft size={24} />
          </button>
        )}
        <ChatArea />
      </main>
    </div>
  );
};
