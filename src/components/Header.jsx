// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import IconUser from "../assets/icons/user.png";
import Logo from "../assets/img/logo.png";

const Header = () => {
  // Obtener datos del usuario desde localStorage
  const storedUser = localStorage.getItem("userData");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  const username = userData?.usuario || "Usuario";

  // Estado para manejar el menú desplegable
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/listas-tareas/home">
            <img
              src={Logo}
              alt="TaskFlow Logo"
              title="TaskFlow"
              className="logo"
            />
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
                    <Link to="/mi-perfil">Mi Perfil</Link>
                  </li>
                  <li>
                    <Link to="/acerca-de">Acerca de</Link>
                  </li>
                  <li>
                    <Link to="/logout">Cerrar sesión</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
