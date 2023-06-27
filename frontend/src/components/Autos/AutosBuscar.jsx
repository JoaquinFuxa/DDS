import React from "react";

/*
renderiza un formulario que permite al usuario buscar autos por nombre y precio mínimo. También incluye botones para realizar la búsqueda y agregar nuevos autos. 
Los valores de los campos de entrada están vinculados a variables de estado y se actualizan mediante funciones proporcionadas como propiedades desde el componente "Autos".
*/

function AutosBuscar ({Nombre, PrecioMinimo, setPrecioMinimo, setNombre, Buscar, Agregar}) {
    return (
    <form name="FormBusqueda">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Nombre:</label>
          </div>

          /*
          El valor del campo de entrada está vinculado a la variable de estado "Nombre" a través de la propiedad "value".
          Cuando se modifica el campo de entrada, se llama a la función "setNombre" para actualizar el valor de "Nombre" mediante el evento onChange.
           */
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

          /*
          El valor del campo de entrada está vinculado a la variable de estado "PrecioMinimo" a través de la propiedad "value".
          Cuando se modifica el campo de entrada, se llama a la función "setPrecioMinimo" para actualizar el valor de "PrecioMinimo" mediante el evento onChange.
           */
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Precio Minimo:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="number"
              className="form-control"
              onChange={(e) => setPrecioMinimo(e.target.value)}
              value={PrecioMinimo}
              autoFocus
            />
          </div>
        </div>
  
        <hr />
  
        // Estilado con Bootstrap, el primer boton llama a la funcion buscar y el segundo a la funcion agregar al hacer click en ellos
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

export default AutosBuscar;