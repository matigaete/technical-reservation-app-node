require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')

const categoryRoutes = require('./routes/categoryRoutes.js')
const documentRoutes = require('./routes/documentRoutes.js')
const personRoutes = require('./routes/personRoutes.js')
const productRoutes = require('./routes/productRoutes.js')

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
//const userExtractor = require('./middleware/userExtractor')

const app = express()

app.use(express.json({limit: '50mb'}))
app.use(cors())

app.use(categoryRoutes)
app.use(documentRoutes)
app.use(personRoutes)
app.use(productRoutes)

app.get('/', (request, response) => {
  response.send('<h1>API</h1>')
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server run in ${PORT}`)
})

module.exports = { app, server }