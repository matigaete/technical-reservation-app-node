const { Schema, model } = require('mongoose')

const productoSchema = new Schema({
  idProducto: Number, 
  nombre: String,
  descripcion: String,
  precioActual: Number,
  stock: Number,
  stockCritico: Number,
  tipoProducto: String,
  categoria: String,
  umedida: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

productoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Producto = model('productos', productoSchema)

module.exports = Producto
