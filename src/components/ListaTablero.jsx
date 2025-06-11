// src/components/ListaTablero.jsx
import React, { useState } from "react";
import ModalNuevaTarea from "./ModalNuevaTarea";
import DraggableTaskCard from "./DraggableTaskCard";
import { SortableContext } from "@dnd-kit/sortable"; 
import "../styles/ListaTablero.css";

/**
 * Componente para una columna del tablero estilo Trello.
 * @param {Object} props
 * @param {string} props.titulo - Nombre de la lista/columna.
 * @param {Array} props.tareas - Lista de tareas en la columna.
 * @param {Function} props.onAddTarea - Función para agregar una tarea nueva.
 * @param {Function} props.onDeleteTarea - Función para eliminar una tarea.
 * @param {Object} props.dragProps - Props del título para el arrastre de la columna.
 */

const ListaTablero = ({ titulo, tareas, onAddTarea, onDeleteTarea,  dragProps }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: titulo.toLowerCase(), // Usa el título como estado inicial
    prioridad: "media",
  });

  // Maneja el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Maneja el envío del formulario para agregar una nueva tarea
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.descripcion.trim()) return;
    // Crea una nueva tarea con un ID único
    const nuevaTarea = {
      id: crypto.randomUUID(), // ID único para drag-and-drop
      ...formData,
      estado: titulo.toLowerCase(),
    };

    onAddTarea(nuevaTarea);
    setFormData({
      titulo: "",
      descripcion: "",
      estado: titulo.toLowerCase(),
      prioridad: "media",
    });
    setModalAbierto(false);
  };

  return (
    <>
      <div className="lista-tablero">
        <h3 className="lista-titulo" {...dragProps}>
          {titulo}
        </h3>

      <SortableContext items={tareas.map((t) => t.id)}>
          <div className="lista-tareas">
            {tareas.length === 0 ? (
              <p className="mensaje-vacio">(Sin tareas en esta columna)</p>
            ) : (
              tareas.map((tarea, index) => (
                <DraggableTaskCard
                  key={tarea.id}
                  id={tarea.id}
                  tarea={tarea}
                  onDelete={() => onDeleteTarea(index)}
                />
              ))
            )}
          </div>
        </SortableContext>

        {/* Botón para agregar tarea */}
        <button className="agregar-btn" onClick={() => setModalAbierto(true)}>
          + Agregar tarea
        </button>
      </div>

      {/* Modal NUEVO – ahora es global */}
      <ModalNuevaTarea
        visible={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />
    </>
  );
};

export default ListaTablero;
