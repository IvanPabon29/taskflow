// src/pages/Tablero.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListaTablero from "../components/ListaTablero";
import SortableContextWrapper from "../components/SortableContextWrapper";
import DraggableColumn from "../components/DraggableColumn";
import "../styles/Tablero.css";

/**
 * Página que representa un tablero individual de tareas.
 * Muestra tareas organizadas en columnas tipo Kanban.
 */
const Tablero = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tablero, setTablero] = useState(null);

  // Carga el orden de las columnas desde localStorage o usa un orden por defecto
  const ordenInicial = JSON.parse(localStorage.getItem(`ordenColumnas-${id}`)) || [
    "pendiente",
    "en-progreso",
    "completada",
    "notas",
  ];
  const [ordenColumnas, setOrdenColumnas] = useState(ordenInicial);

  // Guarda el orden de las columnas en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem(`ordenColumnas-${id}`, JSON.stringify(ordenColumnas));
  }, [ordenColumnas, id]);

  // Títulos de las columnas 
  const TITULOS = {
    pendiente: "Pendiente",
    "en-progreso": "En Progreso",
    completada: "Completada",
    notas: "Notas y Referencias",
  };

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
    <div
      className="tablero"
      style={{ backgroundColor: tablero.color || "var(--color-fondo)" }}
    >
      <div className="tablero-header">
        <h2>{tablero.nombre}</h2>
        <p className="descripcion">{tablero.descripcion}</p>
        {tablero.tipo && <span className="tipo">Tipo: {tablero.tipo}</span>}
      </div>
      
      <section className="kanban-columnas">
        <SortableContextWrapper items={ordenColumnas} setItems={setOrdenColumnas}>
          {ordenColumnas.map((estado) => (
            <DraggableColumn key={estado} id={estado}>
              <ListaTablero
                titulo={TITULOS[estado]}
                tareas={tareasPorEstado[estado]}
                onAddTarea={(t) => handleAgregarTarea(estado, t)}
                onDeleteTarea={(index) => handleEliminarTarea(estado, index)}
              />
            </DraggableColumn>
          ))}
        </SortableContextWrapper>
      </section>
    </div>
  );
};

export default Tablero;
