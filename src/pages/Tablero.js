// src/pages/Tablero.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListaTablero from "../components/ListaTablero";
import DraggableColumn from "../components/DraggableColumn";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, horizontalListSortingStrategy } from "@dnd-kit/sortable";
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

  const sensors = useSensors(useSensor(PointerSensor));

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

  // Actualiza las tareas del tablero en localStorage
  const actualizarTareas = (tareasActualizadas) => {
    const tableros = JSON.parse(localStorage.getItem("tableros")) || [];
    const indice = tableros.findIndex((t) => t.id === Number(id));
    if (indice === -1) return;
    tableros[indice].tareas = tareasActualizadas;
    localStorage.setItem("tableros", JSON.stringify(tableros));
    setTablero(tableros[indice]);
  };

  // Agrega una nueva tarea a un estado específico
  const handleAgregarTarea = (nuevaTarea) => {
    const tareasActualizadas = [...tablero.tareas, nuevaTarea];
    actualizarTareas(tareasActualizadas);
  };

  // Elimina una tarea de un estado específico
  const handleEliminarTarea = (estado, index) => {
    const tareasEstado = tablero.tareas.filter((t) => t.estado === estado);
    const tareasOtras = tablero.tareas.filter((t) => t.estado !== estado);
    tareasEstado.splice(index, 1);
    actualizarTareas([...tareasOtras, ...tareasEstado]);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    // Reordenar columnas
    if (ordenColumnas.includes(active.id) && ordenColumnas.includes(over.id)) {
      const oldIndex = ordenColumnas.indexOf(active.id);
      const newIndex = ordenColumnas.indexOf(over.id);
      const nuevoOrden = arrayMove(ordenColumnas, oldIndex, newIndex);
      setOrdenColumnas(nuevoOrden);
      return;
    }

    // Mover tarjetas entre columnas
    const tareas = [...tablero.tareas];
    const tareaMovida = tareas.find((t) => t.id === active.id);
    if (!tareaMovida) return;

    const nuevaColumna = obtenerEstadoDesdeId(over.id);
    if (!nuevaColumna) return;

    // Cambiar estado y actualizar
    tareaMovida.estado = nuevaColumna;
    actualizarTareas(tareas);
  };

  // Función para obtener el estado de una columna a partir de su ID
  const obtenerEstadoDesdeId = (id) => {
    for (const estado of ordenColumnas) {
      if (id.startsWith(estado)) return estado;
    }
    return null;
  };

  if (!tablero) return null;

  // Agrupar tareas por estado
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
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={ordenColumnas} strategy={horizontalListSortingStrategy}>
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
          </SortableContext>
        </DndContext>
      </section>
    </div>
  );
};

export default Tablero;
