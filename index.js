require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const Person = require('./models/Person')

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
const Categoria = require('./models/Categoria')
const Factura = require('./models/Factura') 
const Cotizacion = require('./models/Cotizacion')
const LogStock = require('./models/LogStock')
const Medida = require('./models/Medida')
const Producto = require('./models/Producto')
const Region = require('./models/Region')
const Reserva = require('./models/Reserva')
//const userExtractor = require('./middleware/userExtractor')

const app = express()
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>test</h1>')
})

app.get('/api/personas', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/categorias', (request, response) => {
  Categoria.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/facturas', (request, response) => {
  Factura.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/cotizaciones', (request, response) => {
  Cotizacion.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/log', (request, response) => {
  LogStock.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/medidas', (request, response) => {
  Medida.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/productos', (request, response) => {
  Producto.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/regiones', (request, response) => {
  Region.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/reservas', (request, response) => {
  Reserva.find({}).then(result => {
    response.json(result)
  })
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