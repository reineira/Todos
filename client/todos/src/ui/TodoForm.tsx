import { useForm, SubmitHandler } from 'react-hook-form'
import MaxWidthWrapper from './MaxWidthWrapper'

type status = 'COMPLETED' | 'TODO' | 'IN_PROGRESS'
type Todo = {
  description: string
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
        <div className='flex  flex-grow flex-col'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              {...register('description', { required: true })}
              placeholder='enter your todo'
            />

            {errors.description && <span>This field is required</span>}

            <input type='submit' />
          </form>
        </div>
      </main>
    </MaxWidthWrapper>
  )
}

export default TodoForm
