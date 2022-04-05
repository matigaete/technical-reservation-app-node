const { Schema, model } = require('mongoose')

const facturaSchema = new Schema({
  codFactura: Number, 
  rutPersona: String,
  fecha: Date,
  tipo: String,
  montoNeto: Number,
  iva: Number,
  total: Number,
  detalle: [{
    idProducto: Number,
    precioCompra: Number,
    cantidad: Number,
    subtotal: Number,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

facturaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Factura = model('facturas', facturaSchema)

module.exports = Factura
