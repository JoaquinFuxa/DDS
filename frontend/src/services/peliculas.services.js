import axios from "axios";

const urlResource = "http://localhost:4000/api/peliculas";

async function Buscar(nombre, duracion) {
  const resp = await axios.get(urlResource, {
    params: { nombre, duracion },
  });
  return resp.data;
}

async function BuscarPorId(pelicula) {
  const resp = await axios.get(urlResource + "/" + pelicula.idPelicula);
  return resp.data;
}

async function ActivarDesactivar(pelicula) {
  await axios.delete(urlResource + "/" + pelicula.idPelicula);
}

async function Grabar(pelicula) {
  if (pelicula.idPelicula === 0) {
    await axios.post(urlResource, pelicula);
  } else {
    await axios.put(urlResource + "/" + pelicula.idPelicula, pelicula);
  }
}

export const peliculasService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
