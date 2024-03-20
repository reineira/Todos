import { useForm, SubmitHandler } from 'react-hook-form'
import MaxWidthWrapper from './MaxWidthWrapper'
import { Input } from '@/components/ui/input'
import { Button } from '../components/ui/button'

type Status = 'COMPLETED' | 'TODO' | 'IN_PROGRESS'
type Todo = {
  title: string
  description: string
  deadline: Date
  status: Status
}

const TodoForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Todo>()
  const onSubmit: SubmitHandler<Todo> = (data) => console.log(data)

  return (
    <MaxWidthWrapper>
      {' '}
      <main className=' flex min-h-screen flex-col justify-center '>
        <div className='mt-8 flex flex-grow flex-col items-center'>
          <h1 className='mb-4 '> Please enter your tasks below </h1>
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

            <Button> Add Task </Button>
          </form>
        </div>
      </main>
    </MaxWidthWrapper>
  )
}

export default TodoForm
