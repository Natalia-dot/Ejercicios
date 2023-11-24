import { useForm } from "react-hook-form"
import "./ForgotPassword.css"
import { useEffect, useState } from "react";
import { forgotPasswordService } from "../../services";
import { Navigate } from "react-router-dom";
import { useForgotPasswordError } from "../../hooks";

export const ForgotPassword = () => {
    const { register, handleSubmit } = useForm();
    const [res, setRes] = useState({});
    const [isSent, setIsSent] = useState(false);
    const [successfulEmailSent, setSuccessfulEmailSent] = useState(false);

//tip si llamas a un servicio es asiuncrona
    const submitEmailForm = async (formData) => {
        setIsSent(true);
        setRes(await forgotPasswordService(formData))
        setIsSent(false)
    }

    useEffect(() => {
      useForgotPasswordError(res, setRes, setSuccessfulEmailSent)
    }, [res])
    
    if(successfulEmailSent) {
        return <Navigate to="/login" />
    }

  return (
    <>
    <div className="form-wrap">
        <h1>Password request</h1>

        <form onSubmit={handleSubmit(submitEmailForm)}>
          <div className="userContainer formGroup">
            <input
              className="inputUser"
              type="text"
              id="userEmail"
              name="userEmail"
              autoComplete="false"
              {...register("userEmail", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Email
            </label>
          </div>

          <div className="btnContainer">
            <button
              className="btn"
              type="submit"
              disabled={isSent}
              style={{ background: isSent ? "rgb(239, 215, 236)" : "rgb(85,25,77)" }}
            >
              Change password
            </button>
          </div>

          <p className="bottomText">
            <small>Submit Your EWEMail 💌</small>
          </p>
        </form>
      </div>
    </>
  )
}
