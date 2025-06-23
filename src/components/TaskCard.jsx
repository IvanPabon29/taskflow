// src/components/TaskCard.jsx
import React, { useState } from "react";
import iconDescripcion from "../assets/icons/icon-descripcion-tarjeta.png";
import iconComentarios from "../assets/icons/icon-comentarios-tarea.png";
import iconEditarTarjeta from "../assets/icons/icon-editar-tarjeta.png";
import ModalEditarTarea from "./ModalEditarTarea";
import "../styles/TaskCard.css";

/**
 * Componente visual para mostrar una tarea individual.
 * Contiene título, etiquetas y opciones para editar, comentar o ver descripción.
 * @param {Object} props
 * @param {Object} props.tarea - Objeto con los datos de la tarea.
 * @param {Function} props.onDelete - Función para eliminar la tarea.
 * @param {Function} props.onEditar - Función para actualizar la tarea editada.
 */
const TaskCard = ({ tarea, onDelete, onEditar }) => {
  const [modalAbierto, setModalAbierto] = useState(false);

  if (!tarea) return null;

  const { titulo, estado, prioridad } = tarea;

  // Función para abrir el modal de edición
  const abrirModal = () => {
    setModalAbierto(true);
  };

  return (
    <>
      <article className={`task-card card-prioridad-${prioridad} card-estado-${estado}`}>
        {/* Etiquetas en la parte superior */}
        <div className="task-tags-top">
          <span className={`estado-tag ${estado}`}>{estado}</span>
          <span className={`prioridad-tag ${prioridad}`}>{prioridad}</span>
        </div>

        {/* Título */}
        <div className="task-card-header">
          <h4 className="task-title">{titulo}</h4>
        </div>

        {/* Íconos de opciones */}
        <div className="task-card-actions">
          <img
            src={iconDescripcion}
            alt="Descripción"
            className="task-icon"
            title="Ver/Editar Descripción"
            onClick={abrirModal}
          />
          <img
            src={iconComentarios}
            alt="Comentarios"
            className="task-icon"
            title="Ver/Agregar Comentarios"
            onClick={abrirModal}
          />
          <img
            src={iconEditarTarjeta}
            alt="Editar"
            className="task-icon"
            title="Editar Tarea"
            onClick={abrirModal}
          />
          
          {/* Botón de eliminar tarea */}
          {onDelete && (
            <button className="btn-delete" onClick={onDelete} title="Eliminar tarea">
              &times;
            </button>
          )}
        </div>
      </article>

      {/* Modal para edición de la tarea */}
      {modalAbierto && (
        <ModalEditarTarea
          tarea={tarea}
          onClose={() => setModalAbierto(false)}
          onGuardar={onEditar}
        />
      )}
    </>
  );
};

export default TaskCard;
