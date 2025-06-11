// src/components/DraggableTaskCard.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./TaskCard";

/**
 * Envuelve una tarjeta de tarea para hacerla arrastrable con @dnd-kit.
 */
const DraggableTaskCard = ({ id, tarea, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard
        titulo={tarea.titulo}
        descripcion={tarea.descripcion}
        estado={tarea.estado}
        prioridad={tarea.prioridad}
        onDelete={onDelete}
      />
    </div>
  );
};

export default DraggableTaskCard;
