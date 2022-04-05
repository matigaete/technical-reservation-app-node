const { Schema, model } = require('mongoose')

const personSchema = new Schema({
  rut: String,
  nombre: String,
  tipo: String,
  giro: String,
  region: String,
  provincia: String,
  comuna: String,
  direccion: String,
  contacto: String,
  email: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = model('personas', personSchema)

module.exports = Person
