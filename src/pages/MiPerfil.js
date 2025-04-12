// src/pages/MiPerfil.js
import React, { useState, useEffect } from "react";
import "../styles/MiPerfil.css";

const MiPerfil = () => {
  // Estado para controlar la visibilidad del modal
  const [showModal, setShowModal] = useState(false);

  // Estado para los datos del usuario
  const [userData, setUserData] = useState({
    nombre: "",
    usuario: "",
    correo: ""
  });

  // Estado para los datos editados temporalmente en el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    usuario: "",
    correo: ""
  });

  // Obtener datos del localStorage al cargar el componente
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser) {
      setUserData(storedUser);
      setFormData(storedUser); // Inicializa el formulario con los datos actuales
    }
  }, []);

  // Maneja los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Guarda los cambios del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    setUserData(formData);
    setShowModal(false);
  };

  return (
    <div className="perfil-container">
      <h1 className="perfil-title">Mi Perfil</h1>

      <section className="perfil-card">
        <p><strong>Nombre:</strong> {userData.nombre}</p>
        <p><strong>Nombre de Usuario:</strong> {userData.usuario}</p>
        <p><strong>Correo Electrónico:</strong> {userData.correo}</p>

        <button className="edit-btn" onClick={() => setShowModal(true)}>Editar Datos</button>
      </section>

      {/* Modal para edición */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
              <label htmlFor="nombre-usuario">Nombre de Usuario</label>
              <input
                id="nombre-usuario"
                type="text"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                required
              />
              <label htmlFor="correo">Correo Electrónico</label>
              <input
                id="correo"
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
              />
              <div className="modal-buttons">
                <button type="submit" className="save-btn">Guardar Cambios</button>
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiPerfil;
