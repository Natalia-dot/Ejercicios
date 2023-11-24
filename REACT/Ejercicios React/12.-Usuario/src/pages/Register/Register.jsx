import { useState } from "react";
import { useForm } from "react-hook-form";
import { userRegister } from "../../services";
import { useEffect } from "react";
import { useSetError } from "../../hooks";
import "./Register.css";
import { Uploadfile } from "../../components";
import { useAuth } from "../../contexts/authContext";
import { Navigate, useNavigate } from "react-router-dom";


export const Register = () => {
  //Ex creamos los estados que nos van a proporcionar informacion o cambiar cosas segun su estado.
  const [res, setRes] = useState({}); //esto es un objeto en el que ira la informacion del formulario
  const [isSent, setIsSent] = useState(false); //esto nos proporciona feedback sobre el estado de envio de la info
  const [successfulRegister, setSuccessfulRegister] = useState(false); //este estado nos indica si se ha registrado el usuario en la base de datos sin problema

  //Ex llamamos al hook de useForm que nos va a proporcionar unas funciones para gestionar los datos del
  //Ex formulario y al de useAuth para acceder a lo que hemos setteado del contexto
  const { handleSubmit, register } = useForm();
  const { dataBridge, setDeletedUser } = useAuth();
  //Ex handleSubmit tiene luego una callback que vamos a crear ahora que gestiona lo que se hace cuando se
  //Ex submittea el formulario .Register es un objeto que almacena los datos del formulario y tambien gestiona
  //Ex los requerimientos

  const navigate = useNavigate();
  //ex dentro de los useEffect no se pueden usar hooks, a diferencia de navigate, el cual vamos a instanciar para que nos 
  //ex mande a la pagina de confirmacion de codigo.
  //fix Pedro no lo usa??


  //Ex en perform submit vamos a mandarle form data, que se la pasaremos directamente gracias a handleSubmit,
  //Ex que nos trae la informacion formateada y verificada. Le tenemos que pasar de momento tambien hardcoddeado
  //Ex el gender, porque aun no tenemos un radio para el genero. Luego le pasamos el valor actualizado del formulario
  //Ex a userRegister, que linkea directamente con nuestro backend

  const performSubmit = async (formData) => {
    const inputFile = document.getElementById("file-upload").files;

    if (inputFile.length != 0) {
      // si es diferente a cero quiere decir que tenemos una imagen
      const updatedFormData = {
        ...formData,
        image: inputFile[0],
      };

      setIsSent(true);
      setRes(await userRegister(updatedFormData));
      setIsSent(false);
    } else {
      const updatedFormData = { ...formData };
      setIsSent(true);
      setRes(await userRegister(updatedFormData));
      setIsSent(false);
    }
  };

  
  useEffect(() => {
    console.log(res);
    useSetError(res, setRes, setSuccessfulRegister);
    if (res?.status == 200) dataBridge("completeUserInfo")
    //ex si esta todo bien, en el useSetError hemos tenido que settear la data al local storage. Aqui mandamos al databridge el caso del 
    //ex switch por el que queremos que entre y setteara en el estado la data en vez de en el local storage por temas de seguridad
  }, [res]);

useEffect(() => {
  setDeletedUser(()=> false);
}, [])
//ex aqui solo quitamos el set deleted user porque no lo necesitamos para nada mas, solo para
//ex que cuando entremos a register mediante el redirect de useDeleteUser, volvamos a resetear el 
//ex estado


  if(successfulRegister){
    return <Navigate to="/codeConfirmation" />
  }
  //aqui esperamos a que salga del useSetError de la alerta de 200 que cambia el estado de successfulRegister

  return (
    <>
      <div className="formWrap">
        <h1>You could... Sign Up!</h1>
        <p>It would really help us grow.</p>
        <form onSubmit={handleSubmit(performSubmit)}>
          <div className="userContainer formGroup">
            <input
              className="inputUser"
              type="text"
              id="name"
              name="name"
              autoComplete="false"
              {...register("name", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Username
            </label>
          </div>
          <div className="passwordContainer formGroup">
            <input
              className="inputUser"
              type="password"
              id="password"
              name="password"
              autoComplete="false"
              {...register("password", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Password
            </label>
          </div>
          <div className="emailContainer formGroup">
            <input
              className="inputUser"
              type="email"
              id="email"
              name="userEmail"
              autoComplete="false"
              {...register("userEmail", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Email
            </label>
          </div>
          <div className="genderRadio">
            <input
              type="radio"
              name="male"
              id="male"
              value="male"
              {...register("gender")}
            />
            <label htmlFor="male" className="radio">
              Male
            </label>
            <input
              type="radio"
              name="female"
              id="female"
              value="female"
              {...register("gender")}
            />
            <label htmlFor="female" className="radio">
              Female
            </label>
            <input
              type="radio"
              name="other"
              id="other"
              value="other"
              {...register("gender")}
            />
            <label htmlFor="other" className="radio">
              Other
            </label>
          </div>
          <Uploadfile />
          <div className="btnContainer">
            <button
              className="btn"
              type="submit"
              disabled={isSent}
              style={{
                background: isSent ? "rgb(239, 215, 236)" : "rgb(85,25,77)",
              }}
            >
              {isSent ? "Loading..." : "Sign Up"}
            </button>
          </div>
          <p className="bottomText">
            <small>
              By clicking the Sign Up button, you agree to our{" "}
              <a href="#">Terms & Conditions</a> and{" "}
              <a href="#">Privacy Policy</a>.
            </small>
          </p>
        </form>
      </div>
    </>
  );
};
