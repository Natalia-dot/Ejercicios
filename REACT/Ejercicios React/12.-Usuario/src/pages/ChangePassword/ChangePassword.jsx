import { useForm } from "react-hook-form"
import "./ChangePassword.css"
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { changePasswordService } from "../../services";
import { useForgotPasswordError } from "../../hooks";
import { useChangePasswordError } from "../../hooks/useChangePasswordError/useChangePasswordError";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const ChangePassword = () => {
  const { setUser } = useAuth();
  const { register, handleSubmit } =  useForm();
  const [ res, setRes ] = useState({});
  const [ isSent, setIsSent ] = useState(false);

  const formSubmit = (formData) => {
    const {password, newPassword, passwordConfirmation} = formData;
    if (newPassword == passwordConfirmation) {
      Swal.fire({
        title: "Are you sure you want to change your password?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "rgb(73, 193, 162)",
        cancelButtonColor: "",
        confirmButtonText: "YES",
      }).then(async (result) => {
        if(result.isConfirmed) {
          setIsSent(true);
          setRes(await changePasswordService({ password, newPassword}))
          setIsSent(false);
        }
      })
    } else {
      Swal.fire({
        icon: "error",
        title: " New passwords don't match with one another. Give it another try.",
        showConfirmButton: false,
        timer: 2500,
      });
    }
  };

  useEffect(() => {
    console.log("esta es la res en change password", res)
    useChangePasswordError(res, setRes, setUser)
  }, [res])
  

  return (
    <>
    <div className="profileContent">
        <h1>Change your password</h1>
        <p>Please, enter your old password first and then the new one.</p>
        <form onSubmit={handleSubmit(formSubmit)}>
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
              Old password
            </label>
          </div>
          <div className="newPasswordContainer formGroup">
            <input
              className="inputUser"
              type="password"
              id="newPassword"
              name="newPassword"
              autoComplete="false"
              {...register("newPassword", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              New password
            </label>
          </div>
          <div className="confirmPasswordContainer formGroup">
            <input
              className="inputUser"
              type="password"
              id="passwordConfirmation"
              name="passwordConfirmation"
              autoComplete="false"
              {...register("passwordConfirmation", { required: true })}
            />
            <label htmlFor="customInput" className="customPlaceholder">
              Confirm new password
            </label>
          </div>
          <div className="btnContainer">
            <button
              className="btn"
              type="submit"
              disabled={isSent}
              style={{ background: isSent ? "rgb(239, 215, 236)" : "rgb(85,25,77)" }}
            >
              CHANGE PASSWORD
            </button>
          </div>
        </form>
    </div>
    </>
  )
}
