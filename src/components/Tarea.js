//Componente tarea
import "../styles/Tarea.css"
import Icon from "../img/clear.png"

function Tarea({ id, texto, completada, completarTarea, eliminarTarea}){
  return(
    <section className={completada ? "contenedor-tarea completada": "contenedor-tarea"}>

      <p className="tarea-texto" onClick={() => completarTarea(id)}>
        {texto}
      </p>

      <img className="tarea-icono" src={Icon} alt="icon clear" title="Borrar" 
      onClick={() => {eliminarTarea(id)}} />

    </section>
  );
};

export default Tarea; 