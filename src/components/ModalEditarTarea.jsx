// src/components/ModalEditarTarea.jsx
import React, { useState, useEffect } from "react";
import "../styles/ModalEditarTarea.css";

/**
 * Modal para editar una tarea existente.
 *
 * @param {Object} props
 * @param {boolean} props.visible - Si el modal debe mostrarse.
 * @param {Function} props.onClose - Función para cerrar el modal.
 * @param {Function} props.onGuardar - Función para guardar los cambios.
 * @param {Object} props.tarea - Tarea a editar.
 */
const ModalEditarTarea = ({ visible, onClose, onGuardar, tarea }) => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    comentarios: "",
    estado: "pendiente",
    prioridad: "media",
  });

  // Inicializa el formulario con los datos actuales de la tarea
  useEffect(() => {
    if (tarea) {
      setFormData({
        titulo: tarea.titulo || "",
        descripcion: tarea.descripcion || "",
        comentarios: tarea.comentarios || "",
        estado: tarea.estado || "pendiente",
        prioridad: tarea.prioridad || "media",
      });
    }
  }, [tarea]);

  // Maneja el cambio de cualquier campo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guarda los cambios
  const handleSubmit = (e) => {
    e.preventDefault();
    const tareaEditada = { ...tarea, ...formData };
    onGuardar(tareaEditada);
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="modal-editar-backdrop">
      <div className="modal-editar">
        <h2>Editar Tarea</h2>
        <form onSubmit={handleSubmit} className="form-editar-tarea">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />

          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
          />

          <label htmlFor="comentarios">Comentarios</label>
          <textarea
            id="comentarios"
            name="comentarios"
            value={formData.comentarios}
            onChange={handleChange}
            rows={3}
          />

          <label htmlFor="estado">Estado</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleChange}
          >
            <option value="pendiente">Pendiente</option>
            <option value="en-progreso">En Progreso</option>
            <option value="completada">Completada</option>
            <option value="notas">Notas y Referencias</option>
          </select>

          <label htmlFor="prioridad">Prioridad</label>
          <select
            id="prioridad"
            name="prioridad"
            value={formData.prioridad}
            onChange={handleChange}
          >
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>

          <div className="modal-editar-buttons">
            <button type="submit" className="guardar-btn">Guardar Cambios</button>
            <button type="button" className="cancelar-btn" onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarTarea;
