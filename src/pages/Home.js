// src/pages/Home.js
import React from "react";
import { Link } from "react-router-dom";
import iconAgregar from "../assets/icons/icon-agregar-tablero.png";
import iconEstadisticas from "../assets/icons/icon-estadisticas.png";
import iconCarpeta from "../assets/icons/icon-carpeta-tablero.png";
import "../styles/Home.css"; 

/**
 * Página principal (Home) que da la bienvenida al usuario
 * y muestra accesos rápidos a funcionalidades clave de la app.
 */
const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Bienvenido a TaskFlow App</h1>
      <p className="home-subtitle">
        Aquí podrás gestionar tus tareas de forma rápida y minimalista.
      </p>

      <div className="home-options">
        {/* Opción: Crear nuevo tablero */}
        <Link to="/crear-tablero" className="home-card">
          <img src={iconAgregar} alt="Crear nuevo tablero" className="home-icon" />
          <h3>Nuevo Tablero</h3>
          <p>Crea un tablero para organizar tus tareas y proyectos.</p>
        </Link>

        {/* Opción: Ver mis tableros */}
        <Link to="/mis-tableros" className="home-card">
          <img src={iconCarpeta} alt="Mis tableros" className="home-icon" />
          <h3>Mis Tableros</h3>
          <p>Accede, edita o elimina tus tableros existentes.</p>
        </Link>

        {/* Opción: Ver estadísticas */}
        <Link to="/estadisticas" className="home-card">
          <img src={iconEstadisticas} alt="Estadísticas" className="home-icon" />
          <h3>Estadísticas</h3>
          <p>Consulta tus avances, tareas completadas, tiempo invertido y más.</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
