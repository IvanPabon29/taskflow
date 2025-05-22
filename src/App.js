import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registro from "./components/Registro";
import RequireAuth from "./utils/RequireAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CrearTablero from "./pages/CrearTablero";
import Tablero from "./pages/Tablero";
import MisTableros from "./pages/MisTableros";
import MiPerfil from "./pages/MiPerfil";
import About from "./pages/About";
import PoliticasPrivacidad from "./pages/PoliticasPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Ruta publica de registro, sin Header ni Footer */}
          <Route path="/listas-tareas" element={<Registro />} />

          {/* Rutas protegidas o privadas que utilizan el Layout con Header y Footer */} 
          <Route path="/listas-tareas" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route path="home" element={<Home />} />
            <Route path="crear-tablero" element={<CrearTablero />} />
            <Route path="tablero/:id" element={<Tablero />} />
            
            <Route path="mis-tableros" element={<MisTableros />} />
            <Route path="mi-perfil" element={<MiPerfil />} />
            <Route path="acerca-de" element={<About />} />
            <Route path="politicas-privacidad" element={<PoliticasPrivacidad />} />
            <Route path="terminos-condiciones" element={<TerminosCondiciones/>} />
            <Route path="contacto" element={<Contacto />} />
            
            {/* Ruta para manejar páginas no encontradas 404 dentro del Layout */}
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Ruta catch-all para redirigir a Registro si se accede a una URL no válida */}
          <Route path="*" element={<Navigate to="/listas-tareas" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;