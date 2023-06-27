// acceder a la base usando aa-sqlite
const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open("./.data/trabajo-practico.db");
  //await db.open(process.env.base);

  
  //TABLA CANCIONES
  let existe = false;
  let res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'canciones'",
    []
  );

  if (res.contar > 0) existe = true;

  if (!existe) {
    await db.run(
      `CREATE table canciones( IdCancion INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL, Artista text NOT NULL, Duracion smallint NOT NULL, FechaLanzamiento date NOT NULL);`
    );
    console.log("Tabla de canciones creada!");
    await db.run(
      `insert into canciones values	
      (1,'BOHEMIAN RAPSODY','QUEEN','355','1975-10-31'),
      (2,'UNO LOS DOS','MIRANDA','233','2004-12-16'),
      (3,'XANNY','BILLIE EILISH','243','2019-03-29'),
      (4,'HIGHWAY TO HELL','AC/DC','208','1979-07-27'),
      (5,'SCREAM & SHOUT','WILL.I.AM FT. BRITNEY SPEARS','284','2012-11-19'),
      (6,'I DONT FEEL LIKE DANCIN','SCISSOR SISTERS','288','2006-09-04'),
      (7,'NUNCA QUISE','INTOXICADOS','260','2005-09-29'),
      (8,'CUANDO PASE EL TEMBLOR','SODA STEREO','230','1985-11-14'),
      (9,'BUENOS AIRES','NATHY PELUSO','240','2020-10-02'),
      (10,'SUMMER OF 69','BRYAN ADAMS','212','1985-06-17');`
    );
  }

  existe = false;
  res = null;

/*SE REALIZA UNA CONSULTA A LA TABLA AUTOS, SI DEVUELVE FILAS, SIGNIFICA QUE EXISTE Y NO HACE NADA, SI NO DEVUELVE FILAS SUPONE QUE LA TABLA NO EXISTE Y PROCEDE A CREARLA,
LUEGO INSERTA DATOS. El AWAIT indica que la función es asincrónica y espera a que se complete antes de continuar ejecutando el código.
await db.get(...): realiza una consulta en una base de datos utilizando el método get() proporcionado por el objeto db. El código espera a que la consulta 
se complete y el resultado se almacene en la variable res.
await db.run(...): ejecuta una sentencia SQL para crear una tabla y luego inserta datos en ella. El código espera a que la sentencia se complete antes de 
continuar con la siguiente línea.
*/

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'autos'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table autos( 
        idAuto INTEGER PRIMARY KEY AUTOINCREMENT, 
        nombre text NOT NULL UNIQUE, 
        fechaLanzamiento date NOT NULL, 
        precioInicial float NOT NULL);`
    );
    console.log("tabla autos creada!");
    await db.run(
      `INSERT INTO autos (idAuto, nombre, fechaLanzamiento, precioInicial) VALUES
      (1, 'FORD MUSTANG', '1964-04-17', 27155),
      (2, 'HONDA CIVIC', '1972-07-01', 21250),
      (3, 'CHEVROLET CAMARO', '1966-09-29', 25000),
      (4, 'BMW SERIE 3', '1975-05-02', 40750),
      (5, 'MERCEDES-BENZ CLASE C', '1993-01-01', 41600),
      (6, 'VOLKSWAGEN GOLF', '1974-05-01', 23195),
      (7, 'AUDI A4', '1994-01-01', 39100),
      (8, 'NISSAN ALTIMA', '1992-01-01', 24300),
      (9, 'FORD F-150', '1948-01-01', 29900),
      (10, 'LAMBORGHINI AVENTADOR', '2011-03-04', 417826)
      ;`
    );
  }

  //TABLA JUGADORES
  existe = false;
  res = null;
  
  res = await db.get("SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'jugadores'", []);
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table jugadores( 
              IdJugador INTEGER PRIMARY KEY AUTOINCREMENT
            , Nombre text NOT NULL UNIQUE
            , Edad integer
            , FechaNacimiento date
            , Posicion text                
            );`
    );
    console.log("tabla jugadores creada!");

    await db.run(
      `insert into jugadores values
      (1,'LIONEL MESSI',34,'1987-06-24','DELANTERO' ),
      (2,'CRISTIANO RONALDO',36,'1985-02-05','DELANTERO'),
      (3,'NEYMAR JR.',29,'1992-02-05','DELANTERO'),
      (4,'KEVIN DE BRUYNE',30,'1991-06-28','CENTROCAMPISTA'),
      (5,'SERGIO RAMOS',35,'1986-03-30','DEFENSOR'),
      (6,'MANUEL NEUER',35,'1986-03-27','PORTERO'),
      (7,'MOHAMED SALAH',29,'1992-06-15','DELANTERO'),
      (8,'KYLIAN MBAPPÉ',23,'1998-12-20','DELANTERO'),
      (9,'ROBERT LEWANDOWSKI',33,'1988-08-21','DELANTERO'),
      (10,'VIRGIL VAN DIJK',30,'1991-07-08','DEFENSOR')
      ;`
    );
  }

  //TABLA PELICULAS
  existe = false;
  res = null;

  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'peliculas'",
    []
  );

  if (res.contar > 0) existe = true;

  if (!existe) {
    await db.run(
      `CREATE table peliculas (
        idPelicula INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre text NOT NULL,
        director text NOT NULL,
        duracion smallint NOT NULL,
        fechaLanzamiento date NOT NULL
      );`
    );

    console.log("tabla peliculas creada!");
    
    await db.run(
      `insert into peliculas values
      (1,'TIEMPO DE VALIENTES','DAMIÁN SZIFRÓN','112','2005-09-29'),
      (2,'EVERYTHING EVERYWHERE ALL AT ONCE','DANIEL KWAN','140','2022-03-11'),
      (3,'AFTERSUN','CHARLOTTE WELLS','101','2022-11-24'),
      (4,'PORTRAIT DE LA JEUNE EN FEU','CÉLINE SCIAMMA','120','2019-09-18'),
      (5,'LUCA','ENRICO CASAROSA','95','2021-06-13'),
      (6,'ARGENTINA 1985','SANTIAGO MITRE','141','2022-09-29'),
      (7,'CAROL','TODD HAYNES','118','2015-11-27'),
      (8,'THE CONDUCTOR','MARIA PETERS','137','2018-10-25'),
      (9,'JAI PERDU MON CORPS','JÉRÉMY CLAPIN','81','2019-11-06'),
      (10,'LA LA LAND','DAMIEN CHAZELLE','129','2016-12-22'),
      (11,'COHERENCE','JAMES WARD BYRKIT','89','2015-02-13'),
      (12,'THE IMITATION GAME','MORTEN TYLDUM','113','2014-09-28')
      ;`
    );
  }


  db.close();
}

CrearBaseSiNoExiste();

module.exports =  CrearBaseSiNoExiste;