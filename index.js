const express = require('express')
const cors = require('cors')
const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
//const userExtractor = require('./middleware/userExtractor')

const app = express()
app.use(cors())

let arrayTest = [
  {
    id: 'tesdast'
  },
  {
    id: '1231asdd2'
  }
]
app.get('/', (request, response) => {
  response.send('<h1>test</h1>')
})

app.get('/api/test', (request, response) => {
  response.json(arrayTest)
})

app.get('/api/test/:id', (request, response) => {
  const id = request.params.id
  console.log(id)
  const array = arrayTest.find(a => a.id === id)
  if (array) {
    response.json(array)
  } else {
    response.status(404).end()
  }  
})

app.delete('/api/test/:id', (request, response) => {
  const id = request.params.id
  let newTest = arrayTest.filter(a => a.id !== id)
  response.json(newTest)
})

app.post('/api/test', (request, response) => {

  const test = request.body
  if (!test || !test.content) {
    return response.status(400).json({
      error: 'mamó'
    })
  }
  const newTest ={
    id: 'jejejej',
    prueba : 'funciona'
  }
  arrayTest = [... arrayTest, newTest]
  response.json(newTest)
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server run in ${PORT}`)
})

module.exports = { app, server }