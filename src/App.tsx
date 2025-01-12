import { ReactQueryClientProvider } from './lib/query-client'
import { Router } from './routes'

function App() {
  return (
    <ReactQueryClientProvider>
      <Router />
    </ReactQueryClientProvider>
  )
}

export default App
