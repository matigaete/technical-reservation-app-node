const { Schema, model } = require('mongoose')

const categoriaSchema = new Schema({
  nombre: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

categoriaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Categoria = model('categorias', categoriaSchema)

module.exports = Categoria
