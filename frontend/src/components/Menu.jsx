import React from "react";
import { NavLink } from "react-router-dom";


// REPRESENTA EL NAVBAR DE LA APLICACION, SE UTILIZA BOOTSTRAP PARA ESTILAR, HAY UNA LISTA DESORDENADA QUE CONTIENE LOS ELEMENTOS DE NAVEGACION(NAVLINK), AL HACER CLICK
// SE ACTIVA LA RUTA DEFINIDA EN EL REACT ROUTER


function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <a className="navbar-brand" href="/">
        <i className="fa fa-industry"></i>
        &nbsp;<i>ApisExplore</i>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/inicio">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/autos">
              Autos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/peliculas">
              Peliculas
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/canciones">
              Canciones
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/jugadores">
              Jugadores
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Menu;
