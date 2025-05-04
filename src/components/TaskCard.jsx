// src/components/TaskCard.jsx
import React from "react";
import "../styles/TaskCard.css";

/**
 * Componente visual para mostrar una tarea individual en el tablero.
 * @param {Object} props - Propiedades de la tarea.
 * @param {string} props.titulo - Título de la tarea.
 * @param {string} props.descripcion - Breve descripción de la tarea.
 * @param {string} [props.estado] - Estado de la tarea (ej. "pendiente", "en progreso", "completada").
 * @param {string} [props.prioridad] - Nivel de prioridad (ej. "alta", "media", "baja").
 */
const TaskCard = ({ titulo, descripcion, estado = "pendiente", prioridad = "media" }) => {
  return (
    <div className={`task-card prioridad-${prioridad} estado-${estado}`}>
      <h4 className="task-titulo">{titulo}</h4>
      <p className="task-descripcion">{descripcion}</p>
      <div className="task-meta">
        <span className="task-estado">Estado: {estado}</span>
        <span className="task-prioridad">Prioridad: {prioridad}</span>
      </div>
    </div>
  );
};

export default TaskCard;
