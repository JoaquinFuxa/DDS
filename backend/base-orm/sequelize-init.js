// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");

//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/trabajo-practico.db");

/*
Configura y define la estructura de los datos que se almacenan en la BD utilizando sequalize, un ORM(Mapeo de objetos relacionales) 
*/

// definicion del modelo de datos de Canciones
const canciones = sequelize.define(
  "canciones",
  {
    IdCancion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre de la cancion es requerido",
        },
        len: {
          args: [2, 60],
          msg: "Nombre debe ser tipo carateres, de entre 2 y 60 de longitud",
        },
      },
    },
    Artista: {
      type: DataTypes.STRING(40),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Artista de la cancion es requerido",
        },
        len: {
          args: [2, 40],
          msg: "Artista debe ser tipo carateres, de entre 2 y 40 de longitud",
        },
      },
    },
    Duracion: {
      // la duracion de la cancion es en segundos
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Duracion de la cancion es requerido",
        },
        min: {
          args: [1],
          msg: 'La duracion de la cancion no puede ser menor que 1',
        },
        max: {
          args: [32767],
          msg: 'La duracion de la cancion no puede ser mayor a 32767',
        },
      },
    },
    FechaLanzamiento: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de lanzamiento de la cancion es requerido",
        }
      }
    },  
  },
  {
    hooks: {
      beforeValidate: function (cancion, options) {
        if (typeof cancion.Nombre === "string") {
          cancion.Nombre = cancion.Nombre.toUpperCase().trim();
        }
      },
      beforeValidate: function (cancion, options) {
        if (typeof cancion.Artista === "string") {
          cancion.Artista = cancion.Artista.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

// definicion del modelo de datos de AUTOS

const autos = sequelize.define(
  'autos', 
  {
  idAuto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Nombre del Auto es requerido",
      },
      len: {
        args: [4, 50],
        msg: "Nombre debe ser tipo carateres, entre 4 y 50 de longitud",
      },
    },
    unique: {
      args: true,
      msg: "este Nombre del Auto ya existe en la tabla!",
    },
  },
  fechaLanzamiento: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "Fecha de lanzamiento es requerido",
      }
    }
  },
  precioInicial: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      notNull: {
        args: true,
        msg: "Precio del auto es requerido",
      },
      min: {
        args: [1],
        msg: 'El precio del auto no puede ser menor que 0',
      },
      max: {
        args: [99999999],
        msg: 'El precio del auto no puede ser mayor que 99999999',
      },
    }
  }
  },
  {
    hooks: {
      beforeValidate: function (auto, options) {
        if (typeof auto.nombre === "string") {
          auto.nombre = auto.nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
  );

// definicion del modelo de datos de JUGADORES
const jugadores = sequelize.define(
  "jugadores",
  {
    IdJugador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre de película es requerido",
        },
        len: {
          args: [5, 30],
          msg: "Nombre debe tener entre 5 y 30 caracteres de longitud",
        },
      }
    },
    Edad: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    FechaNacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    Posicion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    hooks: {
      beforeValidate: function (jugador, options) {
        if (typeof jugador.Nombre === "string") {
          jugador.Nombre = jugador.Nombre.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);

// definicion del modelo de datos de peliculas

const peliculas = sequelize.define(
  "peliculas",
  {
    idPelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre de película es requerido",
        },
        len: {
          args: [1, 50],
          msg: "Nombre debe ser tipo carateres, entre 1 y 50 de longitud",
        },
      }
    },
    director: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre de director es requerido",
        },
        len: {
          args: [1, 50],
          msg: "Nombre debe ser tipo carateres, entre 1 y 50 de longitud",
        },
      },
    },
    duracion: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Duración en minutos es requerido",
        },
        min: {
          args: [1],
          msg: 'La duración no puede ser menor que 0',
        },
        max: {
          args: [32767],
          msg: 'La duración no puede ser mayor que 32767',
        },
      }
    },
    fechaLanzamiento: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de lanzamiento es requerido",
        }
      }
    }
  },
  {
    hooks: {
      beforeValidate: function (pelicula, options) {
        if (typeof pelicula.nombre === "string") {
          pelicula.nombre = pelicula.nombre.toUpperCase().trim();
        }
        if (typeof pelicula.director === "string") {
          pelicula.director = pelicula.director.toUpperCase().trim();
        }
      },
    },
    timestamps: false,
  }
);



module.exports = {
  sequelize,
  canciones,
  autos,
  jugadores,
  peliculas
};