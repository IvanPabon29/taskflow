// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Header.css";
import IconUser from "../assets/icons/user.png";
import IconMiPerfil from "../assets/icons/icon-usuario-perfil.png";
import IconAcercaDe from "../assets/icons/icon-acerca-de.svg";
import IconEliminarUsuario from "../assets/icons/icon-eliminar-usuario.png";
import Logo from "../assets/img/logo.png";

const Header = () => {
  const navigate = useNavigate();

  // Obtener datos del usuario desde localStorage
  const storedUser = localStorage.getItem("userData");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  const username = userData?.usuario || "Usuario";

  // Estado para manejar el menú desplegable
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  // Cierra el menú al hacer clic fuera del mismo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Elimina los datos del usuario y redirige
  const handleDeleteUser = () => {
    localStorage.removeItem("userData");
    setShowModal(false);
    navigate("/listas-tareas");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/listas-tareas/home" title="Home">
            <img
              src={Logo}
              alt="TaskFlow Logo"
              title="Home"
              className="logo"
            />
            <h1 className="logo-name">TaskFlow</h1>
          </Link>
        </div>

        <div className="header-right">
          <span className="welcome-message">
            Bienvenido, <strong>{username}</strong>
          </span>
          <div className="user-menu" ref={menuRef}>
            <button
              className="user-icon-button"
              onClick={() => setMenuOpen((prev) => !prev)}
              title="Menú de usuario"
            >
              <img src={IconUser} alt="Usuario" className="user-icon" />
            </button>

            {menuOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li>
                    <Link to="/listas-tareas/mi-perfil">
                      <img src={IconMiPerfil} alt="Mi perfil" />
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/listas-tareas/acerca-de">
                      <img src={IconAcercaDe} alt="Acerca de" />
                      Acerca de
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => setShowModal(true)}
                      className="dropdown-btn"
                    >
                      <img src={IconEliminarUsuario} alt="Eliminar usuario" />
                      Eliminar Cuenta
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación para eliminar cuenta */}
      {showModal && (
        <dialog open className="modal-confirm">
          <div className="modal-content">
            <h2>¿Eliminar cuenta?</h2>
            <p>¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button className="btn-user-cancel" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn-user-delete" onClick={handleDeleteUser}>
                Sí, eliminar
              </button>
            </div>
          </div>
        </dialog>
      )}
    </header>
  );
};

export default Header;
