import "../styles/TerminosCondiciones.css";

/**
 * Página de Términos y Condiciones para la aplicación.
 */
const TerminosCondiciones = () => {
  return (
    <div className="terminos-container">
      <h1>Términos y Condiciones</h1>
      <p className="intro">
        Al utilizar esta aplicación, aceptas los siguientes términos y condiciones. Te recomendamos leerlos detenidamente antes de continuar.
      </p>

      <section>
        <h2>1. Uso de la aplicación</h2>
        <p>
          Esta aplicación está diseñada para ayudarte a gestionar tus tareas y proyectos. El uso indebido, como intentar vulnerar su seguridad o la de otros usuarios, está estrictamente prohibido.
        </p>
      </section>

      <section>
        <h2>2. Registro de usuario</h2>
        <p>
          Al registrarte, eres responsable de mantener la confidencialidad de tu información. No compartas tu acceso con terceros.
        </p>
      </section>

      <section>
        <h2>3. Responsabilidad</h2>
        <p>
          Nos esforzamos por ofrecer un servicio funcional y seguro, pero no garantizamos que la aplicación esté libre de errores o interrupciones. No nos hacemos responsables por pérdidas de datos locales.
        </p>
      </section>

      <section>
        <h2>4. Propiedad intelectual</h2>
        <p>
          Todo el contenido, diseño y código fuente de esta aplicación pertenece a sus desarrolladores. Está prohibido copiar, distribuir o modificar sin autorización.
        </p>
      </section>

      <section>
        <h2>5. Modificaciones</h2>
        <p>
          Nos reservamos el derecho de actualizar estos términos en cualquier momento. Te notificaremos dentro de la app sobre cambios importantes.
        </p>
      </section>
    </div>
  );
};

export default TerminosCondiciones;
