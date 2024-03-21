import axios from 'axios'
import { Todo } from '@/entities/Types'

// createTodo

export const createTodo = async (todo: Todo): any => {
  let newTodo: any = await axios.post('http://localhost:5000/todos', todo)

  return newTodo
}

//fetchTodos

export const fetchTodos = async (email: string): Promise<[]> => {
  let todos: any = await axios.get(`http://localhost:5000/todos/${email}`)

  return todos
}
