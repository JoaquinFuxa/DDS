import axios from "axios";


/*
encapsula las operaciones de comunicación con la API de autos utilizando la biblioteca Axios, ara realizar las solicitudes HTTP correspondientes a la API y 
retornan los datos de respuesta obtenidos.
*/

// Contiene la URL base de la API autos
const urlResource = "http://localhost:4000/api/autos";


/*
La función Buscar es una función asíncrona que toma dos parámetros: nombre y precioInicial. Utiliza Axios para realizar una solicitud GET a la URL de recursos de autos 
(urlResource) con los parámetros proporcionados. Retorna los datos de respuesta obtenidos de la API.
*/
async function Buscar(nombre, precioInicial) {
  const resp = await axios.get(urlResource, {
    params: { nombre, precioInicial},
  });
  return resp.data;
}

/*
La función BuscarPorId es una función asíncrona que toma un objeto auto como parámetro. Utiliza Axios para realizar una solicitud GET a la URL de recursos de autos 
(urlResource) con el ID del auto concatenado a la URL. Retorna los datos de respuesta obtenidos de la API.
*/

async function BuscarPorId(auto) {
  const resp = await axios.get(urlResource + "/" + auto.idAuto);
  return resp.data;
}

/*
La función ActivarDesactivar es una función asíncrona que toma un objeto auto como parámetro. Utiliza Axios para realizar una solicitud DELETE a la URL de recursos de autos
 (urlResource) con el ID del auto concatenado a la URL. Esta función no retorna ningún dato.
*/
async function ActivarDesactivar(auto) {
  await axios.delete(urlResource + "/" + auto.idAuto);
}

/*
a función Grabar es una función asíncrona que toma un objeto auto como parámetro. Verifica si el idAuto del objeto es igual a 0. Si es igual a 0, utiliza Axios para realizar 
una solicitud POST a la URL de recursos de autos (urlResource) para crear un nuevo auto. Si el idAuto no es igual a 0, utiliza Axios para realizar una solicitud PUT a la URL
 de recursos de autos (urlResource) con el ID del auto concatenado a la URL para actualizar el auto existente. Esta función no retorna ningún dato.
*/
async function Grabar(auto) {
  if (auto.idAuto === 0) {
    await axios.post(urlResource, auto);
  } else {
    await axios.put(urlResource + "/" + auto.idAuto, auto);
  }
}

export const autosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
