const express = require('express')

const router = express.Router()



const LogStock = require('../models/LogStock')

const Medida = require('../models/Medida')

const Producto = require('../models/Producto')

const Region = require('../models/Region')

const Reserva = require('../models/Reserva')



router.get('/api/log', (request, response) => {

  LogStock.find({}).then((result) => {

    response.json(result)

  })

})



router.get('/api/medidas', (request, response) => {

  Medida.find({}).then((result) => {

    response.json(result)

  })

})



router.post('/api/medidas', async (request, response, next) => {

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



router.get('/api/productos', (request, response) => {

  Producto.find({ tipoProducto: 'P' }).then((result) => {

    response.json(result)

  })

})



router.get('/api/productos/:id', (request, response) => {

  const id = request.params.id

  const tipo = 'P'

  Producto.findOne(

    { id: id, tipoProducto: tipo },

    'id nombre precioVenta precioCompra stock'

  ).then((result) => {

    console.log(result)

    if (result) {

      response.json(result)

    } else {

      response.status(204).end()

    }

  })

})



router.post('/api/productos', async (request, response, next) => {

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



router.get('/api/servicios', (request, response) => {

  Producto.find({ tipoProducto: 'S' }).then((result) => {

    response.json(result)

  })

})



router.get('/api/servicios/:id', (request, response) => {

  const id = request.params.id

  Producto.findOne({ id: id, tipoProducto: 'S' }, 'id nombre precioVenta').then(

    (result) => {

      if (result) {

        response.json(result)

      } else {

        response.status(204).end()

      }

    }

  )

})



router.post('/api/servicios', async (request, response, next) => {

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



router.delete('/api/test/:id', (request, response) => {

  //const id = request.params.id

  let newTest = '' //arrayTest.filter(a => a.id !== id)

  response.json(newTest)

})



module.exports = router

