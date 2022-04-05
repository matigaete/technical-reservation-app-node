require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
//const userExtractor = require('./middleware/userExtractor')

const Person = require('./models/Person')
const Categoria = require('./models/Categoria')
const Factura = require('./models/Factura') 
const Cotizacion = require('./models/Cotizacion')
const LogStock = require('./models/LogStock')
const Medida = require('./models/Medida')
const Producto = require('./models/Producto')
const Region = require('./models/Region')
const Reserva = require('./models/Reserva')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', (request, response) => {
  response.send('<h1>test</h1>')
})

app.get('/api/personas', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/personas/:id', (request, response) => {
  const id = request.params.id
  Person.findOne({ 'rut' : id }, 'rut nombre').then((result) => {
    console.log(result)
    if (result) {
      response.json(result)
    } else {
      response.status(204).end()
    }
  })
})

app.post('/api/personas', async (request, response, next) => {
  const person = request.body
  if (!person) {
    return response.status(400).json({
      error: 'mamó'
    })
  }
  const newPerson = new Person({
    rut: person.rut,
    nombre: person.nombre,
    direccion: person.direccion,
    contacto: person.contacto,
    email: person.email,
    giro: person.giro,
    comuna: person.comuna,
    provincia: person.provincia.nombre,
    region: person.region.nombre,
    tipo: person.tipo
  })
  try {
    const savedPerson = await newPerson.save()
    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

app.get('/api/categorias', (request, response) => {
  Categoria.find({}).then(result => {
    response.json(result)
  })
})

app.post('/api/categorias', async (request, response, next) => {
  const category = request.body
  if (!category) {
    return response.status(400).json({
      error: 'mamó'
    })
  }
  const newCategory = new Categoria({
    nombre: category.nombre,
  })
  try {
    const savedCategory = await newCategory.save()
    response.json(savedCategory)
  } catch (error) {
    next(error)
  }
})

app.get('/api/facturas', (request, response) => {
  Factura.find({}).then(result => {
    response.json(result)
  })
})

app.post('/api/facturas', async (request, response, next) => {
  const factura = request.body
  if (!factura) {
    return response.status(400).json({
      error: 'mamó'
    })
  }

  const detailList = []
  factura.detalle.forEach(detail => {
    detailList.push({
      idProducto: detail.producto.idProducto,
      precioCompra: detail.producto.precioVenta,
      cantidad: detail.cantidad,
      subtotal: detail.subtotal
    })
  });

  const newFactura = new Factura({
    codFactura: factura.codFactura,
    fecha: factura.fecha,
    rutPersona: factura.persona.rut,
    tipo: factura.tipo,
    montoNeto: factura.neto,
    iva: factura.iva,
    total: factura.total,
    detalle: detailList,
  })
  try {
    const savedFactura = await newFactura.save()
    response.json(savedFactura)
  } catch (error) {
    next(error)
  }
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

app.post('/api/medidas', async (request, response, next) => {
  const um = request.body
  if (!um) {
    return response.status(400).json({
      error: 'mamó'
    })
  }
  const newUm = new Medida({
    nombre: um.nombre,
  })
  try {
    const savedUm = await newUm.save()
    response.json(savedUm)
  } catch (error) {
    next(error)
  }
})

app.get('/api/productos', (request, response) => {
  Producto.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/productos/:id', (request, response) => {
  const id = request.params.id
  const tipo = 'P'
  console.log(id)
  Producto.findOne({ 'idProducto' : id, 'tipoProducto': tipo }, 'idProducto nombre precioActual precioVenta stock').then((result) => {
    console.log(result)
    if (result) {
      response.json(result)
    } else {
      response.status(204).end()
    }
  })
})

app.post('/api/productos', async (request, response, next) => {
  const product = request.body
  if (!product) {
    return response.status(400).json({
      error: 'mamó'
    })
  }
  const newProduct = new Producto({
    idProducto: product.codigo,
    nombre: product.nombre,
    descripcion: product.descripcion,
    precioActual: product.precioCompra,
    stock: product.stock,
    stockCritico: product.stockCritico,
    tipoProducto: 'P',
    categoria: product.categoria,
    umedida: product.umedida ? product.umedida : 'NA',
  })
  try {
    const savedProduct = await newProduct.save()
    response.json(savedProduct)
  } catch (error) {
    next(error)
  }
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

app.delete('/api/test/:id', (request, response) => {
  //const id = request.params.id
  let newTest = ''//arrayTest.filter(a => a.id !== id)
  response.json(newTest)
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server run in ${PORT}`)
})

module.exports = { app, server }