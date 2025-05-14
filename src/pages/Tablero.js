// src/pages/Tablero.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListaTablero from "../components/ListaTablero";
import "../styles/Tablero.css";

/**
 * Página que representa un tablero individual de tareas.
 * Muestra tareas organizadas en columnas tipo Kanban.
 */
const Tablero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tablero, setTablero] = useState(null);

  // Carga el tablero por ID desde localStorage
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

  // Función para actualizar tareas en una columna específica
  const actualizarTareasPorEstado = (estado, tareasActualizadas) => {
    const tableros = JSON.parse(localStorage.getItem("tableros")) || [];
    const indice = tableros.findIndex((t) => t.id === Number(id));
    if (indice === -1) return;

    // Filtra las tareas que no pertenecen al estado actual
    const nuevasTareas = tableros[indice].tareas.filter((t) => t.estado !== estado);
    tableros[indice].tareas = [...nuevasTareas, ...tareasActualizadas];
    localStorage.setItem("tableros", JSON.stringify(tableros));
    setTablero(tableros[indice]);
  };

  // Funciones para agregar y eliminar tareas
  const handleAgregarTarea = (estado, nuevaTarea) => {
    const tareaConEstado = { ...nuevaTarea, estado };
    const tareasEstado = tablero.tareas.filter((t) => t.estado === estado);
    const tareasActualizadas = [...tareasEstado, tareaConEstado];
    actualizarTareasPorEstado(estado, tareasActualizadas);
  };

  // Elimina una tarea de un estado específico
  const handleEliminarTarea = (estado, index) => {
    const tareasEstado = tablero.tareas.filter((t) => t.estado === estado);
    tareasEstado.splice(index, 1);
    actualizarTareasPorEstado(estado, tareasEstado);
  };

  if (!tablero) return null;

  // Agrupa las tareas por estado
  const tareasPorEstado = {
    pendiente: [],
    "en-progreso": [],
    completada: [],
    notas: [],
  };

  // Asigna tareas a su respectivo estado
  tablero.tareas.forEach((tarea) => {
    const estado = tarea.estado || "pendiente";
    if (estado in tareasPorEstado) {
      tareasPorEstado[estado].push(tarea);
    } else {
      tareasPorEstado.pendiente.push(tarea);
    }
  });

  return (
    <main
      className="tablero"
      style={{ backgroundColor: tablero.color || "var(--color-fondo)" }}
    >
      <div className="tablero-header">
        <h2>{tablero.nombre}</h2>
        <p className="descripcion">{tablero.descripcion}</p>
        {tablero.tipo && <span className="tipo">Tipo: {tablero.tipo}</span>}
      </div>
      
      <section className="kanban-columnas">
        <ListaTablero
          titulo="Pendiente"
          tareas={tareasPorEstado.pendiente}
          onAddTarea={(t) => handleAgregarTarea("pendiente", t)}
          onDeleteTarea={(index) => handleEliminarTarea("pendiente", index)}
        />

        <ListaTablero
          titulo="En Progreso"
          tareas={tareasPorEstado["en-progreso"]}
          onAddTarea={(t) => handleAgregarTarea("en-progreso", t)}
          onDeleteTarea={(index) => handleEliminarTarea("en-progreso", index)}
        />

        <ListaTablero
          titulo="Completada"
          tareas={tareasPorEstado.completada}
          onAddTarea={(t) => handleAgregarTarea("completada", t)}
          onDeleteTarea={(index) => handleEliminarTarea("completada", index)}
        />

        <ListaTablero
          titulo="Notas y Referencias"
          tareas={tareasPorEstado.notas}
          onAddTarea={(t) => handleAgregarTarea("notas", t)}
          onDeleteTarea={(index) => handleEliminarTarea("notas", index)}
        />
      </section>
    </main>
  );
};

export default Tablero;
