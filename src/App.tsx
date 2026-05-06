import { ChatProvider } from './store/ChatContext'
import { Layout } from './components/Layout'
import { ChatArea } from './components/ChatArea'

function App() {
  return (
    <ChatProvider>
      <Layout>
        <ChatArea />
      </Layout>
    </ChatProvider>
  )
}

export default App
