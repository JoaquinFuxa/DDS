import React from "react";
import moment from "moment";

function PeliculasListado({
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
            <th className="text-center">Director</th>
            <th className="text-center">Duracion</th>
            <th className="text-center">Fecha de Lanzamiento</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.idPelicula}>
                <td>{Item.nombre}</td>
                <td className="text-end">{Item.director}</td>
                <td className="text-end">{Item.duracion}</td>
                <td className="text-end">
                  {moment(Item.fechaLanzamiento).format("DD/MM/YYYY")}
                </td>
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

export default PeliculasListado;