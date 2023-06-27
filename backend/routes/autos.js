const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op, ValidationError } = require("sequelize");


/* Ruta GET en el enrutador para obtener todos los autos. Se aplican filtros de búsqueda opcionales utilizando los parámetros de 
consulta (req.query). Se utiliza el modelo autos del objeto db para realizar la consulta a la base de datos y se devuelve el resultado como una respuesta JSON.
*/
router.get("/api/autos", async function (req, res, next) {
  // FILTROS DE BUSQUEDAS
  let where = {};
  if (req.query.nombre != undefined && req.query.nombre !== "") {
    where.nombre = {
      [Op.like]: "%" + req.query.nombre + "%",
    };
  }

  if (req.query.precioInicial != undefined && req.query.precioInicial !== "") {
    where.precioInicial = {
      [Op.gt]: req.query.precioInicial,
    };
  }
    let data = await db.autos.findAll({
        attributes: ["idAuto", "nombre", "fechaLanzamiento", "precioInicial"],
        where,
    });
    res.json(data);
});

/*
Se define una ruta GET en el enrutador para obtener un auto por su ID. El ID se obtiene a través de req.params.id.  Si no se encuentra ningún auto con el ID
especificado, se devuelve un estado de respuesta 404 con un mensaje de error.
*/
router.get("/api/autos/:id", async function (req, res, next) {
    let data = await db.autos.findAll({
      attributes: ["idAuto", "nombre", "fechaLanzamiento", "precioInicial"],
      where: { idAuto: req.params.id },
    });
    if (data.length > 0 ) res.json(data[0]);
    else res.status(404).json({mensaje:'No econtrado!!'})
});


/*
Se define una ruta POST en el enrutador para crear un nuevo auto. Se utiliza el método create() del modelo autos del objeto db para insertar un nuevo registro en la base de datos 
utilizando los datos proporcionados en req.body. Si la creación es exitosa, se devuelve el nuevo auto como una respuesta JSON con un estado de respuesta 200. Si ocurre
 algún error de validación, se captura la excepción ValidationError de Sequelize y se devuelve un estado de respuesta 400 con los mensajes de error de validación.
*/
router.post("/api/autos/", async (req, res) => {
try {
    let data = await db.autos.create({
    nombre: req.body.nombre,
    fechaLanzamiento: req.body.fechaLanzamiento,
    precioInicial: req.body.precioInicial,
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


/*
Se define una ruta PUT en el enrutador para actualizar un auto existente. Se utiliza el método findOne() del modelo autos del objeto db para buscar el auto por su ID
antes de actualizarlo. Si se encuentra el auto, se actualizan sus propiedades utilizando los datos proporcionados en req.body y se guarda en la base de datos utilizando 
el método save(). Si la actualización es exitosa, se devuelve un estado de respuesta 200. Si el auto no se encuentra, se devuelve un estado de respuesta 404 con un mensaje
de error. 
*/
  router.put("/api/autos/:id", async (req, res) => {
    try {
    let auto = await db.autos.findOne({
        attributes: [
            "idAuto",
            "nombre",
            "fechaLanzamiento",
            "precioInicial",
        ],
        where: { idAuto: req.params.id },
        });
      if (!auto) {
        res.status(404).json({ message: "Auto no encontrado" });
        return;
      }
      auto.idAuto = req.body.idAuto;
      auto.nombre = req.body.nombre;
      auto.fechaLanzamiento = req.body.fechaLanzamiento;
      auto.precioInicial = req.body.precioInicial;
      await auto.save();
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

 
/*
Se define una ruta DELETE en el enrutador para borrar un auto por su ID. Se utiliza el método destroy() del modelo autos del objeto db para eliminar el auto de la base de datos.
Si se borra correctamente, se devuelve un estado de respuesta 200. Si no se encuentra el auto con el ID especificado, se devuelve un estado de respuesta 404.
*/
router.delete("/api/autos/:id", async (req, res) => {
    let filasBorradas = await db.autos.destroy({
        where: { idAuto: req.params.id },
    });
        if (filasBorradas == 1) res.sendStatus(200);
        else res.sendStatus(404);
    }
);

module.exports = router;