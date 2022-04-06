const express = require("express");
const personRouter = express.Router();

const Person = require("../models/Person");

personRouter.get("/api/personas", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

personRouter.get("/api/personas/:id", (request, response) => {
  const id = request.params.id;
  Person.findOne({ rut: id }, "rut nombre").then((result) => {
    console.log(result);
    if (result) {
      response.json(result);
    } else {
      response.status(204).end();
    }
  });
});

personRouter.post("/api/personas", async (request, response, next) => {
  const person = request.body;
  if (!person) {
    return response.status(400).json({
      error: "mamó",
    });
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
  });
  try {
    const savedPerson = await newPerson.save();
    response.json(savedPerson);
  } catch (error) {
    next(error);
  }
});

router.get("/api/regiones", (request, response) => {
  Region.find({}).then((result) => {
    response.json(result);
  });
});

module.exports = personRouter;
