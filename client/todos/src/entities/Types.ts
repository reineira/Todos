export type Status = 'COMPLETED' | 'TODO' | 'IN_PROGRESS'

export type User = {
  name: string
  email: string
}

export type Todo = {
  task:Task
  user: User
}

export type Task ={
  title: string
  description: string
  deadline: Date
  status: Status

}
