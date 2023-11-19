import { useEffect } from "react"
import "./DigitalClock.css"
import { useState } from "react"

export const DigitalClock = () => {
    const [time, setTime] = useState();

    useEffect(() => {
      setInterval(() => {
        let time = new Date().toLocaleTimeString();
        setTime(time);
      }, 1000);
    }, [])
  return (
    <div>
        <h1>{time}</h1>

    </div>
  )
}
/*<!--EX setteamos time a un estado, y usamos useEffect para establecer un intervalo solo cuando se renderice por
//ex primera vez la pagina. El intervalo seguira ejecutandose aunque no haya mas lllamadas a use effect,
//ex y por eso gracias al intervalo no tenemos que establecer dependencia a time en useEffect*/