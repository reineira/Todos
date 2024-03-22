import axios from 'axios'
import { Todo, Task } from '@/entities/Types'

// createTodo

export const createTodo = async (todo: Todo): Promise<Task> => {
  let newTodo: any = await axios.post('http://localhost:5000/todos', todo)

  return newTodo
}

//fetchTodos

export const fetchTodos = async (email: string): Promise<{ data: [Task] }> => {
  let todos: any = await axios.get(`http://localhost:5000/todos/${email}`)

  return todos
}

//
