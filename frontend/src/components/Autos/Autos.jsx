import React, { useState } from "react";
import moment from "moment";
import AutosBuscar from "./AutosBuscar";
import AutosListado from "./AutosListado";
import AutosRegistro from "./AutosRegistro";
import { autosService } from "../../services/autos.services";
import modalDialogService from "../../services/ModalDialog.service";


function Autos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  // Estas variables de estado se utilizarán para almacenar los datos relacionados con la búsqueda y manipulación de los autos.
  const [Nombre, setNombre] = useState("");
  const [PrecioMinimo, setPrecioMinimo] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarporId (Modificar, Consultar)


  /*
  función asincrónica que realiza una búsqueda de autos utilizando el servicio "autosService.Buscar" y actualiza la variable de estado "Items" con los resultados obtenidos.
  */
  async function Buscar() {
    modalDialogService.BloquearPantalla(true);
    const data = await autosService.Buscar(Nombre, PrecioMinimo);
    modalDialogService.BloquearPantalla(false);
    setItems(data);
  }

   /*
  unción asincrónica que busca un auto por su ID utilizando el servicio "autosService.BuscarPorId". Actualiza la variable de estado "Item" con los datos del auto encontrado
  y "AccionABMC" con la acción especificada.
  */
  async function BuscarPorId(item, accionABMC) {
    const data = await autosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }
  
   /*
  "Consultar": una función que llama a "BuscarPorId" con la acción "C" (consultar) para buscar un auto y mostrar sus detalles.
  */
  function Consultar(item) {
    BuscarPorId(item, "C");
  }

   /*
  función que llama a "BuscarPorId" con la acción "M" (modificar) para buscar un auto y permitir su edición.
  */
  function Modificar(item) {
    BuscarPorId(item, "M");
  }

   /*
  Función que establece la acción "A" (agregar) y configura la variable de estado "Item" con un objeto que representa un nuevo auto vacío.
  */

  function Agregar() {
    setAccionABMC("A");
    setItem({
      idAuto: 0,
      nombre: null,
      fechaLanzamiento: moment(new Date()).format("YYYY-MM-DD"),
      precioInicial: null,
    });
  }


   /*
  función asincrónica que muestra un diálogo de confirmación utilizando el servicio "modalDialogService.Confirm". Si el usuario confirma la acción, se llama al servicio 
  "autosService.ActivarDesactivar" para activar o desactivar un auto y luego se actualiza la lista de autos mediante la función "Buscar".
  */
async function ActivarDesactivar(item) {
  modalDialogService.Confirm(
    "Esta seguro que quiere borrar el registro? (Esta acción NO se puede deshacer)",
    undefined,
    undefined,
    undefined,
    async () => {
      await autosService.ActivarDesactivar(item);
      await Buscar();
    }
  );
}


 /*
  función asincrónica que graba un auto utilizando el servicio "autosService.Grabar". Si hay algún error, muestra una alerta con el mensaje de error. Luego, actualiza 
  la lista de autos mediante la función "Buscar" y vuelve a la acción de listado mediante la función "Volver". Finalmente, muestra una alerta indicando si el registro se 
  agregó o modificó correctamente.
  */
async function Grabar(item) {
  // agregar o modificar
  try
  {
    await autosService.Grabar(item);
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


 /*
  función que establece la acción "L" (listado), lo que permite volver a la lista de autos.
  */
  // Volver/Cancelar desde Agregar/Modificar/Consultar
  function Volver() {
    setAccionABMC("L");
  }



  /*
  Se renderizan otros componentes condicionalmente, dependiendo del valor de "AccionABMC":
  Si "AccionABMC" es "L" (listado), se renderiza el componente "AutosBuscar" con diferentes propiedades pasadas como argumentos
  Si "AccionABMC" es "L" y hay elementos en "Items" (la lista de autos), se renderiza el componente "AutosListado" con las propiedades "Items", "Consultar", "Modificar" y "ActivarDesactivar".
  Si "AccionABMC" es "L" y no hay elementos en "Items", se muestra un mensaje de alerta indicando que no se encontraron registros.
  Si "AccionABMC" no es "L" (es decir, es una acción de agregar, eliminar, modificar o consultar), se renderiza el componente "AutosRegistro" con las propiedades "AccionABMC", "Item", "Grabar" y "Volver".
  */
  return (
    <div>
      <div className="tituloPagina">
        Autos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && <AutosBuscar 
        Nombre={Nombre}
        PrecioMinimo={PrecioMinimo}
        setPrecioMinimo={setPrecioMinimo}
        setNombre={setNombre}
        Buscar={Buscar}
        Agregar={Agregar}/> }

      {/* Tabla de resutados de busqueda */}
      {AccionABMC === "L" && Items?.length > 0 && <AutosListado {...{
          Items,
          Consultar,
          Modificar,
          ActivarDesactivar,
        }}/> }

      {AccionABMC === "L" && Items?.length === 0 && <div className="alert alert-info mensajesAlert">
        <i className="fa fa-exclamation-sign"></i>
        No se encontraron registros...</div> }


      {/* Formulario de alta/modificacion/consulta */}
      {AccionABMC !== "L" && <AutosRegistro {...{ AccionABMC, Item, Grabar, Volver }}/> }
    </div>
  );
}

export default Autos;