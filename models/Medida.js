const { Schema, model } = require('mongoose')

const medidaSchema = new Schema({
  nombre: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

medidaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Medida = model('medidas', medidaSchema)

module.exports = Medida