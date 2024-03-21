import { useForm, SubmitHandler } from 'react-hook-form'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Input } from '@/components/ui/input'
import { Button } from '../components/ui/button'
import { Task } from '@/entities/Types'
import { createTodo, fetchTodos } from '../api/index'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import TodoList from './TodoList'

import { useState } from 'react'
import { Divide } from 'lucide-react'

const TodoForm = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [todoList, setTodos] = useState<[]>([])

  console.log(todoList)

  const { user } = useAuth0()

  const queryClient = useQueryClient()

  const loginUser = {
    name: user?.name,
    email: user?.email,
  }

  const {
    isPending,
    isError,
    data: data,
    error,
  } = useQuery({
    queryKey: ['todos', user?.email],
    queryFn: () => fetchTodos(user?.email),
    onSuccess: () => {
      setTodos(data?.data)
    },
  })

  if (isError) {
    console.log(error.message)
  }

  if (isPending) {
    console.log('is Pending')
  }

  if (data) {
    console.log(data?.data)
    console.log(typeof data)
  }

  //Mutations

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos'])
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Task>()
  const onSubmit: SubmitHandler<Task> = async (data: Task) => {
    try {
      const nTodo = { task: { ...data }, user: loginUser }
      setOpen(false)
      const newTodo = await addTodoMutation(nTodo)

      console.log(nTodo)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <MaxWidthWrapper>
      {' '}
      <main className=' flex min-h-screen flex-col justify-center '>
        <div className='mt-8 flex flex-grow flex-col items-center'>
          <h1 className='mb-4 '> Please enter your tasks below </h1>
          {!user?.name && <Button> Login to start posting </Button>}
          {user?.name && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>Add Todo</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Please fill in the form to add a new task
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Input
                    {...register('title', { required: true })}
                    placeholder='Enter title of task'
                    className='mb-3'
                  />
                  {errors.title && <span>This field is required</span>}

                  <Input
                    {...register('description', { required: true })}
                    placeholder='Enter title of task'
                    className='mb-3'
                  />

                  {errors.description && <span>This field is required</span>}

                  <Input
                    {...register('deadline', { required: true })}
                    placeholder='Enter deadline'
                    className='mb-3'
                    type='date'
                  />
                  {errors.deadline && <span>This field is required</span>}

                  <Input
                    {...register('status', { required: true })}
                    placeholder='Enter description of task'
                    className='mb-3'
                  />

                  {errors.status && <span>This field is required</span>}

                  <Button>Add Task</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}

          {data?.data.map((todo) => {
            return <div> {todo.description}</div>
          })}
        </div>
      </main>
    </MaxWidthWrapper>
  )
}

export default TodoForm
