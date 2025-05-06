// src/pages/MisTableros.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MisTableros.css";

/**
 * Página que muestra todos los tableros creados por el usuario.
 * Permite navegar, eliminar o editar cada tablero.
 */
const MisTableros = () => {
  const [tableros, setTableros] = useState([]);
  const navigate = useNavigate();

  // Carga los tableros desde localStorage al montar el componente
  useEffect(() => {
    const tablerosGuardados = JSON.parse(localStorage.getItem("tableros")) || [];
    setTableros(tablerosGuardados);
  }, []);

  // Redirige al tablero seleccionado
  const manejarVer = (id) => {
    navigate(`/listas-tareas/tablero/${id}`);
  };

  // Elimina un tablero con confirmación
  const manejarEliminar = (id) => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este tablero?");
    if (confirmar) {
      const nuevosTableros = tableros.filter((t) => t.id !== id);
      localStorage.setItem("tableros", JSON.stringify(nuevosTableros));
      setTableros(nuevosTableros);
    }
  };

  return (
    <main className="mis-tableros">
      <h2>Mis Tableros</h2>
      {tableros.length === 0 ? (
        <p className="sin-tableros">Aún no has creado ningún tablero.</p>
      ) : (
        <div className="lista-tableros">
          {tableros.map((tablero) => (
            <article
              key={tablero.id}
              className="tarjeta-tablero"
              style={{ backgroundColor: tablero.color || "var(--color-gris-claro)" }}
            >
              <h3>{tablero.nombre}</h3>
              <p>{tablero.descripcion}</p>
              {tablero.tipo && <span className="tipo">Tipo: {tablero.tipo}</span>}
              <div className="acciones-tablero">
                <button onClick={() => manejarVer(tablero.id)}>Ver</button>
                <button className="eliminar" onClick={() => manejarEliminar(tablero.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default MisTableros;
