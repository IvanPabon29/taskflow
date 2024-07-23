//componente tiene las tareas y el formulario.
import "../styles/ListaTareas.css";
import Tarea from "./Tarea";
import TareaFormulario from "./TareaFormulario";
import { useState } from "react";

function ListaTareas (){

  const [tareas, setTareas] = useState([]); // Recibe las tareas en forma de OBJETOS.

  const agregarTarea = (tarea) => { //Aqui la tarea llega y entra en forma de argumento.
    if(tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim(); //Se eliminan los espacios en blanco

      const tareasActualizadas = [tarea, ...tareas];
      setTareas(tareasActualizadas);
    }
  };

  // Funcion para marcarla completada.
  const completarTarea = (id) => {
    const actualizarCompletada = tareas.map( (tarea) =>{
      if(tarea.id === id){
        // si el id es IGUAL, la tarea pasara a FALSO o viceversa para se aplique el stylo.
        tarea.completada = !tarea.completada;
      };
      return tarea;
    }); 
    setTareas(actualizarCompletada);
  };

  // Funcion para eliminar la tarea.
  const eliminarTarea = (id) =>{
    const filtrarTareas = tareas.filter( (tarea) => tarea.id !== id); 
    // Las tareas con el mismo ID, Se ELIMINAN osea alas que se les de CLICK.
    setTareas(filtrarTareas);
  };

  return (
    <>
      <TareaFormulario onSubmit ={agregarTarea} />

      <div className="tareas-listas-contenedor">
        { 
          tareas.map((tarea) => //Por cada tarea se crea un componente.
            <Tarea 
              key={tarea.id} //para darle un orden a los componentes.
              id={tarea.id}
              texto={tarea.texto}
              completada={tarea.completada}
              completarTarea={completarTarea} 
              eliminarTarea={eliminarTarea} />
            )
        }

      </div>
    </>
  );
};

export default ListaTareas;