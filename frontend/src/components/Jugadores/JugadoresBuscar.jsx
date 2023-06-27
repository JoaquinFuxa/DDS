import React from "react";

function JugadoresBuscar ({Nombre, Posicion, setPosicion, setNombre, Buscar, Agregar}) {
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
            <label className="col-form-label">Posicion:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <select
              className="form-select"
              onChange={(e) => setPosicion(e.target.value)}
              value={Posicion}
              autofocus>
                    <option value="">TODOS</option>
                    <option value="PORTERO">PORTERO</option>
                    <option value="DEFENSOR">DEFENSOR</option>
                    <option value="CENTROCAMPISTA">CENTROCAMPISTA</option>
                    <option value="DELANTERO">DELANTERO</option>
          </select>
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

export default JugadoresBuscar;