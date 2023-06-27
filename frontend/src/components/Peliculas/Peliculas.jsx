import React, { useState } from "react";
import moment from "moment";
import PeliculasBuscar from "./PeliculasBuscar";
import PeliculasListado from "./PeliculasListado";
import PeliculasRegistro from "./PeliculasRegistro";
import { peliculasService } from "../../services/peliculas.services";
import modalDialogService from "../../services/ModalDialog.service";


function Peliculas() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");

  const [DuracionMaxima, setDuracionMaxima] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)

  async function Buscar() {
    modalDialogService.BloquearPantalla(true);
    const data = await peliculasService.Buscar(Nombre, DuracionMaxima);
    modalDialogService.BloquearPantalla(false);
    setItems(data);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await peliculasService.BuscarPorId(item);
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
      idPelicula: 0,
      nombre: null,
      director: null,
      duracion: null,
      fechaLanzamiento: moment(new Date()).format("YYYY-MM-DD"),
    });
  }

async function ActivarDesactivar(item) {
  modalDialogService.Confirm(
    "Esta seguro que quiere borrar el registro? (Esta acción NO se puede deshacer)",
    undefined,
    undefined,
    undefined,
    async () => {
      await peliculasService.ActivarDesactivar(item);
      await Buscar();
    }
  );
}

async function Grabar(item) {
  // agregar o modificar
  try
  {
    await peliculasService.Grabar(item);
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
        Peliculas <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <PeliculasBuscar 
        Nombre={Nombre}
        DuracionMaxmia={DuracionMaxima}
        setDuracionMaxima={setDuracionMaxima}
        setNombre={setNombre}
        Buscar={Buscar}
        Agregar={Agregar}/> }

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && <PeliculasListado {...{
          Items,
          Consultar,
          Modificar,
          ActivarDesactivar,
        }}/> }

      {AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...</div> }


      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && <PeliculasRegistro {...{ AccionABMC, Item, Grabar, Volver }}/> }
    </div>
  );
}

export default Peliculas;