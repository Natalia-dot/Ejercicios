// imp +++++++++++++++++++++++++Libraries-+++++++++++++++++++++++++++++++++++++
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// imp +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
import { useAuth } from "../../contexts/authContext";
// imp ++++++++++++++++++++++++++++++++CSS+++++++++++++++++++++++++++++++++++++
import "./CodeConfirmation.css";
import { codeConfirmationService, resendEmailService } from "../../services";
import { useAutoLogin, useCodeConfirmationError, useEmailResendError } from "../../hooks";
import { Navigate, useNavigate } from "react-router-dom";

export const CodeConfirmation = () => {
  //tip Esto son destructuring de contexto y formSubmit, puesto que debido a la naturaleza de la pagina vamos
  //tip a necesitarlos
  const { completeUserInfo, setUser, login } = useAuth();
  const { register, handleSubmit } = useForm();

  //tip Esto son estados que van a almacenar la informacion de los formularios etc para poder
  //tip gestionar los errores
  const [res, setRes] = useState({});
  //ex ESto es para almacenar los datos y el codigo de confirmacion y mandarlo a la gestion de errores

  const [resResend, setResResend] = useState({});
  //ex aqui es para gestionar el resend dependiendo de que informacion tengamos(si es del login con el local
  //ex o del register con completeUserInfo)

  //tip Esto son mas bien estados que segun si son true o false hacen una cosa u otra
  const [isSent, setIsSent] = useState(false);
  //ex para establecer cuando se ha mandado el formulario y que hacer si esta a true

  const [codeConfirmationSuccessful, setCodeConfirmationSuccessful] =
    useState(false);
  //ex esto es para que cuando entremos en el useCodeConfirmationError podamos settearlo a true y nos haga lo que sea,
  //ex (redirigirnos a dashboard)

  const [deletedUserSuccessful, setDeletedUserSuccessful] = useState(false);
  //ex para que en useCodeConfirmationError lo seteemos atrue cuando nos de el 200 de codigo incorrecto

  const [userNotFound, setUserNotFound] = useState(false);
  //ex este para cuando el useCodeConfirmationError diga que el usuario esta mal y que nos tiene que
  //ex borrar el usuario desde aqui
  const navigate = useNavigate();

  const formSubmit = async (formData) => {
    //ex esto se hace automaticamente, asi que es un formulario en el que tenemos que encontrar los datos segun si viene por el
    //ex login o por el register, para ver si tenemos completeUserInfo el local storagre
    const userFromLoginInLocalStorage = localStorage.getItem("user");
    if (userFromLoginInLocalStorage == null) {
      const updatedRegisterUserData = {
        confirmationEmailCode: parseInt(formData.confirmationEmailCode),
        userEmail: completeUserInfo.data.user.userEmail,
      };
      setIsSent(true);
      setRes(await codeConfirmationService(updatedRegisterUserData));
      setIsSent(false);
    } else {
      const userFromLoginData = JSON.parse(userFromLoginInLocalStorage);
      const updatedLoginUserData = {
        confirmationEmailCode: parseInt(formData.confirmationEmailCode),
        userEmail: userFromLoginData.userEmail
      }
      setIsSent(true);
      setRes(await codeConfirmationService(updatedLoginUserData));
      setIsSent(false);
    }
  };

  //sec  Aqui le asignamos el controlador de user de resend, ,mandandole la info adecuada segun si viene por
  //sec login o register, pAra que se ejecute cuando presionamos al boton de resend
  const handleEmailResend = async () => {
    const userFromLoginInLocalStorage = localStorage.getItem("user");
    if (userFromLoginInLocalStorage != null) {
      const parsedUser = JSON.parse(userFromLoginInLocalStorage);
      const formData1 = {
        userEmail: parsedUser.userEmail,
      };
      setIsSent(true);
      setResResend(await resendEmailService(formData1));
      setIsSent(false);
    } else {
      const formData2 = {
        userEmail: completeUserInfo?.user?.userEmail,
      };
      setIsSent(true);
      setResResend(await resendEmailService(formData2));
      setIsSent(false);
    }
  };

  useEffect(() => {
    useCodeConfirmationError(
      res,
      setRes,
      setCodeConfirmationSuccessful,
      setDeletedUserSuccessful,
      login,
      setUserNotFound
    );
  }, [res]);

  useEffect(() => {
    useEmailResendError(resResend, setResResend, setUserNotFound);
  }, [resResend]);

  if (codeConfirmationSuccessful) { //esto en el register
    if (!localStorage.getItem("user")) {
      useAutoLogin(completeUserInfo, login);
    } else {
      return <Navigate to="/dashboard" />;
    }
  }

  if (deletedUserSuccessful) {
    return <Navigate to="/register" />;
  }

  if (userNotFound) {
    /// lo mando al login porque aparece un 404 de user no found porque me ha recargado la pagina y se ha reseteado allUser
    // por lo cual no tengo acceso al email y no puedo reconocerlo en el back
    console.log("userNotFound", res.response);
    return <Navigate to="/login" />;
  }
  return (
    <>
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="userContainer formGroup">
          <input
            className="inputUser"
            type="text"
            id="confirmationEmailCode"
            name="confirmationEmailCode"
            autoComplete="false"
            {...register("confirmationEmailCode", { required: true })}
          />
          <label htmlFor="confirmationEmailCode">Registration code</label>
        </div>

        <div className="btnContainer">
          <button
            id="btnCheck"
            className="btn"
            type="submit"
            disabled={isSent}
            style={{ background: isSent ? "rgb(239, 215, 236)" : "rgb(85,25,77)" }}
          >
            Verify Code
          </button>
        </div>
      </form>
      <div className="btn_container">
          <button
            id="btnResend"
            className="btn"
            disabled={isSent}
            style={{ background: isSent ? "rgb(239, 215, 236)" : "rgb(85,25,77)" }}
            onClick={() => handleEmailResend()}
          >
            Resend Code
          </button>
        </div>

        <p className="bottom-text">
          <small>
            If the code is not correct ❌, your user will be deleted from the
            database and you will need to register again.{" "}
          </small>
        </p>
    </>
  );
};
