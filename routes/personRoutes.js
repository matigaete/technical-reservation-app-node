const express = require('express')
const nodemailer = require('nodemailer')
const personRouter = express.Router()

const Person = require('../models/Person')
const Region = require('../models/Region')

const tipoPersona = {
  Proveedor: 'P',
  Cliente: 'C'
}

personRouter.get('/api/personas/:tipo', (request, response) => {
  const tipo = request.params.tipo
  Person.find({tipo: tipo}).then((result) => {
    response.json(result)
  })
})

personRouter.get('/api/personas/:id/:tipo', (request, response) => {
  const id = request.params.id
  const tipo = request.params.tipo
  Person.findOne({ rut: id, tipo: tipo }).then((result) => {
    if (result) {
      response.json(result)
    } else {
      response.status(204).end()
    }
  })
})

personRouter.get('/api/clientes/:id', (request, response) => {
  const id = request.params.id
  Person.find({ rut: { $regex: '.*' + id + '.*' }, tipo: tipoPersona.Cliente }).then((result) => {
    console.log(result)
    if (result) {
      response.json(result)
    } else {
      response.status(204).end()
    }
  })
})

personRouter.get('/api/proveedores/:id', (request, response) => {
  const id = request.params.id
  Person.find({ rut: { $regex: '.*' + id + '.*' }, tipo: tipoPersona.Proveedor }).then((result) => {
    console.log(result)
    if (result) {
      response.json(result)
    } else {
      response.status(204).end()
    }
  })
})

personRouter.post('/api/personas', async (request, response, next) => {
  const person = request.body
  if (!person) {
    return response.status(400).json({
      error: 'mamó',
    })
  }
  const newPerson = new Person({
    rut: person.rut,
    nombre: person.nombre,
    direccion: person.direccion,
    contacto: person.contacto,
    email: person.email,
    giro: person.giro,
    comuna: person.comuna,
    provincia: person.provincia.nombre,
    region: person.region.nombre,
    tipo: person.tipo,
  })
  try {
    const savedPerson = await newPerson.save()
    response.json(savedPerson)
  } catch (error) {
    next(error)
  }
})

personRouter.get('/api/regiones', (request, response) => {
  Region.find({}).then((result) => {
    response.json(result)
  })
})

personRouter.post('/sendmail', (request, response) => {
  const { MAIL_USERNAME, MAIL_PASSWORD, MAIL_TEST, SERVICE } = process.env
  const formulario = request.body
  let transporter = nodemailer.createTransport({
    service: SERVICE,
    secure: true,
    auth: {
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD
    }
  })
  const mailOptions = {
    from: `Adjunto factura Nro. ${formulario.name}`,
    to: MAIL_TEST,
    subject: formulario.idFactura,
    html: `<strong>Nombre:</strong> ${formulario.name} <br/>
           <strong>E-mail:</strong> ${formulario.email} <br/>
           <strong>Mensaje:</strong> ${formulario.mensaje}`,
    attachments: [
      {
        filename: `${formulario.idFactura}.pdf`,
        path: formulario.pdf,
        contentType: 'application/pdf',
        encoding: 'base64'
      }
    ]
  }
  transporter.sendMail(mailOptions, function (err, info) {
    if (err)
      response.json(err)
    else
      response.json(info)
  })
})

module.exports = personRouter
