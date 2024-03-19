const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

//middleware
app.use(cors())
app.use(express.json()) //req.body

//ROUTES//

//create a todo

app.post('/todos', async (req, res) => {
  try {
    const { description, todoStatus } = req.body
    const newTodo = await pool.query(
      'INSERT INTO todos (description,status) VALUES($1,$2) RETURNING *',
      [description, todoStatus]
    )

    res.json(newTodo.rows[0])
  } catch (err) {
    console.error(err.message)
  }
})

app.listen(5000, () => {
  console.log('server has started on port 5000')
})
