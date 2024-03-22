const express = require('express')
const app = express()
const cors = require('cors')
const { prismaClient, PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

//middleware
app.use(cors())
app.use(express.json()) //req.body

//ROUTES//

//create a todo

app.post('/todos', async (req, res) => {
  try {
    let due = new Date(req.body.task.deadline)

    let task = {
      description: req.body.task.description,
      title: req.body.task.status,
      deadline: due,
      status: req.body.task.status,
    }

    let user = await prisma.user.findUnique({
      where: {
        email: req.body.user.email,
      },
    })

    console.log(user)

    if (!user.email) {
      let newUser = await prisma.user.create({
        data: {
          ...req.body.user,
          todos: {
            create: task,
          },
        },
        include: {
          todos: true,
        },
      })
    } else {
      let newTask = await prisma.task.create({
        data: {
          ...task,
          author: { connect: { id: user.id } },
        },
        select: {
          title: true,
          description: true,
          status: true,
          deadline: true,
        },
      })

      console.log(newTask)
      res.json(newTask)
    }
  } catch (err) {
    console.error(err.message)
  }
})

// GET TODOS

app.get('/todos/:email', async (req, res) => {
  try {
    let user = await prisma.user.findUnique({
      where: {
        email: req.params.email,
      },
    })

    let todos = await prisma.task.findMany({
      where: {
        authorId: user.id,
      },
      select: {
        title: true,
        description: true,
        status: true,
        deadline: true,
      },
    })

    console.log(todos)
    res.json(todos)
  } catch (error) {
    console.error(err.message)
  }
})

app.listen(5000, () => {
  console.log('server has started on port 5000')
})
