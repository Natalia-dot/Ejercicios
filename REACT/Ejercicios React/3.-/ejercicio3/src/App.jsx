import { useState } from "react";
import "./App.css";
import { Object, ButtonComponent, ButtonNumberComponent } from "./components";
import { toysArray } from "./data/objectData";

export const App = () => {
  const [display, setDisplay] = useState(true);
  const [count, setCount] = useState(0);
  //EX declaramos las variables de estado y las funciones que lo modifican, asi como su estado inicial
  return (
    <>
      <ButtonComponent setState={setDisplay} state={display} text={"Press to toggle toys."} />
      <ButtonNumberComponent setState={setCount} state={count} text={"Count up!"}/>
      {/*EX Aqui le pasamos al boton las variables y seteadoras de estado que usa el boton en su propia infraestructura.
 /*EX cuando el estado no pertenece al componente, SETSTATE NECESITA UNA CALLBACK.
*/}
      {display &&
        toysArray.map((item) => (
          <Object
            key={item.name}
            name={item.name}
            price={item.price}
            description={item.description}
            state={count}
          />
        ))}
    </>
  );
};
