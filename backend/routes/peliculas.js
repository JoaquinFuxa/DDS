const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


// OBTENER TODAS LAS PELICULAS
router.get("/api/peliculas", async function (req, res, next) {
  // FILTROS DE BUSQUEDAS
  let where = {};
  if (req.query.nombre != undefined && req.query.nombre !== "") {
    where.nombre = {
      [Op.like]: "%" + req.query.nombre + "%",
    };
  }

  if (req.query.duracion != undefined && req.query.duracion !== "") {
    where.duracion = {
      [Op.lt]: req.query.duracion,
    };
  }
    let data = await db.peliculas.findAll({
        attributes: ["idPelicula", "nombre", "director", "duracion", "fechaLanzamiento"],
        where,
    });
    res.json(data);
});

// OBTENER PELICULA POR ID
router.get("/api/peliculas/:id", async function (req, res, next) {
    let data = await db.peliculas.findAll({
      attributes: ["idPelicula", "nombre", "director", "duracion", "fechaLanzamiento"],
      where: { idPelicula: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
});


// CREAR UNA PELICULA NUEVA
router.post("/api/peliculas/", async (req, res) => {
try {
    let data = await db.peliculas.create({
    nombre: req.body.nombre,
    director: req.body.director,
    duracion: req.body.duracion,
    fechaLanzamiento: req.body.fechaLanzamiento,
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


// ACTUALIZAR UNA PELICULA EXISTENTE
  router.put("/api/peliculas/:id", async (req, res) => {
    try {
    let pelicula = await db.peliculas.findOne({
        attributes: [
            "idPelicula",
            "nombre",
            "director",
            "duracion",
            "fechaLanzamiento"
        ],
        where: { idPelicula: req.params.id },
        });
      if (!pelicula) {
        res.status(404).json({ message: "Pelicula no encontrado" });
        return;
      }
      pelicula.idPelicula = req.body.idPelicula;
      pelicula.nombre = req.body.nombre;
      pelicula.director = req.body.director;
      pelicula.duracion = req.body.duracion;
      pelicula.fechaLanzamiento = req.body.fechaLanzamiento;
      await pelicula.save();
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

 
// BORRAR UNA PELICULA
router.delete("/api/peliculas/:id", async (req, res) => {
    let filasBorradas = await db.peliculas.destroy({
        where: { idPelicula: req.params.id },
    });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    }
);

module.exports = router;