import React, { useState } from "react";
import moment from "moment";
import JugadoresBuscar from "./JugadoresBuscar";
import JugadoresListado from "./JugadoresListado";
import JugadoresRegistro from "./JugadoresRegistro";
import { jugadoresService } from "../../services/jugadores.services";
import modalDialogService from "../../services/ModalDialog.service";


function Jugadores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");

  const [Posicion, setPosicion] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  async function Buscar() {
    modalDialogService.BloquearPantalla(true);
    const data = await jugadoresService.Buscar(Nombre, Posicion);
    modalDialogService.BloquearPantalla(false);
    setItems(data);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await jugadoresService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  
  function Consultar(item) {
    BuscarPorId(item, "C");
  }
  function Modificar(item) {
    BuscarPorId(item, "M");
  }

  function Agregar() {
    setAccionABMC("A");
    setItem({
      IdJugador: 0,
      Nombre: null,
      Edad: null,
      FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
      Posicion: null,
    });
  }

async function ActivarDesactivar(item) {
  modalDialogService.Confirm(
    "Esta seguro que quiere borrar el registro? (Esta acción NO se puede deshacer)",
    undefined,
    undefined,
    undefined,
    async () => {
      await jugadoresService.ActivarDesactivar(item);
      await Buscar();
    }
  );
}

async function Grabar(item) {
  // agregar o modificar
  try
  {
    await jugadoresService.Grabar(item);
  }
  catch (error)
  {
    alert(error?.response?.data?.message ?? error.toString())
    return;
  }
  await Buscar();
  Volver();

  setTimeout(() => {
    alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );
  }, 0);
}

  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Jugadores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <JugadoresBuscar 
        Nombre={Nombre}
        Posicion={Posicion}
        setPosicion={setPosicion}
        setNombre={setNombre}
        Buscar={Buscar}
        Agregar={Agregar}/> }

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && <JugadoresListado {...{
          Items,
          Consultar,
          Modificar,
          ActivarDesactivar,
        }}/> }

      {AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...</div> }


      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && <JugadoresRegistro {...{ AccionABMC, Item, Grabar, Volver }}/> }
    </div>
  );
}

export default Jugadores;