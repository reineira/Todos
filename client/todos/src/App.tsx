import { Navbar } from './ui/Navbar'
import { cn } from '@/lib/utils'
import TodoForm from './ui/TodoForm'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from './components/ui/button'
import MaxWidthWrapper from './ui/MaxWidthWrapper'

function App() {
  const { loginWithRedirect, user, isLoading } = useAuth0()

  return (
    <div className={cn('antialised relative h-full font-sans')}>
      <Navbar />
      {!user?.name && !isLoading && (
        <MaxWidthWrapper>
          <main className=' flex min-h-screen flex-col items-center justify-center'>
            <Button onClick={() => loginWithRedirect()}>
              {' '}
              Please Login to start posting
            </Button>
          </main>
        </MaxWidthWrapper>
      )}
      {isLoading && (
        <MaxWidthWrapper>
          <main className=' flex min-h-screen flex-col items-center justify-center '>
            Loading...
          </main>
        </MaxWidthWrapper>
      )}
      {user && <TodoForm />}
    </div>
  )
}

export default App
