const { Schema, model } = require('mongoose')

const cotizacionSchema = new Schema({
  rutCliente: String,
  fecha: Date,
  montoNeto: Number,
  iva: Number,
  total: Number,
  detalle: [{
    id: Number,
    tipo: Number,
    precioVenta: Number,
    cantidad: Number,
    subtotal: Number,
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

cotizacionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Cotizacion = model('cotizaciones', cotizacionSchema)

module.exports = Cotizacion
