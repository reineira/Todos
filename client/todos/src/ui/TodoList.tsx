import React from 'react'

const TodoList = ({ todoList }) => {
  return todoList.length > 0 ? (
    <div>I have some data</div>
  ) : (
    <div> You task list is empty</div>
  )
}

export default TodoList
