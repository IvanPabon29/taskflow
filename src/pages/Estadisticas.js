// src/pages/Estadisticas.js
import React, { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto"; // Necesario para Chart.js
import "../styles/Estadisticas.css";

/**
 * Página de estadísticas del tablero.
 * Muestra gráficos e información general del progreso de las tareas.
 */
const Estadisticas = () => {
  const [tableros, setTableros] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("tableros")) || [];
    setTableros(data);
  }, []);

  // Obtiene estadísticas globales
  const totalTareas = tableros.reduce((total, t) => total + t.tareas.length, 0);
  const tareasPorEstado = {
    pendiente: 0,
    "en-progreso": 0,
    completada: 0,
    notas: 0,
  };

  tableros.forEach((tablero) => {
    tablero.tareas.forEach((tarea) => {
      tareasPorEstado[tarea.estado] = (tareasPorEstado[tarea.estado] || 0) + 1;
    });
  });

  const progresoGeneral = totalTareas
    ? Math.round((tareasPorEstado.completada / totalTareas) * 100)
    : 0;

  return (
    <div className="estadisticas-container">
      <h2>📊 Estadísticas Generales</h2>

      <section className="estadisticas-resumen">
        <div className="dato">
          <strong>Total de Tareas:</strong> {totalTareas}
        </div>
        <div className="dato pendiente">
          <strong>Pendientes:</strong> {tareasPorEstado.pendiente}
        </div>
        <div className="dato progreso">
          <strong>En Progreso:</strong> {tareasPorEstado["en-progreso"]}
        </div>
        <div className="dato completada">
          <strong>Completadas:</strong> {tareasPorEstado.completada}
        </div>
        <div className="dato notas">
          <strong>Notas:</strong> {tareasPorEstado.notas}
        </div>
        <div className="dato avance">
          <strong>Progreso General:</strong> {progresoGeneral}%
        </div>
      </section>

      <section className="estadisticas-graficos">
        <div className="grafico">
          <h3>Distribución de tareas</h3>
          <Pie
            data={{
              labels: ["Pendientes", "En Progreso", "Completadas", "Notas"],
              datasets: [
                {
                  label: "Tareas",
                  data: [
                    tareasPorEstado.pendiente,
                    tareasPorEstado["en-progreso"],
                    tareasPorEstado.completada,
                    tareasPorEstado.notas,
                  ],
                  backgroundColor: ["#f39c12", "#3498db", "#2ecc71", "#9b59b6"],
                },
              ],
            }}
          />
        </div>

        <div className="grafico">
          <h3>Progreso por estado</h3>
          <Bar
            data={{
              labels: ["Pendientes", "En Progreso", "Completadas", "Notas"],
              datasets: [
                {
                  label: "Cantidad",
                  data: [
                    tareasPorEstado.pendiente,
                    tareasPorEstado["en-progreso"],
                    tareasPorEstado.completada,
                    tareasPorEstado.notas,
                  ],
                  backgroundColor: "#2c3e50",
                },
              ],
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Estadisticas;
