import { Layout } from '@/components/Layout';
import { ChatProvider } from '@/store/ChatContext';

function App() {
  return (
    <ChatProvider>
      <Layout />
    </ChatProvider>
  );
}

export default App;
