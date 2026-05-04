import React from 'react';
import { Sidebar } from './Sidebar';
import { ChatArea } from './ChatArea';

export const Layout: React.FC = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-[var(--color-ds-text)] font-sans">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <ChatArea />
      </main>
    </div>
  );
};
