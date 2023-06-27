import React from "react";
import moment from "moment";

function JugadoresListado({
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
            <th className="text-center">Edad</th>
            <th className="text-center">Fecha de nacimiento</th>
            <th className="text-center">Posición</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdJugador}>
                <td className="text-end">{Item.Nombre}</td>
                <td className="text-end">{Item.Edad}</td>
                <td className="text-end">
                  {moment(Item.FechaNacimiento).format("DD/MM/YYYY")}
                </td>
                <td className="text-end">{Item.Posicion}</td>
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

export default JugadoresListado;