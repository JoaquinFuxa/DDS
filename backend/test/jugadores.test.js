const request = require("supertest");
const app = require("../index");

const jugadorAlta = {
  Nombre: "Jugador " + ((Math.random() + 1).toString(36).substring(2)), // Genera un nombre aleatorio
  Edad: 25,
  FechaNacimiento: "04-03-1998",
  Posicion: "Delantero",
  
};

const jugadorModificacion = {
  Nombre: "Jugador " + ((Math.random() + 1).toString(36).substring(2)), // Genera un nombre aleatorio
  Edad: 25,
  FechaNacimiento: "21-10-2002",
  Posicion: "Delantero",
  
};


// Prueba para obtener todos los jugadores de futbol
// test route/jugadoresDeFutbol GET

describe("GET /api/jugadores", () => {
    it("Debería devolver todos los jugadores de futbol", async () => {
      const res = await request(app).get("/api/jugadores");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
        
           expect.arrayContaining([
            expect.objectContaining({
              IdJugador: expect.any(Number),
              Nombre: expect.any(String),
              Edad: expect.any(Number),
              FechaNacimiento: expect.any(String),
              Posicion: expect.any(String),
                          }),
          ]),
          
        
      );
    });
});


// test route/jugadoresDeFutbol/:id GET
// Prueba para obtener un jugador de futbol por su ID

describe("GET /api/jugadores/:id", () => {
    it("Debería devolver el jugador de futbol con el ID 1", async () => {
      const res = await request(app).get("/api/jugadores/1");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
       
          expect.objectContaining({
            
            Nombre: expect.any(String),
            Edad: expect.any(Number),
            FechaNacimiento: expect.any(String),
            Posicion: expect.any(String),
                        }),
        
      );
    });
});


// test route/jugadoresDeFutbol POST  
// Prueba para crear un nuevo jugador de futbol

describe("POST /api/jugadores", () => {
    it("Debería devolver el jugador de futbol que acabo de crear", async () => {
      const res = await request(app).post("/api/jugadores").send(jugadorAlta);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(
       
          expect.objectContaining({
            IdJugador: expect.any(Number),
            Nombre: expect.any(String),
            Edad: expect.any(Number),
            FechaNacimiento: expect.any(String),
            Posicion: expect.any(String),
                        }),
      
      );
    });
});

// test route/articulos/:id PUT
// Prueba para modificar un jugador de futbol existente

describe("PUT /api/jugadores/:id", () => {
    it("Debería devolver el jugador de futbol con el id 1 modificado", async () => {
      const res = await request(app).put("/api/jugadores/1").send(jugadorModificacion);
      expect(res.statusCode).toEqual(200);
    });
});

// test route/jugadoresDeFutbol/:id DELETE
// Prueba para eliminar un jugador de futbol existente

describe("DELETE /api/jugadores/:id", () => {
    it("Debería devolver el jugador de futbol con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/jugadores/1");
      expect(res.statusCode).toEqual(200);
      
      // baja logica, no se borra realmente
      // expect(res.body).toEqual(
      //   expect.objectContaining({
      //     IdJugador: expect.any(Number),
      //     Nombre: expect.any(String),
      //     // otros atributos del jugador
      //   })
      // );
  
    });
});
  
  
  
  
  
  
  
  