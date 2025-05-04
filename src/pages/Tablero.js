// src/pages/Tablero.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Tablero.css";

/**
 * Página que representa un tablero individual de tareas.
 * Carga el tablero desde localStorage según el ID de la URL.
 */
const Tablero = () => {
  const { id } = useParams(); // ID del tablero desde la URL
  const navigate = useNavigate();
  const [tablero, setTablero] = useState(null);

  // Carga el tablero desde localStorage
  useEffect(() => {
    const tableros = JSON.parse(localStorage.getItem("tableros")) || [];
    const encontrado = tableros.find((t) => t.id === Number(id));

    if (!encontrado) {
      // Si no se encuentra el tablero, redirige a 404 o home
      navigate("/listas-tareas/home");
    } else {
      setTablero(encontrado);
    }
  }, [id, navigate]);

  if (!tablero) return null; // Previene render hasta que cargue

  return (
    <main
      className="tablero"
      style={{ backgroundColor: tablero.color || "var(--color-gris-claro)" }}
    >
      <header className="tablero-header">
        <h2>{tablero.nombre}</h2>
        <p className="descripcion">{tablero.descripcion}</p>
        {tablero.tipo && <span className="tipo">Tipo: {tablero.tipo}</span>}
      </header>

      {/* Aquí se renderizarán las tareas en el futuro */}
      <section className="tablero-tareas">
        <p className="info-tareas">(Aún no hay tareas implementadas)</p>
      </section>
    </main>
  );
};

export default Tablero;
