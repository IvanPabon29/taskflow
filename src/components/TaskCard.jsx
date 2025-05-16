// src/components/TaskCard.jsx
import "../styles/TaskCard.css";

/**
 * Componente visual para mostrar una tarea individual.
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.titulo - Título de la tarea.
 * @param {string} props.descripcion - Descripción de la tarea.
 * @param {string} props.estado - Estado de la tarea.
 * @param {string} props.prioridad - Prioridad de la tarea.
 * @param {Function} props.onDelete - Función para eliminar la tarea.
 */
const TaskCard = ({
  titulo,
  descripcion,
  estado = "pendiente",
  prioridad = "media",
  onDelete,
}) => {
  return (
    <article className={`task-card card-prioridad-${prioridad} card-estado-${estado}`}>
      <div className="task-card-header">
        <h4 className="task-title">{titulo}</h4>
        {onDelete && (
          <button className="btn-delete" onClick={onDelete} title="Eliminar tarea">
            &times;
          </button>
        )}
      </div>
      <p className="task-desc">{descripcion}</p>
      <div className="task-tags">
        <span className={`estado-tag ${estado}`}>{estado}</span>
        <span className={`prioridad-tag ${prioridad}`}>{prioridad}</span>
      </div>
    </article>
  );
};

export default TaskCard;
