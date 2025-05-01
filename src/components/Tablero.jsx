// TableroKanban.js
import React, { useState } from 'react';

/**
 * Componente del tablero Kanban.
 * Este ejemplo contiene columnas básicas y permite agregar tareas.
 */
const TableroKanban = () => {
  const [tareas, setTareas] = useState({
    'por-hacer': [],
    'en-proceso': [],
    'completadas': [],
  });

  const agregarTarea = (columna, tarea) => {
    setTareas((prev) => ({
      ...prev,
      [columna]: [...prev[columna], tarea],
    }));
  };

  // Aquí se podría implementar la lógica para mover tareas entre columnas
  return (
    <div className="kanban-container">
      <h2>Tablero Kanban</h2>
      <div className="columnas">
        {Object.keys(tareas).map((columna) => (
          <div key={columna} className="columna">
            <h3>{columna}</h3>
            <ul>
              {tareas[columna].map((tarea, index) => (
                <li key={index}>{tarea}</li>
              ))}
            </ul>
            <button onClick={() => agregarTarea(columna, prompt('Nueva tarea:'))}>
              Agregar Tarea
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableroKanban;
