// src/components/DraggableColumn.jsx
import React from "react";
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

  // Clonamos el children (ListaTablero) para insertar los listeners en el h3
  const clonedChild = React.cloneElement(children, {
    dragProps: { ...attributes, ...listeners },
  });

  return (
     <div ref={setNodeRef} style={style}>
      {clonedChild}
    </div>
  );
};

export default DraggableColumn;
