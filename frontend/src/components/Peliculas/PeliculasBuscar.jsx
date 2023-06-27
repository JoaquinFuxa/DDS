import React from "react";

function PeliculasBuscar ({Nombre, DuracionMaxima, setDuracionMaxima, setNombre, Buscar, Agregar}) {
    return (
    <form name="FormBusqueda">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Nombre:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              onChange={(e) => setNombre(e.target.value)}
              value={Nombre}
              maxLength="50"
              autoFocus
            />
          </div>

          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Duracion Máxima:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setDuracionMaxima(e.target.value)}
              value={DuracionMaxima}
              autoFocus
            />
          </div>
        </div>
  
        <hr />
  
        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Buscar(1) }
          >
            <i className="fa fa-search"> </i> Buscar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar() }
          >
            <i className="fa fa-plus"> </i> Agregar
          </button>
          </div>
        </div>
      </div>
    </form>
    )
  };

export default PeliculasBuscar;