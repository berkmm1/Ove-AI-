import React from 'react';
import Sidebar from './components/Sidebar';
import MainChat from './components/MainChat';

export default function App() {
  return (
    <div className="flex h-screen bg-gray-800 font-sans overflow-hidden">
      <Sidebar />
      <MainChat />
    </div>
  );
}
