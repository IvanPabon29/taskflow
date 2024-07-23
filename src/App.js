import "./App.css";
import ListaTareas from "./components/ListaTareas";
import Logo from "./components/Logo";


function App() {
  return (
    <div className="App">
      <Logo />
      <main className="main-lista">
        
        <h1 className="titulo">Mis Tareas</h1>
        <ListaTareas/>

      </main>

    </div>
  );
}

export default App;
