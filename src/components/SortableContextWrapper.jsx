// src/components/SortableContextWrapper.jsx
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, verticalListSortingStrategy } from "@dnd-kit/sortable";

/**
 * Componente que proporciona contexto DnD. Admite estrategias y dragEnd externas.
 * 
 */
const SortableContextWrapper = ({
  items,
  setItems,
  strategy = "horizontal",
  onDragEnd: externalOnDragEnd = null,
  children,
}) => {
  const sensors = useSensors(useSensor(PointerSensor));

  // Maneja el evento de finalización del arrastre
  const handleDragEnd = (event) => {
    if (externalOnDragEnd) {
      externalOnDragEnd(event); // Para tareas
    } else {
      const { active, over } = event;
      if (!over || active.id === over.id) return;
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      if (oldIndex === -1 || newIndex === -1) return;
      setItems((prev) => {
        const newOrder = [...prev];
        const [moved] = newOrder.splice(oldIndex, 1);
        newOrder.splice(newIndex, 0, moved);
        return newOrder;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={
          strategy === "horizontal"
            ? horizontalListSortingStrategy
            : verticalListSortingStrategy
        }
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContextWrapper;
