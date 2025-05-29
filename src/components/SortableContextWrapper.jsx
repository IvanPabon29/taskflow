// src/components/SortableContextWrapper.jsx
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, horizontalListSortingStrategy } from "@dnd-kit/sortable";

/**
 * Wrapper general que proporciona el contexto de drag-and-drop horizontal para columnas.
 */
const SortableContextWrapper = ({ items, setItems, children }) => {
  // Define los sensores para el contexto de arrastre
  const sensors = useSensors(useSensor(PointerSensor));

  // Maneja el evento de finalización del arrastre
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    
    // Reordena los elementos en función del arrastre
    const oldIndex = items.indexOf(active.id);
    const newIndex = items.indexOf(over.id);
    const newOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newOrder);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContextWrapper;
