// src/components/ListaTablero.jsx
import React, { useState } from "react";
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
      <button className="task-card agregar-btn" onClick={() => setModalAbierto(true)}>
        + Agregar tarea
      </button>

      {/* Modal para agregar tarea */}
      {modalAbierto && (
        <div className="modal-tarea" onClick={() => setModalAbierto(false)}>
          <div className="modal-contenido" onClick={(e) => e.stopPropagation()}>
            <h3>Agregar nueva tarea</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={formData.titulo}
                onChange={handleChange}
                required
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
                required
              />
              <select name="estado" value={formData.estado} onChange={handleChange}>
                <option value="pendiente">Pendiente</option>
                <option value="en-progreso">En progreso</option>
                <option value="completada">Completada</option>
              </select>
              <select name="prioridad" value={formData.prioridad} onChange={handleChange}>
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
              </select>
              <div className="modal-btns">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setModalAbierto(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaTablero;
