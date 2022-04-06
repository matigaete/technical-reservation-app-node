require('dotenv').config()
require('./mongo')
const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes.js')
const personRoutes = require('./routes/personRoutes.js')
const bodyParser = require('body-parser')

const notFound = require('./middleware/notFound.js')
const handleErrors = require('./middleware/handleErrors.js')
//const userExtractor = require('./middleware/userExtractor')

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use(routes)
app.use(personRoutes)

app.get('/', (request, response) => {
  response.send('<h1>test</h1>')
})

app.use(notFound)
app.use(handleErrors)

const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => {
  console.log(`Server run in ${PORT}`)
})

module.exports = { app, server }