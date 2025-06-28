// src/components/ListaTablero.jsx
import React, { useState } from "react";
import ModalNuevaTarea from "./ModalNuevaTarea";
import ModalEditarTarea from "./ModalEditarTarea";
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
 * @param {Function} props.onEditarTarea - Función para editar una tarea.
 * @param {Object} props.dragProps - Props del título para el arrastre de la columna.
 */

const ListaTablero = ({ titulo, tareas, onAddTarea, onDeleteTarea, onEditarTarea,dragProps }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [tareaEditando, setTareaEditando] = useState(null);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    comentarios: "", 
    estado: titulo.toLowerCase(), // Usa el título como estado inicial
    prioridad: "media",
  });

  // Abre el modal de edición con la tarea seleccionada
  const abrirModalEdicion = (tarea) => {
    setTareaEditando(tarea);
    setModalEditarAbierto(true);
  };

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
      ...formData,
      estado: titulo.toLowerCase(),
    };

    onAddTarea(nuevaTarea);
    setFormData({
      titulo: "",
      descripcion: "",
      comentarios: "",
      estado: titulo.toLowerCase(),
      prioridad: "media",
    });
    setModalAbierto(false);
  };

  // Asegura que todas las tareas tengan un ID válido antes de renderizar
  const tareasValidas = tareas.filter((t) => !!t.id);

  return (
    <>
      <div className="lista-tablero">
        <h3 className="lista-titulo" {...dragProps}>
          {titulo}
        </h3>

        <SortableContext items={tareasValidas.map((t) => t.id)}>
          <div className="lista-tareas">
            {tareasValidas.length === 0 ? (
              <p className="mensaje-vacio">(Sin tareas en esta columna)</p>
            ) : (
              tareasValidas.map((tarea, index) => (
                <DraggableTaskCard
                  key={tarea.id}
                  id={tarea.id}
                  tarea={tarea}
                  onDelete={() => onDeleteTarea(index)}
                  onEditar={() => abrirModalEdicion(tarea)}
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

      {/* Modal de creacion – ahora es global */}
      <ModalNuevaTarea
        visible={modalAbierto}
        onClose={() => setModalAbierto(false)}
        onSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
      />

      {/* Modal de edicion – ahora es global */}
      {/* Renderiza el modal de edición solo si hay tarea seleccionada */}
      {tareaEditando && (
        <ModalEditarTarea
          visible={modalEditarAbierto}
          tarea={tareaEditando}
          onClose={() => {
            setModalEditarAbierto(false);
            setTareaEditando(null);
          }}
          onGuardar={(tareaEditada) => {
            onEditarTarea(tareaEditada);
            setModalEditarAbierto(false);
            setTareaEditando(null);
          }}
        />
      )}
    </>
  );
};

export default ListaTablero;
