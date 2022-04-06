const express = require("express");
const documentRouter = express.Router();

const Factura = require("../models/Factura");
const Cotizacion = require("../models/Cotizacion");

documentRouter.get("/api/facturas", (request, response) => {
  Factura.find({}).then((result) => {
    response.json(result);
  });
});

documentRouter.post("/api/facturas", async (request, response, next) => {
  const factura = request.body;
  if (!factura) {
    return response.status(400).json({
      error: "mamó",
    });
  }

  const detailList = [];
  factura.detalle.forEach((detail) => {
    const id = detail.tipo === "P" ? detail.producto.id : detail.servicio.id;
    const precio =
      detail.tipo === "P"
        ? detail.producto.precioVenta
        : detail.servicio.precioVenta;
    detailList.push({
      id: id,
      tipo: detail.tipo,
      precioCompra: precio,
      cantidad: detail.cantidad,
      subtotal: detail.subtotal,
    });
  });

  const newFactura = new Factura({
    codFactura: factura.codFactura,
    fecha: factura.fecha,
    rutPersona: factura.persona.rut,
    tipo: factura.tipo,
    montoNeto: factura.neto,
    iva: factura.iva,
    total: factura.total,
    detalle: detailList,
  });
  try {
    const savedFactura = await newFactura.save();
    response.json(savedFactura);
  } catch (error) {
    next(error);
  }
});

documentRouter.get("/api/cotizaciones", (request, response) => {
  Cotizacion.find({}).then((result) => {
    response.json(result);
  });
});

router.get("/api/reservas", (request, response) => {
  Reserva.find({}).then((result) => {
    response.json(result);
  });
});

module.exports = documentRouter;
