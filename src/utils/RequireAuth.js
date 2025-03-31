// src/utils/RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return <Navigate to="/listas-tareas" replace />; // Redirigir al login si no hay datos del usuario en el localStorage
  }
  return children; // Renderizar el componente protegido si el usuario esta registrado
};

export default RequireAuth;
