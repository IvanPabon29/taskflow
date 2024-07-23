// Componente logo.
import logo from "../img/logo.png";
import "../styles/Logo.css";

function Logo () {
  return (
    <div className= "logo-contenedor">
      <h1>Aplicacion de Lista de Tareas</h1>
      <img className="logo" src= {logo} alt="logo" />
    </div>  
  );
};

export default Logo;