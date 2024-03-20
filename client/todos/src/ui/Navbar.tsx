import MaxWidthWrapper from './MaxWidthWrapper'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '../components/ui/button'

export const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0()

  console.log(isAuthenticated)
  return (
    <div className='z-100  relative inset-x-0 top-0 h-16 bg-white'>
      <header className=' bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center justify-between'>
              {/* {MOBILE NAV} */}

              <div className='ml-4 flex font-bold text-blue-500 lg:ml-0'>
                Todos
              </div>

              <div className=' ml-auto hidden lg:ml-8 lg:block '>
                {' '}
                <div className='flex gap-2'>
                  {!isAuthenticated && (
                    <Button onClick={() => loginWithRedirect()}>Login</Button>
                  )}

                  {isAuthenticated && (
                    <Button onClick={() => logout()}>Logout</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  )
}
