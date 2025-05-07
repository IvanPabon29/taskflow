// src/components/TableroCard.jsx
import React from "react";
import "../styles/TableroCard.css";

/**
 * Componente visual reutilizable para mostrar información de un tablero.
 * Se usa, por ejemplo, en la página "MisTableros".
 *
 * @param {Object} props
 * @param {number} props.id - ID único del tablero. * @param {string} props.nombre - Nombre del tablero.
 * @param {string} props.descripcion - Descripción breve del tablero.
 * @param {string} [props.tipo] - Tipo del tablero (personal, equipo, etc).
 * @param {string} [props.color] - Color de fondo del tablero.
 * @param {Function} props.onVer - Función que se ejecuta al hacer clic en "Ver".
 * @param {Function} props.onEliminar - Función que se ejecuta al hacer clic en "Eliminar".
 */
const TableroCard = ({ id, nombre, descripcion, tipo, color, onVer, onEliminar }) => {
  return (
    <article
      className="tablero-card"
      style={{ backgroundColor: color || "var(--color-gris-claro)" }}
    >
      <div className="tablero-card-info">
        <h3 className="tablero-card-nombre">{nombre}</h3>
        <p className="tablero-card-descripcion">{descripcion}</p>
        {tipo && <span className="tablero-card-tipo">Tipo: {tipo}</span>}
      </div>

      <div className="tablero-card-acciones">
        <button onClick={() => onVer(id)} className="btn-ver">
          Ver
        </button>
        <button onClick={() => onEliminar(id)} className="btn-eliminar">
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default TableroCard;
