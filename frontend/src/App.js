import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Inicio from "./components/Inicio";
import Menu from "./components/Menu"
import Footer from "./components/Footer";
import Autos from "./components/Autos/Autos";
import Peliculas from "./components/Peliculas/Peliculas";
import Canciones from "./components/Canciones/Canciones";
import Jugadores from "./components/Jugadores/Jugadores";
import ModalDialog from "./components/ModalDialog";


// SE IMPORTAN LOS COMPONENTES, SE ENVUELVE TODO EL CONTENIDO EN EL BROWSERROUTER PARA HABILITAR EL ENRUTAMIENTO, SE UTILIZAN LAS RUTAS PARA RENDERIZAR UN COMPONENTE DEPENDIENDO 
// DE LA RUTA DONDE SE ENCUNTRE PARADO EL USUARIO. HAY UNA RUTA POR DEFECTO

function App() {
  return (
    <>
         <BrowserRouter>
          <ModalDialog/>
          <Menu />
          <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />

              <Route path="/autos" element={<Autos />} />
              <Route path="/peliculas" element={<Peliculas />} />
              <Route path="/canciones" element={<Canciones />} />
              <Route path="/jugadores" element={<Jugadores />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
    </>
  );
}

export default App;
