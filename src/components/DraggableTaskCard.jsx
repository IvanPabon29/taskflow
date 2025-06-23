// src/components/DraggableTaskCard.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

/**
 * Envuelve una tarjeta de tarea para hacerla arrastrable con @dnd-kit.
 * @param {Object} props
 * @param {string} props.id - ID único de la tarjeta (usado por DnD-kit).
 * @param {Object} props.tarea - Objeto de tarea completo.
 * @param {Function} props.onDelete - Función para eliminar tarea.
 * @param {Function} props.onEdit - Función para editar tarea (abre modal).
 */
const DraggableTaskCard = ({ id, tarea, onDelete, onEdit }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCard
        tarea={tarea}
        onDelete={onDelete}
        onEdit={onEdit}
        dragHandleProps={{ ...attributes, ...listeners }} // Solo esta parte es arrastrable
      />
    </div>
  );
};

export default DraggableTaskCard;
