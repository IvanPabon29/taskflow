// src/App.js
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registro from "./components/Registro";
import RequireAuth from "./utils/RequireAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CrearTablero from "./pages/CrearTablero";
import Tablero from "./pages/Tablero";
import MisTableros from "./pages/MisTableros";
import Estadisticas from "./pages/Estadisticas";
import MiPerfil from "./pages/MiPerfil";
import About from "./pages/About";
import PoliticasPrivacidad from "./pages/PoliticasPrivacidad";
import TerminosCondiciones from "./pages/TerminosCondiciones";
import Contacto from "./pages/Contacto";
import NotFound from "./pages/NotFound";

function App() {
  // Verifica si ya hay un usuario registrado
  const usuarioRegistrado = JSON.parse(localStorage.getItem("userData"));

  return (
    <div className="App">
      <BrowserRouter basename="/taskflow">
        <Routes>

          {/* Ruta raíz dinámica: Redirige a home si hay usuario, o muestra Registro si no */}
          <Route
            path="/"
            element={
              usuarioRegistrado ? (
                <Navigate to="/home" replace />
              ) : (
                <Registro />
              )
            }
          />

          {/* Rutas protegidas que usan Layout (Header + Footer) */}
          <Route
            path="/"
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="crear-tablero" element={<CrearTablero />} />
            <Route path="tablero/:id" element={<Tablero />} />
            <Route path="mis-tableros" element={<MisTableros />} />
            <Route path="estadisticas" element={<Estadisticas />} />
            <Route path="estadisticas/:id" element={<Estadisticas />} />
            <Route path="mi-perfil" element={<MiPerfil />} />
            <Route path="acerca-de" element={<About />} />
            <Route path="politicas-privacidad" element={<PoliticasPrivacidad />} />
            <Route path="terminos-condiciones" element={<TerminosCondiciones />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Ruta catch-all final para redireccionar cualquier otra ruta inválida */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
