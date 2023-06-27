const request = require("supertest");
const app = require("../index");

//Datos harcodeados para las pruebas de crear y modificar un auto
const autoNuevo = {
    nombre: "Auto " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    fechaLanzamiento: "2023-06-05",
    precioInicial: 52000
}

const autoModificacion = {
    idAuto: 1,
    nombre: "Auto " + (( ) => (Math.random() + 1).toString(36).substring(2))(),
    fechaLanzamiento: "2013-04-01",
    precioInicial: 45000
}

/*
describe es una función para agrupar pruebas relacionadas
it es una función para definir pruebas individuales dentro de un bloque

se utiliza request(app) para realizar una solicitud GET a la ruta especificada. Se verifican las expectativas de que el código de estado de la respuesta sea 200 (éxito) y 
que el cuerpo de la respuesta sea un array que contenga objetos con los atributos especificados

await indica que la funcion es asincronica y no continua con la ejecucion del codigo hasta que devuleva un resultado
*/
describe("GET /api/autos", () => {
it("Deberia devolver todos los autos", async () => {
    const res = await request(app).get("/api/autos");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
        expect.arrayContaining([
        expect.objectContaining({
        idAuto: expect.any(Number),
        nombre: expect.any(String),
        fechaLanzamiento: expect.any(String),
        precioInicial: expect.any(Number),
        }),
    ]),
    );
});
});

/*
Se utiliza request(app) para realizar una solicitud GET a la ruta especificada con un ID de auto específico
*/
describe("GET /api/autos/:id", () => {
it("Deberia devolver el Auto con el id 1", async () => {
    const res = await request(app).get("/api/autos/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
        expect.objectContaining({
        idAuto: expect.any(Number),
        nombre: expect.any(String),
        fechaLanzamiento: expect.any(String),
        precioInicial: expect.any(Number),
        }),
    );
});
});

/*
 se utiliza request(app) para realizar una solicitud POST a la ruta especificada, enviando el objeto autoNuevo como datos en el cuerpo de la solicitud.
*/
describe("POST /api/autos", () => {
it("Deberia devolver el auto que acabo de crear", async () => {
    const res = await request(app).post("/api/autos").send(autoNuevo);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
        expect.objectContaining({
        idAuto: expect.any(Number),
        nombre: expect.any(String),
        fechaLanzamiento: expect.any(String),
        precioInicial: expect.any(Number),
        }),
    );
});
});

/*
Se utiliza request(app) para realizar una solicitud PUT a la ruta especificada con un ID de auto específico, enviando el objeto autoModificacion 
como datos en el cuerpo de la solicitud
*/
describe("PUT /api/autos/:id", () => {
    it("Deberia devolver el auto con el id 1 modificado", async () => {
      const res = await request(app).put("/api/autos/1").send(autoModificacion);
      expect(res.statusCode).toEqual(200);
    });
});
  
/*
se utiliza request(app) para realizar una solicitud DELETE a la ruta especificada con un ID de auto específico
*/
describe("DELETE /api/autos/:id", () => {
    it("Deberia devolver el auto con el id 1 borrado", async () => {
      const res = await request(app).delete("/api/autos/1");
      expect(res.statusCode).toEqual(200);
    });
});
  