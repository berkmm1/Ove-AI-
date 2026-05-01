import { ChatProvider } from '@/store/ChatContext';
import { Sidebar } from '@/components/Sidebar';
import { ChatArea } from '@/components/ChatArea';

function AppContent() {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden text-foreground">
      <Sidebar />
      <ChatArea />
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
}

export default App;
