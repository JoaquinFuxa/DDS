import React, { useState } from "react";
import moment from "moment";
import CancionesBuscar from "./CancionesBuscar";
import CancionesListado from "./CancionesListado";
import CancionesRegistro from "./CancionesRegistro";
import { cancionesService } from "../../services/canciones.services";
import modalDialogService from "../../services/ModalDialog.service";


function Canciones() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");

  const [Artista, setArtista] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  async function Buscar() {
    modalDialogService.BloquearPantalla(true);
    const data = await cancionesService.Buscar(Nombre, Artista);
    modalDialogService.BloquearPantalla(false);
    setItems(data);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await cancionesService.BuscarPorId(item);
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
      IdCancion: 0,
      Nombre: null,
      Artista: null,
      Duracion: 0,
      FechaLanzamiento: moment(new Date()).format("YYYY-MM-DD"),
    });
  }

async function ActivarDesactivar(item) {
  modalDialogService.Confirm(
    "Esta seguro que quiere borrar el registro? (Esta acción NO se puede deshacer)",
    undefined,
    undefined,
    undefined,
    async () => {
      await cancionesService.ActivarDesactivar(item);
      await Buscar();
    }
  );
}

async function Grabar(item) {
  // agregar o modificar
  try
  {
    await cancionesService.Grabar(item);
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
        Canciones <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <CancionesBuscar 
        Nombre={Nombre}
        Artista={Artista}
        setArtista={setArtista}
        setNombre={setNombre}
        Buscar={Buscar}
        Agregar={Agregar}/> }

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && <CancionesListado {...{
          Items,
          Consultar,
          Modificar,
          ActivarDesactivar,
        }}/> }

      {AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...</div> }


      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && <CancionesRegistro {...{ AccionABMC, Item, Grabar, Volver }}/> }
    </div>
  );
}

export default Canciones;