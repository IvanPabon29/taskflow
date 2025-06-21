// src/components/TaskCard.jsx
import iconDescripcion from "../assets/icons/icon-descripcion-tarjeta.png";
import iconComentarios from "../assets/icons/icon-comentarios-tarea.png";
import iconEditarTarjeta from "../assets/icons/icon-editar-tarjeta.png";
import "../styles/TaskCard.css";

/**
 * Componente visual para mostrar una tarea individual.
 * @param {Object} props
 * @param {Object} props.tarea - Objeto con datos de la tarea.
 * @param {Function} props.onDelete - Función para eliminar la tarea.
 * @param {Function} props.onEdit - Función para abrir el modal de edición.
 */
const TaskCard = ({ tarea, onDelete, onEdit }) => {
  const { titulo, estado = "pendiente", prioridad = "media" } = tarea;

  return (
    <article className={`task-card card-prioridad-${prioridad} card-estado-${estado}`}>
      {/* Etiquetas arriba */}
      <div className="task-tags-top">
        <span className={`estado-tag ${estado}`}>{estado}</span>
        <span className={`prioridad-tag ${prioridad}`}>{prioridad}</span>
      </div>

      {/* Título */}
      <h4 className="task-title">{titulo}</h4>

      {/* Iconos de acción */}
      <div className="task-card-actions">
        <button className="task-icon-btn" onClick={onEdit} title="Descripción">
          <img src={iconDescripcion} alt="Descripción" />
        </button>
        <button className="task-icon-btn" onClick={onEdit} title="Comentarios">
          <img src={iconComentarios} alt="Comentarios" />
        </button>
        <button className="task-icon-btn" onClick={onEdit} title="Editar">
          <img src={iconEditarTarjeta} alt="Editar" />
        </button>
        {onDelete && (
          <button className="btn-delete" onClick={onDelete} title="Eliminar tarea">
            &times;
          </button>
        )}
      </div>
    </article>
  );
};

export default TaskCard;
