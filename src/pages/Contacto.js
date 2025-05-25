// src/pages/Contacto.js
import React, { useState } from "react";
import "../styles/Contacto.css";

/**
 * Página de Contacto para la aplicación.
 */
const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui se podra implementar el envío del formulario
    alert("Mensaje enviado. ¡Gracias por contactarnos!");
    setFormData({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <div className="contacto-container">
      <h1>Contáctanos</h1>
      <p className="intro">
        ¿Tienes preguntas, sugerencias o necesitas ayuda? Completa el siguiente formulario y nos pondremos en contacto contigo lo antes posible.
      </p>

      <form className="formulario-contacto" onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="correo">Correo electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows="5"
            value={formData.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="boton-enviar-contacto">Enviar mensaje</button>
      </form>
    </div>
  );
};

export default Contacto;
