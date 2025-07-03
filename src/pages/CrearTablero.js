// src/pages/CrearTablero.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CrearTablero.css";

/**
 * Página para crear un nuevo tablero de tareas.
 * Almacena los datos en localStorage bajo la clave "tableros".
 */
const CrearTablero = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    color: "#777777", // Color por defecto
    tipo: "",
    tareasIniciales: "",
  });

  const navigate = useNavigate();

  // Maneja cambios de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Guarda el nuevo tablero en localStorage
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevosTableros = JSON.parse(localStorage.getItem("tableros")) || [];

    // Procesar tareas iniciales separadas por comas
    const tareas = formData.tareasIniciales
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .map((titulo) => ({
        id: crypto.randomUUID(),
        titulo,
        descripcion: "",
        comentarios: "",
        estado: "pendiente",
        prioridad: "media",
      }));

    const nuevoTablero = {
      id: Date.now(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      color: formData.color,
      tipo: formData.tipo,
      tareas,
    };
    
    nuevosTableros.push(nuevoTablero);
    localStorage.setItem("tableros", JSON.stringify(nuevosTableros));

    // Redirige al tablero recién creado
    navigate(`/tablero/${nuevoTablero.id}`);
  };

  return (
    <main className="crear-tablero">
      <h2>Crear nuevo tablero</h2>
      <form onSubmit={handleSubmit} className="crear-tablero-form">
        <label>
          Nombre del tablero:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej. Proyecto X"
          />
        </label>

        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe brevemente el propósito del tablero"
            required
          />
        </label>

        <label>
          Color del tablero:
          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Tipo de tablero (opcional):
          <select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
          >
            <option value="">Seleccionar</option>
            <option value="personal">Personal</option>
            <option value="equipo">Equipo</option>
            <option value="proyecto">Proyecto</option>
            <option value="otro">Otro</option>
          </select>
        </label>

        <label>
          Tareas iniciales (opcional):
          <textarea
            name="tareasIniciales"
            value={formData.tareasIniciales}
            onChange={handleChange}
            placeholder="Ej: Reunión inicial, Análisis de requerimientos, etc."
          />
        </label>

        <button type="submit">Crear tablero</button>
      </form>
    </main>
  );
};

export default CrearTablero;
