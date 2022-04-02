const { Schema, model } = require('mongoose')

const reservaSchema = new Schema({
  fechaInicio: Date, 
  fechaTermino: Date, 
  estadoReserva: String,
  rutCliente: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

reservaSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Reserva = model('reservas', reservaSchema)

module.exports = Reserva
