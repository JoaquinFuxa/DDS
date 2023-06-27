import axios from "axios";

const urlResource = "http://localhost:4000/api/canciones";

async function Buscar(Nombre, Artista) {
  const resp = await axios.get(urlResource, {
    params: {Nombre, Artista},
  });
  return resp.data;
}

async function BuscarPorId(cancion) {
  const resp = await axios.get(urlResource + "/" + cancion.IdCancion);
  return resp.data;
}

async function ActivarDesactivar(cancion) {
  await axios.delete(urlResource + "/" + cancion.IdCancion);
}

async function Grabar(cancion) {
  if (cancion.IdCancion === 0) {
    await axios.post(urlResource, cancion);
  } else {
    await axios.put(urlResource + "/" + cancion.IdCancion, cancion);
  }
}

export const cancionesService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
