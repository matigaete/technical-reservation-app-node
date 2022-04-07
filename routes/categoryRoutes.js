const express = require('express')
const categoryRouter = express.Router()

const Categoria = require('../models/Categoria')

categoryRouter.get('/api/categorias', (request, response) => {
  Categoria.find({}).then((result) => {
    response.json(result)
  })
})

categoryRouter.post('/api/categorias', async (request, response, next) => {
  const category = request.body
  if (!category) {
    return response.status(400).json({
      error: 'mamó',
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

categoryRouter.put('/api/categorias', (request, response) => {
  const category = request.body
  Categoria.findByIdAndUpdate(category.id, { nombre: category.nombre }).then((result) => {
    response.json(result)
  })
})

categoryRouter.delete('/api/categorias/:id', (request, response) => {
  Categoria.find({}).then((result) => {
    response.json(result)
  })
})

module.exports = categoryRouter
