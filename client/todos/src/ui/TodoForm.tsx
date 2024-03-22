import { useForm, SubmitHandler } from 'react-hook-form'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Input } from '@/components/ui/input'
import { Button } from '../components/ui/button'
import { Task } from '@/entities/Types'
import { createTodo, fetchTodos } from '../api/index'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { useState } from 'react'

const TodoForm = () => {
  const [open, setOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>()

  const { user } = useAuth0()

  console.log(user)

  const {
    isPending,
    isError,
    data: data,
    error,
  } = useQuery({
    queryKey: ['todo'],
    queryFn: () => fetchTodos(user?.email),
  })

  const loginUser = {
    name: user?.name,
    email: user?.email,
  }

  const queryClient = useQueryClient()

  if (isError) {
    console.log(error.message)
  }

  if (isPending) {
    console.log('is Pending')
  }

  //Mutations

  const { mutateAsync: addTodoMutation } = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo'] })
    },
  })

  const onSubmit = async (data: Task) => {
    try {
      console.log('####################')
      console.log(data)
      const nTodo = { task: { ...data }, user: loginUser }

      const newTodo = await addTodoMutation(nTodo)

      setOpen(false)

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

          {user?.name && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger>
                <Button className='mb-3'> Add Todo</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Please fill in the form to add a new task
                  </DialogTitle>
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
                    placeholder='Enter description of task'
                    className='mb-3'
                  />
                  {errors.description && <span>This field is required</span>}
                  <Input
                    {...register('deadline', { required: true })}
                    placeholder='Enter deadline'
                    className='mb-3'
                    type='date'
                  />
                  {errors.deadline && <span>This field is required</span>}'{' '}
                  <select {...register('status')} className='mb-3 block  p-4'>
                    <option value='IN_PROGRESS'>IN progress</option>
                    <option value='TODO'>Todo</option>
                    <option value='COMPLETED'>Completed</option>
                  </select>
                  {errors.status && <span>This field is required</span>}
                  <Button className='mt-4'>Add Task</Button>
                </form>
              </DialogContent>
            </Dialog>
          )}

          <div className='flex flex-wrap gap-3'>
            {data?.data.map((todo: Task) => {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle>{todo.title}</CardTitle>
                    <CardDescription>{todo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p> Deadline :{todo.deadline}</p>
                  </CardContent>
                  <CardFooter>
                    <p>Status : {todo.status} </p>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </MaxWidthWrapper>
  )
}

export default TodoForm
