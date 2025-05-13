// src/components/ListaTablero.jsx
import React from "react";
import TaskCard from "./TaskCard";
import "../styles/ListaTablero.css";

/**
 * Componente que representa una lista/columna de tareas dentro del tablero estilo Kanban.
 *
 * @param {string} titulo - Título de la lista.
 * @param {Array} tareas - Arreglo de objetos con las tareas de esta columna.
 * @param {Function} onAddTarea - Función para agregar una nueva tarea.
 * @param {Function} onDeleteTarea - Función para eliminar una tarea específica.
 */
const ListaTablero = ({ titulo, tareas = [], onAddTarea, onDeleteTarea }) => {
  return (
    <div className="lista-tablero">
      <div className="lista-header">
        <h3>{titulo}</h3>
      </div>

      <div className="contenedor-tareas">
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

        {/* Botón para agregar nueva tarea */}
        <TaskCard esAgregar={true} onAdd={onAddTarea} />
      </div>
    </div>
  );
};

export default ListaTablero;
