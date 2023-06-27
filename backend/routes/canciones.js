const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


// OBTENER TODAS LAS CANCIONES
router.get("/api/canciones", async function (req, res, next) {
  // FILTROS DE CANCIONES
  let where = {};
  if (req.query.Nombre != undefined && req.query.Nombre !== "") {
    where.Nombre = {
      [Op.like]: "%" + req.query.Nombre + "%",
    };
  }

  if (req.query.Artista != undefined && req.query.Artista !== "") {
    where.Artista = {
      [Op.like]: "%" + req.query.Artista + "%",
    };
  }
    let data = await db.canciones.findAll({
        attributes: ["IdCancion", "Nombre", "Artista", "Duracion", "FechaLanzamiento"],
        where,
    });
    res.json(data);
});

// OBTENER CANCION POR ID
router.get("/api/canciones/:id", async function (req, res, next) {
    let data = await db.canciones.findAll({
      attributes: ["IdCancion", "Nombre", "Artista", "Duracion", "FechaLanzamiento"],
      where: { IdCancion: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
});


// CREAR UNA CANCION NUEVA
router.post("/api/canciones/", async (req, res) => {
try {
    let data = await db.canciones.create({
    Nombre: req.body.Nombre,
    Artista: req.body.Artista,
    Duracion: req.body.Duracion,
    FechaLanzamiento: req.body.FechaLanzamiento,
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


// ACTUALIZAR UNA CANCION EXISTENTE
  router.put("/api/canciones/:id", async (req, res) => {
    try {
    let cancion = await db.canciones.findOne({
        attributes: [
            "IdCancion",
            "Nombre",
            "Artista",
            "Duracion",
            "FechaLanzamiento"
        ],
        where: { IdCancion: req.params.id },
        });
      if (!cancion) {
        res.status(404).json({ message: "Canción no encontrada" });
        return;
      }
      cancion.IdCancion = req.body.IdCancion;
      cancion.Nombre = req.body.Nombre;
      cancion.Artista = req.body.Artista;
      cancion.Duracion = req.body.Duracion;
      cancion.FechaLanzamiento = req.body.FechaLanzamiento;
      await cancion.save();
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

 
// BORRAR UNA CANCION
router.delete("/api/canciones/:id", async (req, res) => {
    let filasBorradas = await db.canciones.destroy({
        where: { IdCancion: req.params.id },
    });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    }
);

module.exports = router;