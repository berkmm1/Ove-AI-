
import { Sidebar } from './components/Sidebar'
import { ChatArea } from './components/ChatArea'

function App() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-ds-bg dark:bg-ds-bg-dark text-ds-text dark:text-ds-text-dark font-sans">
      <Sidebar />
      <ChatArea />
    </div>
  )
}

export default App
