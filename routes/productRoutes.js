const express = require('express')
const productRouter = express.Router()

const LogStock = require('../models/LogStock')
const Medida = require('../models/Medida')
const Producto = require('../models/Producto')

productRouter.get('/api/log', (request, response) => {
  LogStock.find({}).then((result) => {
    response.json(result)
  })
})

productRouter.get('/api/medidas', (request, response) => {
  Medida.find({}).then((result) => {
    response.json(result)
  })
})

productRouter.post('/api/medidas', async (request, response, next) => {
  const um = request.body
  if (!um) {
    return response.status(400).json({
      error: 'mamó',
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

productRouter.get('/api/productos', (request, response) => {
  Producto.find({ tipoProducto: 'P' }).then((result) => {
    response.json(result)
  })
})

productRouter.get('/api/productos/:id', (request, response) => {
  const id = request.params.id
  const tipo = 'P'
  Producto.findOne(
    { id: id, tipoProducto: tipo }, 'id nombre descripcion precioVenta precioCompra stock'
  ).then((result) => {
    if (result) {
      response.json(result)
    } else {
      response.status(204).end()
    }
  })
})

productRouter.get('/api/:category/productos/', (request, response) => {
  const id = request.params.category
  const tipo = 'P'
  Producto.find(
    { categoria: id, tipoProducto: tipo }).then((result) => {
    if (result) {
      response.json(result)
    } else {
      response.status(204).end()
    }
  })
})

productRouter.post('/api/productos', async (request, response, next) => {
  const product = request.body
  if (!product) {
    return response.status(400).json({
      error: 'mamó',
    })
  }
  const newProduct = new Producto({
    id: product.id,
    nombre: product.nombre,
    descripcion: product.descripcion,
    precioCompra: product.precioCompra,
    precioVenta: product.precioVenta,
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

productRouter.put('/api/productos', (request, response) => {
  const product = request.body
  Producto.findOneAndUpdate(
    {id: product.id, tipo: 'P'}, 
    { nombre: product.nombre,
      descripcion: product.descripcion,
      categoria: product.categoria,
      stock: product.stock,
      stockCritico: product.stockCritico,
      precioCompra: product.precioCompra,
      precioVenta: product.precioVenta 
    })
    .then((result) => {
      if (result) {
        response.status(200).end()
      } else {
        response.status(405).end()
      }
    })
})

productRouter.delete('/api/productos/:id', (request, response) => {
  const id = request.params.id
  Producto.findOneAndDelete({id: id, tipo: 'P'}).then((result) => {
    if (result) {
      response.status(204).end()
    } else {
      response.status(405).end()
    }
    
  })
})

productRouter.get('/api/servicios', (request, response) => {
  Producto.find({ tipoProducto: 'S' }).then((result) => {
    response.json(result)
  })
})

productRouter.get('/api/servicios/:id', (request, response) => {
  const id = request.params.id
  Producto.findOne({ id: id, tipoProducto: 'S' }, 'id nombre descripcion precioVenta').then(
    (result) => {
      if (result) {
        response.json(result)
      } else {
        response.status(204).end()
      }
    }
  )
})

productRouter.post('/api/servicios', async (request, response, next) => {
  const service = request.body
  if (!service) {
    return response.status(400).json({
      error: 'mamó',
    })
  }
  const newService = new Producto({
    id: service.id,
    nombre: service.nombre,
    descripcion: service.descripcion,
    precioVenta: service.precioVenta,
    tipoProducto: 'S',
  })
  try {
    const savedService = await newService.save()
    response.json(savedService)
  } catch (error) {
    next(error)
  }
})

module.exports = productRouter