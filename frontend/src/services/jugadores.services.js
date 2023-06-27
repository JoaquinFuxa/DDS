import axios from "axios";

const urlResource = "http://localhost:4000/api/jugadores";

async function Buscar(Nombre, Posicion) {
  const resp = await axios.get(urlResource, {
    params: { Nombre, Posicion},
  });
  return resp.data;
}

async function BuscarPorId(jugador) {
  const resp = await axios.get(urlResource + "/" + jugador.IdJugador);
  return resp.data;
}

async function ActivarDesactivar(jugador) {
  await axios.delete(urlResource + "/" + jugador.IdJugador);
}

async function Grabar(jugador) {
  if (jugador.IdJugador === 0) {
    await axios.post(urlResource, jugador);
  } else {
    await axios.put(urlResource + "/" + jugador.IdJugador, jugador);
  }
}

export const jugadoresService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};
