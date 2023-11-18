import { useState } from "react";
import "./App.css";
import { Header, Input } from "./components";

function App() {
  const [header, setHeader] = useState("Hola");

  return (
    <>
      <Header content={header}/> 
      <Input value={header} func={setHeader}/>
    </>
  );
}

export default App;

//EX al header le va a entrar el prop header, que es el contenido del input, y tiene {header} dentro del contenido
//EX en el componente. Input recibe value, que es la asignacion del valor al header (value esvlo que sea que haya en
//EX el input)y func es el setHeader para que actualice header onChange
//EX en el useState le metemos un estado por defecto para que tenga el input y el estado, y se renderiza 
//EX nada mas cargar la pagina