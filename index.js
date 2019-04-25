const express = require('express')
const app = express()

app.use(express.json())
app.use(express.static('public'))

const tasks = []
let id = 0

app.get('/tasks', (request, response) => {
  response.json(tasks)
})

app.post('/tasks', (request, response) => {
  const task = request.body
  if(task.description){
    id++
    task.id = id
    task.createdAt = new Date()
    tasks.push(task)
    response.json(task)
  }else{
    response.status(422).json({error: "description required"})
  }
})

app.delete('/tasks/:id', (request, response) => {
  const taskId = Number(request.params.id)
  const task = tasks.find(task => task.id === taskId)
  if(task){
    const index = tasks.indexOf(task)
    tasks.splice(index, 1)
    response.json(task)
  }else{
    response.status(404).json({error: "Not Found"})
  }
})

app.listen(process.env.PORT || 3000)

console.log("APP is working")