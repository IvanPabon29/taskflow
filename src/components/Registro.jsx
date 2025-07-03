// src/components/Registro.js
import React, { useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import "../styles/Registro.css";
import logo from "../assets/img/logo.png";

/**
 * Componente de registro inicial.
 * Permite que el usuario ingrese nombre, correo y nombre de usuario.
 * Además, informa que para usar la aplicación, todos los datos se almacenan en el localStorage (máximo 5MB).
 */
const Registro = () => {
  const navigate = useNavigate();  // Usamos useNavigate para redirigir al usuario
  const [, setUserData] = useLocalStorage("userData", null);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    usuario: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Guardamos los datos del usuario en localStorage
    setUserData(formData);
    // Redirigimos al usuario al Home después de registrarse
    navigate("/home");
  };

  return (
    <main id="registro">
      <div className="registro-container">

        <section className="info">
          <div className="app-title">
            <h1 className="title">TaskFlow</h1>
            <img src={logo} alt="Logo de TaskFlow" className="logo" />
          </div>
          <p className="welcome">
            Bienvenido a TaskFlow, la forma moderna y minimalista de gestionar tus tareas.
          </p>
          <p className="instructions">
            Para comenzar, regístrate ingresando tu nombre, correo y un nombre de usuario.
          </p>
          <p className="warning">
            <strong>Atención:</strong> Los datos se guardan en el localStorage de tu navegador (máximo 5MB).
          </p>
        </section>
        <form onSubmit={handleSubmit} className="registro-form">
          <label>
            Nombre:
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ingresa tu nombre"
              required
            />
          </label>
          <label>
            Correo:
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="ejemplo@correo.com"
              required
            />
          </label>
          <label>
            Nombre de usuario:
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              placeholder="Elige un nombre de usuario"
              required
            />
          </label>
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </main>
  );
};

export default Registro;
