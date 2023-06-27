import React from 'react';
import { Link } from "react-router-dom";

/*
el componente Link se utiliza para crear enlaces entre diferentes rutas de una aplicación
*/

function Inicio() {
  return (
    <div className="mt-4 p-5 rounded inicio" style={{ backgroundColor: "lightgray" }}>
      <h1>Trabajo Práctico Desarrollo de software</h1>
      <p>Aplicar los temas y estructuras vistas en clase para implementar un proyecto con React, Ruteo y conexión al Backend con Axios</p>
      <p>
        Backend: NodeJs, Express , WebApiRest, Swagger, Sequelize, Sqlite
        multiples capas en Javascript/Typescript.
      </p>
      <p>
        Frontend: Single Page Aplication, HTML, CSS, Bootstrap, NodeJs,
        Javascript y React.
      </p>

      <div className="links-apis">
        <Link to="/autos" className="btn btn-lg btn-primary">
            <i className="fa fa-search"> </i>  Ver Autos
        </Link>
        <Link to="/peliculas" className="btn btn-lg btn-primary">
            <i className="fa fa-search"> </i>  Ver Películas
        </Link>
        <Link to="/canciones" className="btn btn-lg btn-primary">
            <i className="fa fa-search"> </i>  Ver Canciones
        </Link>
        <Link to="/jugadores" className="btn btn-lg btn-primary">
            <i className="fa fa-search"> </i>  Ver Jugadores
        </Link>
      </div>
    </div>
  );
}
export default Inicio;
