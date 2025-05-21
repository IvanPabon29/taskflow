import "../styles/ModalNuevaTarea.css"; 

const ModalNuevaTarea = ({ visible, onClose, onSubmit, formData, handleChange }) => {
  if (!visible) return null;

  // Maneja el clic fuera del modal para cerrarlo
  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-tarea")) {
      onClose();
    }
  };

  return (
    <div className="modal-tarea" onMouseDown={handleOutsideClick}>
      <div className="modal-contenido">
        <h3>Agregar nueva tarea</h3>
        <form onSubmit={onSubmit}>
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
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNuevaTarea;
