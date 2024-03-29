const express = require('express')
const documentRouter = express.Router()

const Factura = require('../models/Factura')
const Cotizacion = require('../models/Cotizacion')
const Producto = require('../models/Producto')
const Reserva = require('../models/Reserva')

const tipoProducto = {
  Insumo: 'P',
  Servicio: 'S'
}

documentRouter.get('/api/facturas', (request, response) => {
  Factura.find({}).then((result) => {
    response.json(result)
  })
})

documentRouter.post('/api/facturas', (request, response, next) => {
  let lastCode = 0
  const factura = request.body
  if (!factura) {
    return response.status(400).json({
      error: 'mamó',
    })
  }

  factura.detalle.forEach((detail) => {
    if (detail.tipo === tipoProducto.Insumo) {
      Producto.findOneAndUpdate({
        id: detail.producto.id, 
        tipoProducto: tipoProducto.Insumo
      }, 
      { 
        stock: detail.producto.stock - detail.cantidad 
      }).then(() => {
        //console.log(e)
      })
    }
  })
  

  Factura.find({}, 'codFactura').then((result) => {
    const listCodes = []
    result.forEach((r) => { 
      if (typeof r.codFactura === 'number') {
        listCodes.push(r.codFactura)
      }
    })
    lastCode = Math.max(... listCodes) + 1
    const detailList = []
    factura.detalle.forEach((detail) => {
      const id = detail.tipo === tipoProducto.Insumo ? detail.producto.id : detail.servicio.id
      const precio =
        detail.tipo === tipoProducto.Insumo
          ? detail.producto.precioVenta
          : detail.servicio.precioVenta
      detailList.push({
        id: id,
        tipo: detail.tipo,
        precioCompra: precio,
        cantidad: detail.cantidad,
        subtotal: detail.subtotal,
      })
    })

    const newFactura = new Factura({
      codFactura: lastCode,
      fecha: factura.fecha,
      rutPersona: factura.persona.rut,
      tipo: factura.tipo,
      montoNeto: factura.neto,
      iva: factura.iva,
      total: factura.total,
      detalle: detailList,
    })
    try {
      newFactura.save()
      response.json(lastCode)
    } catch (error) {
      next(error)
    }
  })
})

documentRouter.get('/api/cotizaciones', (request, response) => {
  Cotizacion.find({}).then((result) => {
    response.json(result)
  })
})

documentRouter.post('/api/cotizaciones', (request, response, next) => {
  let lastCode = 0
  const cotizacion = request.body
  if (!cotizacion) {
    return response.status(400).json({
      error: 'mamó',
    })
  }

  cotizacion.detalle.forEach((detail) => {
    if (detail.tipo === tipoProducto.Insumo) {
      Producto.findOneAndUpdate({
        id: detail.producto.id, 
        tipoProducto: tipoProducto.Insumo
      }, 
      { 
        stock: detail.producto.stock - detail.cantidad 
      }).then((e) => {
        console.log(e)
      })
    }
  })
  

  Cotizacion.find({}, 'codCotizacion').then((result) => {
    const listCodes = []
    result.forEach((r) => { 
      if (typeof r.codCotizacion === 'number') {
        listCodes.push(r.codCotizacion)
      }
    })
    lastCode = Math.max(... listCodes) + 1
    const detailList = []
    cotizacion.detalle.forEach((detail) => {
      const id = detail.tipo === tipoProducto.Insumo ? detail.producto.id : detail.servicio.id
      const precio =
        detail.tipo === tipoProducto.Insumo
          ? detail.producto.precioVenta
          : detail.servicio.precioVenta
      detailList.push({
        id: id,
        tipo: detail.tipo,
        precioCompra: precio,
        cantidad: detail.cantidad,
        subtotal: detail.subtotal,
      })
    })

    const newCotizacion = new Cotizacion({
      codCotizacion: lastCode,
      fecha: cotizacion.fecha,
      rutCliente: cotizacion.persona.rut,
      tipo: cotizacion.tipo,
      montoNeto: cotizacion.neto,
      iva: cotizacion.iva,
      total: cotizacion.total,
      detalle: detailList,
    })
    try {
      newCotizacion.save()
      response.json(lastCode)
    } catch (error) {
      next(error)
    }
  })
})

documentRouter.get('/api/reservas', (request, response) => {
  Reserva.find({}).then((result) => {
    response.json(result)
  })
})

module.exports = documentRouter
