const request = require("supertest");
const app = require("../index");

const peliculaNueva = {
  nombre: "Pelicula " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  director: "Damián Szifron",
  duracion: 130,
  fechaLanzamiento: '2004-04-04'
};

const peliculaModificacion = {
  idPelicula: 1,
  nombre: "Articulo " + (( ) => (Math.random() + 1).toString(36).substring(2))(),  // Genera un nombre aleatorio
  director: "Sofía Coppola",
  duracion: 120,
  fechaLanzamiento: '2015-02-04'
};


// test route/peliculas GET
describe("GET /api/peliculas", () => {
  it("Deberia devolver todas las películas", async () => {
    const res = await request(app).get("/api/peliculas");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          idPelicula: expect.any(Number),
          nombre: expect.any(String),
          director: expect.any(String),
          duracion: expect.any(Number),
          fechaLanzamiento: expect.any(String)
        })
      ])
    );
  });
});

// test route/peliculas/:id GET
describe("GET /api/peliculas/:id", () => {
  it("Deberia devolver la pelicula con el id 1", async () => {
    const res = await request(app).get("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idPelicula: expect.any(Number),
        nombre: expect.any(String),
        director: expect.any(String),
        duracion: expect.any(Number),
        fechaLanzamiento: expect.any(String)
      })
    );
  });
});

// test route/peliculas POST
describe("POST /api/peliculas", () => {
  it("Deberia devolver la película que acabo de crear", async () => {
    const res = await request(app).post("/api/peliculas").send(peliculaNueva);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        idPelicula: expect.any(Number),
        nombre: expect.any(String),
        director: expect.any(String),
        duracion: expect.any(Number),
        fechaLanzamiento: expect.any(String)
      })
    );
  });
});

// test route/peliculas/:id PUT
describe("PUT /api/peliculas/:id", () => {
  it("Deberia devolver la película con el id 1 modificado", async () => {
    const res = await request(app).put("/api/peliculas/1").send(peliculaModificacion);
    expect(res.statusCode).toEqual(200);
  });
});

// test route/peliculas/:id DELETE
describe("DELETE /api/peliculas/:id", () => {
  it("Deberia devolver la película con el id 1 borrado", async () => {
    const res = await request(app).delete("/api/peliculas/1");
    expect(res.statusCode).toEqual(200);

  });
});
