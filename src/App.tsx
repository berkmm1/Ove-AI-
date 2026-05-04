import { ChatProvider } from './store/ChatContext';
import { Layout } from './components/Layout';

function App() {
  return (
    <ChatProvider>
      <Layout />
    </ChatProvider>
  );
}

export default App;
