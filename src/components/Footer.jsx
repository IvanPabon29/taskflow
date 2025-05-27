// src/components/Footer.js
import "../styles/Footer.css";
import { Link } from "react-router-dom";

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
            <Link to="/listas-tareas/politicas-privacidad">Políticas de Privacidad</Link>
          </li>
          <li>
            <Link to="/listas-tareas/terminos-condiciones">Términos y Condiciones</Link>
          </li>
          <li>
            <Link to="/listas-tareas/contacto">Contacto</Link>
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
