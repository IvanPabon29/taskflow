// src/pages/MisTableros.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableroCard from "../components/TableroCard"; 
import IconMisTableros from "../assets/icons/icon-mis-tableros.png";
import "../styles/MisTableros.css";

/**
 * Página que muestra todos los tableros creados por el usuario.
 * Usa el componente <TableroCard /> para mostrar cada tablero individualmente.
 * Permite ver y eliminar cada tablero.
 */
const MisTableros = () => {
  const [tableros, setTableros] = useState([]);
  const navigate = useNavigate();

  // Cargar los tableros desde localStorage cuando se monta el componente
  useEffect(() => {
    const tablerosGuardados = JSON.parse(localStorage.getItem("tableros")) || [];
    setTableros(tablerosGuardados);
  }, []);

  /**
   * Redirige a la vista del tablero seleccionado.
   * @param {number} id - ID del tablero a mostrar.
   */
  const manejarVer = (id) => {
    navigate(`/tablero/${id}`);
  };

  /**
   * Elimina un tablero tras confirmación.
   * @param {number} id - ID del tablero a eliminar.
   */
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
      <h2 className="titulo-mis-tableros">
        <img src={IconMisTableros} alt="Icono Mis Tableros" className="icono-titulo" />
        Mis Tableros
      </h2>
      {tableros.length === 0 ? (
        <p className="sin-tableros">Aún no has creado ningún tablero.</p>
      ) : (
        <div className="lista-tableros">
          {tableros.map((tablero) => (
            <TableroCard
              key={tablero.id}
              id={tablero.id}
              nombre={tablero.nombre}
              descripcion={tablero.descripcion}
              tipo={tablero.tipo}
              color={tablero.color}
              onVer={manejarVer}
              onEliminar={manejarEliminar}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default MisTableros;
