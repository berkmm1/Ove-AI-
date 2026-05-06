import { useState } from 'react'
import { ChatProvider } from '@/store/ChatContext'
import { Sidebar } from '@/components/Sidebar'
import { ChatArea } from '@/components/ChatArea'
import { ChatInput } from '@/components/ChatInput'

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-white overflow-hidden text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="flex-1 flex flex-col h-full min-w-0 relative">
        <ChatArea onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="bg-gradient-to-t from-white via-white to-transparent pt-4">
          <ChatInput />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  )
}

export default App
