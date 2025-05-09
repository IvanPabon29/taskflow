// src/pages/Tablero.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";
import "../styles/Tablero.css";

/**
 * Página que representa un tablero individual de tareas.
 * Permite visualizar el tablero y añadir nuevas tareas.
 */
const Tablero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tablero, setTablero] = useState(null);
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    prioridad: "media",
  });

  // Carga el tablero desde localStorage por ID
  useEffect(() => {
    const tableros = JSON.parse(localStorage.getItem("tableros")) || [];
    const encontrado = tableros.find((t) => t.id === Number(id));

    if (!encontrado) {
      // Si no se encuentra el tablero, redirige a 404 o home
      navigate("/listas-tareas/home");
    } else {
      setTablero(encontrado);
    }
  }, [id, navigate]);

  // Maneja cambios en el formulario de tarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea((prev) => ({ ...prev, [name]: value }));
  };

  // Agrega la nueva tarea al tablero
  const handleAddTarea = (e) => {
    e.preventDefault();

    const actualizados = JSON.parse(localStorage.getItem("tableros")) || [];
    const indice = actualizados.findIndex((t) => t.id === Number(id));

    if (indice === -1) return;

    const nueva = { ...nuevaTarea };
    actualizados[indice].tareas.push(nueva);
    localStorage.setItem("tableros", JSON.stringify(actualizados));
    setTablero(actualizados[indice]); // Actualiza estado local
    setNuevaTarea({ titulo: "", descripcion: "", estado: "pendiente", prioridad: "media" }); // Limpia form
  };

  /**
   * Elimina una tarea por su índice.
   * @param {number} index - Índice de la tarea a eliminar.
   */
  const handleEliminarTarea = (index) => {
    const actualizados = JSON.parse(localStorage.getItem("tableros")) || [];
    const indice = actualizados.findIndex((t) => t.id === Number(id));
    if (indice === -1) return;

    actualizados[indice].tareas.splice(index, 1); // Elimina la tarea
    localStorage.setItem("tableros", JSON.stringify(actualizados));
    setTablero(actualizados[indice]);
  };

  if (!tablero) return null;

  return (
    <main
      className="tablero"
      style={{ backgroundColor: tablero.color || "var(--color-gris-claro)" }}
    >
      <header className="tablero-header">
        <h2>{tablero.nombre}</h2>
        <p className="descripcion">{tablero.descripcion}</p>
        {tablero.tipo && <span className="tipo">Tipo: {tablero.tipo}</span>}
      </header>

      <section className="formulario-tarea">
        <h3>Agregar nueva tarea</h3>
        <form onSubmit={handleAddTarea}>
          <input
            type="text"
            name="titulo"
            value={nuevaTarea.titulo}
            onChange={handleChange}
            placeholder="Título de la tarea"
            required
          />
          <textarea
            name="descripcion"
            value={nuevaTarea.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            required
          />
          <select name="estado" value={nuevaTarea.estado} onChange={handleChange}>
            <option value="pendiente">Pendiente</option>
            <option value="en-progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>
          <select name="prioridad" value={nuevaTarea.prioridad} onChange={handleChange}>
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>
          <button type="submit">Agregar tarea</button>
        </form>
      </section>

      <section className="tablero-tareas">
        {tablero.tareas.length === 0 ? (
          <p className="info-tareas">(Aún no hay tareas añadidas)</p>
        ) : (
          tablero.tareas.map((tarea, index) => (
            <TaskCard
              key={index}
              titulo={tarea.titulo}
              descripcion={tarea.descripcion}
              estado={tarea.estado}
              prioridad={tarea.prioridad}
              onDelete={() => handleEliminarTarea(index)}
            />
          ))
        )}
      </section>
    </main>
  );
};

export default Tablero;
