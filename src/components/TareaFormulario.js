//Componenete formulario.
import "../styles/TareaFormulario.css"
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function TareaFormulario (props){
  
  const [input, setInput] = useState("");

  const manejarCambio = (e) => {
    setInput(e.target.value);
  };

  const manejarEnvio = (e) => {
    e.preventDefault(); //No cargue cuando se envie la tarea.
    
    const tareaNueva = {
      id: uuidv4(),
      texto: input,
      completada: false
    };
    props.onSubmit(tareaNueva); //La tarea creada se envia por medio onSubmit.
  };

  return(
    <form className="tarea-formulario" onSubmit={manejarEnvio}>
      <input 
      className="tarea-input"
      type="text"
      placeholder="Escribe una Tarea"
      name="texto"
      onChange={manejarCambio}
       />
      <button className="tarea-boton">Agregar Tarea</button>
    </form>
  );
};

export default TareaFormulario;
