import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export const CounterButton = () => {
  const counter = useRef(0);
  const [number, setNumber] = useState(0);

  const addCounter = () => {
    counter.current += 1;

    setNumber((prevNumber) => {
      if (counter.current === 5) {
        return counter.current;
      } else {
        console.log(counter.current);
        return prevNumber; // Return the previous value if the condition is not met
      }
    });
  

    console.log(counter.current);
  };
  return (
    <div>
      <h1>{number}</h1>
      <button onClick={addCounter}> Add 1</button>
    </div>
  );
};
//it does not re render....
