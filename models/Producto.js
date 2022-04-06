const { Schema, model } = require('mongoose')

const productoSchema = new Schema({
  id: String, 
  nombre: String,
  descripcion: String,
  precioVenta: Number,
  precioCompra: Number,
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
    delete returnedObject.__v
  }
})

const Producto = model('productos', productoSchema)

module.exports = Producto
