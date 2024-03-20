import { useState } from 'react'
import MaxWidthWrapper from './ui/MaxWidthWrapper'
import { Navbar } from './ui/Navbar'
import { cn } from '@/lib/utils'
import TodoForm from './ui/TodoForm'

function App() {
  return (
    <>
      <div className={cn('antialised relative h-full font-sans')}>
        <Navbar />
        <TodoForm />
      </div>
    </>
  )
}

export default App
