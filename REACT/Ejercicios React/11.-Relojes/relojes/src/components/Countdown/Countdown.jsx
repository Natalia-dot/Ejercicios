import { useEffect } from "react";
import { useState } from "react";

export const Countdown = () => {
  const [time, setTime] = useState(""); //inicializamos vacia el time, que es el tiempo que queda restante
  useEffect(() => {
    let countDownDate = new Date("November 19, 2023 13:09:30").getTime(); 
    //ex la funcion get time nos da los milisegundos pasados desde el EPOCH, que es el 1 de enero de 1970
    //ex y por eso vamos a coger tambien los milisegundos pasados desde el epoch hasta el dia de hoy
    //ex y restar now a countDownDate, para que nos de la diferencia
      let x = setInterval(() => {
      let now = new Date().getTime();

      let distance = countDownDate - now;

      //ex % es para calcular el resto!
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTime(days + "d " + hours + "h " + minutes + "m " + seconds + "s ");

      if (distance < 0) {
        clearInterval(x);
        setTime("COUNTDOWN FINISHED");
      }
    }, 1000);
  }, []);
  return (
    <div className="countdown">
      <h2>{time}</h2>
    </div>
  );
};
