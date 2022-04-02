const mongoose = require('mongoose')

const { MONGO_DB_URI } = process.env

console.log(MONGO_DB_URI)

const connectionString = MONGO_DB_URI

// conexión a mongodb
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

process.on('uncaughtException', error => {
  console.error(error)
  mongoose.disconnect()
})