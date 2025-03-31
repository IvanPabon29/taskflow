import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Registro from "./components/Registro";
import RequireAuth from "./utils/RequireAuth";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Ruta publica de registro, sin Header ni Footer */}
          <Route path="/listas-tareas" element={<Registro />} />

          {/* Rutas protegidas o privadas que utilizan el Layout con Header y Footer */} 
          <Route path="/" element={<RequireAuth><Layout /></RequireAuth>}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            
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