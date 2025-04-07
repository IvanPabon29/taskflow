// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  // Obtener datos del usuario desde localStorage (asegúrate de que se almacenen correctamente)
  const storedUser = localStorage.getItem("userData");
  const userData = storedUser ? JSON.parse(storedUser) : null;
  const username = userData?.usuario || "Usuario";

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
          {/* Si tienes un logo, reemplaza la URL; de lo contrario, usa un texto */}
          <Link to="/">
            <img src="/logo192.png" alt="TaskFlow Logo" className="logo" />
          </Link>
        </div>
        <div className="header-right">
          <span className="welcome-message">Bienvenido, {username}</span>
          <div className="user-menu" ref={menuRef}>
            <button
              className="user-icon-button"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {/* Puedes usar Font Awesome, un SVG o un emoji */}
              <i className="fas fa-user"></i>
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
