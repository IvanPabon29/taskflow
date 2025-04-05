// src/pages/About.js
import React, { useEffect, useRef, useState } from "react";
import "../styles/About.css";

/**
 * Página informativa 'Acerca de TaskFlow App'
 */
const About = () => {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef();

  // Detecta si la sección esta visible para activar animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`about-container ${visible ? "visible" : ""}`} ref={containerRef}>
      <header className="about-header animate-fade-slide delay-0">
        <h1>Acerca de TaskFlow App</h1>
        <p className="subtitle">
          La herramienta perfecta para organizar, priorizar y ejecutar tus tareas como un profesional.
        </p>
      </header>

      <section className="about-card animate-fade-slide delay-1">
        <p>
          TaskFlow App es una aplicación moderna de gestión de tareas diseñada para optimizar tu productividad diaria. Con un enfoque minimalista y funcional, TaskFlow te permite organizar tus proyectos y tareas de manera intuitiva, ayudándote a concentrarte en lo que realmente importa.
        </p>
      </section>

      <section className="about-card animate-fade-slide delay-2">
        <h2>🚀 Características Principales</h2>
        <ul>
          <li>Interfaz minimalista y enfocada en la productividad.</li>
          <li>Tablero Kanban intuitivo para gestionar tareas en tiempo real.</li>
          <li>Diseño responsive adaptable a cualquier dispositivo.</li>
          <li>Almacenamiento seguro de datos en localStorage (máximo 5MB).</li>
          <li>Estructura escalable para futuras integraciones con backend.</li>
        </ul>
      </section>

      <section className="about-card animate-fade-slide delay-3">
        <h2>🛠️ Tecnologías Utilizadas</h2>
        <p>
          TaskFlow App fue creada con <strong>React</strong> y <strong>React Router</strong>, aplicando hooks modernos,
          animaciones CSS y buenas prácticas de diseño para garantizar un rendimiento óptimo. Toda la experiencia visual
          está impulsada por una paleta elegante de blanco, negro y grises.
        </p>
      </section>

      <section className="about-card animate-fade-slide delay-4">
        <h2>🎯 Nuestra Filosofía</h2>
        <p>
          Creemos en la simplicidad y funcionalidad. Diseñada para ser intuitiva, TaskFlow App permite que cada usuario se enfoque en sus proyectos sin complicaciones, ofreciendo una base robusta y flexible para crecer junto con sus necesidades.
        </p>
      </section>

      <section className="about-card animate-fade-slide delay-5">
        <h2>🌐 Visión Futura</h2>
        <p>
          Comprometidos con la innovación, En los próximos desarrollos planeamos integrar nuevas funcionalidades:
        </p>
        <ul>
          <li>☁️ Sincronización en la nube.</li>
          <li>🤝 Trabajo colaborativo en tiempo real.</li>
          <li>🎨 Opciones de personalización avanzadas .</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
