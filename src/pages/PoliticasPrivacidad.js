import React from "react";
import "../styles/PoliticasPrivacidad.css";

/**
 * Página de Políticas de Privacidad para la aplicación.
 */
const PoliticasPrivacidad = () => {
  return (
    <div className="politicas-container">
      <h1>Políticas de Privacidad</h1>
      <p className="intro">
        Esta política de privacidad describe cómo se recopila, usa y protege la información personal que proporcionas al utilizar nuestra aplicación.
      </p>

      <section>
        <h2>1. Información que recopilamos</h2>
        <p>
          Podemos recopilar información personal como tu nombre, dirección de correo electrónico, y cualquier dato que proporciones al registrarte, crear tableros, tareas o interactuar con la aplicación.
        </p>
      </section>

      <section>
        <h2>2. Uso de la información</h2>
        <p>
          La información recopilada se utiliza exclusivamente para:
        </p>
        <ul>
          <li>Proporcionar y mejorar nuestros servicios.</li>
          <li>Personalizar tu experiencia en la aplicación.</li>
          <li>Comunicarnos contigo cuando sea necesario.</li>
        </ul>
      </section>

      <section>
        <h2>3. Almacenamiento de datos</h2>
        <p>
          La información se almacena localmente en tu navegador (localStorage) y no se comparte con terceros. Si en el futuro implementamos un servidor o base de datos, se actualizará esta política.
        </p>
      </section>

      <section>
        <h2>4. Seguridad</h2>
        <p>
          Nos comprometemos a proteger tu información. Aunque trabajamos para mantener medidas de seguridad adecuadas, recuerda que ninguna transmisión de datos por internet o sistema de almacenamiento es completamente seguro.
        </p>
      </section>

      <section>
        <h2>5. Cookies</h2>
        <p>
          Esta aplicación no utiliza cookies de terceros ni tecnologías de rastreo. Toda la información es gestionada de manera local.
        </p>
      </section>

      <section>
        <h2>6. Derechos del usuario</h2>
        <p>
          Puedes modificar o eliminar tu información personal directamente desde la aplicación. Si deseas eliminar todos tus datos, puedes hacerlo desde tu menu de usuario. Ten en cuenta que esto eliminará toda la información almacenada localmente.
        </p>
      </section>

      <section>
        <h2>7. Cambios en la política</h2>
        <p>
          Esta política puede ser actualizada en cualquier momento. Te notificaremos dentro de la app sobre cualquier cambio relevante.
        </p>
      </section>

      <section>
        <h2>8. Contacto</h2>
        <p>
          Si tienes preguntas o inquietudes sobre esta política de privacidad, puedes escribirnos al correo: <a href="mailto:soporte@app.com">soporte@app.com</a>.
        </p>
      </section>
    </div>
  );
};

export default PoliticasPrivacidad;
