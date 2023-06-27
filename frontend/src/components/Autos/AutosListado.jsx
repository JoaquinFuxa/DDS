import React from "react";
import moment from "moment";


/*
El componente renderiza una tabla HTML, se utiliza bootstrap, es donde se muestran los resultados de la búsqueda, el encabezado contiene el nombre de las columnas
El cuerpo se renderiza con el método map, por cada elemento se renderiza una fila de la tabla, "key" ayuda a react a identificar cada fila. La cuarta columna tiene botones
que llaman a las funciones consultar, modificar o activar/descativar. Items es la lista que contiene los autos
*/
function AutosListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Fecha de Lanzamiento</th>
            <th className="text-center">Precio Inicial</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.idAuto}>
                <td>{Item.nombre}</td>
                <td className="text-end">
                  {moment(Item.fechaLanzamiento).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Item.precioInicial}</td>
                <td className="text-center text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Consultar"
                    onClick={() => Consultar(Item)}
                  >
                    <i className="fa fa-eye"></i>
                  </button>
                  <button
                    className="btn btn-sm btn-outline-primary"
                    title="Modificar"
                    onClick={() => Modificar(Item)}
                  >
                    <i className="fa fa-pencil"></i>
                  </button>
                  <button
                    className={
                      "btn btn-sm btn-outline-danger"
                    }
                    title={"Borrar"}
                    onClick={() => ActivarDesactivar(Item)}
                  >
                    <i
                      className={"fa fa-times"}
                    ></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AutosListado;