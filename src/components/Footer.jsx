// src/components/Footer.js
import React from "react";
import "../styles/Footer.css";

/**
 *  Componente Footer
 * Este componente representa el pie de página de la aplicación. Contiene enlaces a la    política de privacidad, términos y condiciones, y contacto, así como el aviso de derechos de autor.
 */

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <ul className="footer-links">
          <li>
            <a href="/listas-tareas/privacy">Política de Privacidad</a>
          </li>
          <li>
            <a href="/listas-tareas/terms">Términos y Condiciones</a>
          </li>
          <li>
            <a href="/listas-tareas/contact">Contacto</a>
          </li>
        </ul>
        <p>
          © {new Date().getFullYear()} TaskFlow App. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
