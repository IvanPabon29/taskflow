// src/components/ListaTablero.jsx
import React, { useState } from "react";
import ModalNuevaTarea from "./ModalNuevaTarea";
import TaskCard from "./TaskCard";
import "../styles/ListaTablero.css";

/**
 * Componente para una columna del tablero estilo Trello.
 * @param {Object} props
 * @param {string} props.titulo - Nombre de la lista/columna.
 * @param {Array} props.tareas - Lista de tareas en la columna.
 * @param {Function} props.onAddTarea - Función para agregar una tarea nueva.
 * @param {Function} props.onDeleteTarea - Función para eliminar una tarea.
 */

const ListaTablero = ({ titulo, tareas, onAddTarea, onDeleteTarea }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
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
    onAddTarea(formData);
    setFormData({
      titulo: "",
      descripcion: "",
      estado: "pendiente",
      prioridad: "media",
    });
    setModalAbierto(false);
  };

  return (
    <>
      <div className="lista-tablero">
        <h3>{titulo}</h3>

        <div className="lista-tareas">
          {tareas.length === 0 ? (
            <p className="mensaje-vacio">(Sin tareas en esta columna)</p>
          ) : (
            tareas.map((tarea, index) => (
              <TaskCard
                key={index}
                titulo={tarea.titulo}
                descripcion={tarea.descripcion}
                estado={tarea.estado}
                prioridad={tarea.prioridad}
                onDelete={() => onDeleteTarea(index)}
              />
            ))
          )}
        </div>

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
