const { Schema, model } = require('mongoose')

const regionSchema = new Schema({
  nombre: String, 
  abreviatura: String,
  capital: String,
  provincias: [{
    nombre: String,
    comunas: [{
      nombre: String,
    }]
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

regionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Region = model('regions', regionSchema)

module.exports = Region
