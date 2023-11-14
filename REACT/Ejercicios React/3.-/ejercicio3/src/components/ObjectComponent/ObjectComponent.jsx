import { useEffect } from "react";

export const Object = (props) => {
  const {state} = props;
  useEffect(() => {
    return () => {
      console.log("Adiooo")
    }
  }, [])
  
  return (
    <div id="toys">
      <h2>{props.name}</h2>
      <sub>{props.price}</sub>
      <p>{props.description}</p>
    </div>
  );
};
