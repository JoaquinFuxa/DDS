const express = require("express");
const cors = require('cors');

// crear servidor
const app = express();
app.use(express.json()); // para poder leer json en el body

require("./base-orm/sqlite-init");  // crear base si no existe

// ACÁ COLOCAR LAS RUTAS
app.get("/", (req, res) => {
  res.send("Trabajo Practico de Backend");
});

// Configuración de CORS: Pemirte que una URL distinta al servidor, pueda realizar solicitudes al mismo
app.use(cors());

// Se definen las rutas para que la app pueda acceder a ellas
const cancionesRouter = require("./routes/canciones");
app.use(cancionesRouter);

const jugadoresDeFutbolRouter = require("./routes/jugadores");
app.use(jugadoresDeFutbolRouter);

const peliculasRouter = require("./routes/peliculas");
app.use(peliculasRouter);

const autosRouter = require("./routes/autos");
app.use(autosRouter);

//Iniciar servidor
if (!module.parent) {
  const port = process.env.PORT || 4000; 
  app.locals.fechaInicio = new Date();
  app.listen(port, () => {
    console.log(`sitio escuchando en el puerto ${port}`);
  });
}

module.exports = app;