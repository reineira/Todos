import { Navbar } from './ui/Navbar'
import { cn } from '@/lib/utils'
import TodoForm from './ui/TodoForm'

import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { user } = useAuth0()

  return (
    <div className={cn('antialised relative h-full font-sans')}>
      <Navbar />
      {user && <TodoForm />}
    </div>
  )
}

export default App
