import { Toaster } from './components/ui'
import { ReactQueryClientProvider } from './lib/query-client'
import { Router } from './routes'

function App() {
  return (
    <ReactQueryClientProvider>
      <Router />
      <Toaster />
    </ReactQueryClientProvider>
  )
}

export default App
