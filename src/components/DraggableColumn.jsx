// src/components/DraggableColumn.jsx
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

/**
 * Envuelve una columna para que sea arrastrable.
 * `id` es el identificador único de la columna
 */
const DraggableColumn = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  // Si no hay transformación, no aplica estilos de transformación
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

export default DraggableColumn;
