// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

/** 
 * Componente Layout que sirve como contenedor para las páginas de la aplicación
 * Incluye el encabezado, el pie de página y el contenido principal de la página
 */ 

const Layout = () => {
  return (
    <>
      <Header />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
