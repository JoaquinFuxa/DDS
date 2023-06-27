const request = require("supertest");
const app = require("../index");


const cancionNueva = {
    Nombre: "Cancion " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    Artista: "Artista " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    Duracion: Math.floor(Math.random() * 32767) + 1,
    FechaLanzamiento: "2022-04-08",
}

const cancionModificacion = {
    IdCancion: 1,
    Nombre: "Cancion " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    Artista: "Artista " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    Duracion: Math.floor(Math.random() * 32767) + 1,
    FechaLanzamiento: "2023-11-20",
}

// test routes/canciones get
describe("GET /api/canciones", () => {
it("Deberia devolver todas las canciones", async () => {
    const res = await request(app).get("/api/canciones");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
        expect.arrayContaining([
        expect.objectContaining({
        IdCancion: expect.any(Number),
        Nombre: expect.any(String),
        Artista: expect.any(String),
        Duracion: expect.any(Number),
        FechaLanzamiento: expect.any(String),
        }),
    ]),
    );
});
});

// test routes/canciones/:id GET
describe("GET /api/canciones/:id", () => {
it("Deberia devolver la cancion con el id 1", async () => {
    const res = await request(app).get("/api/canciones/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
        expect.objectContaining({
        IdCancion: expect.any(Number),
        Nombre: expect.any(String),
        Artista: expect.any(String),
        Duracion: expect.any(Number),
        FechaLanzamiento: expect.any(String),
        }),
    );
});
});

// test routes/autos POST
describe("POST /api/canciones", () => {
it("Deberia devolver la cancion que acabamos de crear", async () => {
    const res = await request(app).post("/api/canciones").send(cancionNueva);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
        expect.objectContaining({
            IdCancion: expect.any(Number),
            Nombre: expect.any(String),
            Artista: expect.any(String),
            Duracion: expect.any(Number),
            FechaLanzamiento: expect.any(String),
        }),
    );
});
});

// test routes/canciones/:id PUT
describe("PUT /api/canciones/:id", () => {
    it("Deberia devolver la cancion con el id 1 modificado", async () => {
      const res = await request(app).put("/api/canciones/1").send(cancionModificacion);
      expect(res.statusCode).toEqual(200);
    });
});
  
// test routes/canciones/:id DELETE
describe("DELETE /api/canciones/:id", () => {
    it("Deberia devolver la cancion con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/canciones/1");
      expect(res.statusCode).toEqual(200);
    });
});
