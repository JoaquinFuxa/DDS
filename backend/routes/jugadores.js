const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


// OBTENER TODOS LOS JUGADORES
router.get("/api/jugadores", async function (req, res, next) {
  // FILTROS DE BUSQUEDAS
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }

  if (req.query.Posicion != undefined && req.query.Posicion !== "") {
    where.Posicion = {
      [Op.like]: req.query.Posicion,
    };
  }
    let data = await db.jugadores.findAll({
        attributes: ["IdJugador", "Nombre", "Edad", "FechaNacimiento", "Posicion"],
        where,
    });
    res.json(data);
});

// OBTENER JUGADOR POR ID
router.get("/api/jugadores/:id", async function (req, res, next) {
    let data = await db.jugadores.findAll({
      attributes: ["IdJugador", "Nombre", "Edad", "FechaNacimiento", "Posicion"],
      where: { IdJugador: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
});


// CREAR UN JUGADOR NUEVO
router.post("/api/jugadores/", async (req, res) => {
try {
    let data = await db.jugadores.create({
    Nombre: req.body.Nombre,
    Edad: req.body.Edad,
    FechaNacimiento: req.body.FechaNacimiento,
    Posicion: req.body.Posicion,
    });
    res.status(200).json(data.dataValues);
} catch (err) {
    if (err instanceof ValidationError) {
    let messages = '';
    err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
    res.status(400).json({message : messages});
    } else {
    throw err;
    }
}
});


// ACTUALIZAR UN JUGADOR EXISTENTE
  router.put("/api/jugadores/:id", async (req, res) => {
    try {
    let jugador = await db.jugadores.findOne({
        attributes: [
            "IdJugador",
            "Nombre",
            "Edad",
            "FechaNacimiento",
            "Posicion",
        ],
        where: { IdJugador: req.params.id },
        });
      if (!jugador) {
        res.status(404).json({ message: "Jugador no encontrado" });
        return;
      }
      jugador.IdJugador = req.body.IdJugador;
      jugador.Nombre = req.body.Nombre;
      jugador.Edad = req.body.Edad;
      jugador.FechaNacimiento = req.body.FechaNacimiento;
      jugador.Posicion = req.body.Posicion;
      await jugador.save();
      res.sendStatus(200);
    } catch (err) {
      if (err instanceof ValidationError) {
        let messages = '';
        err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        throw err;
      }
    }
  });

 
// BORRAR UN JUGADOR
router.delete("/api/jugadores/:id", async (req, res) => {
    let filasBorradas = await db.jugadores.destroy({
        where: { IdJugador: req.params.id },
    });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    }
);

module.exports = router;