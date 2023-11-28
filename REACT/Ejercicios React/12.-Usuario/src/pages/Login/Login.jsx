import { useForm } from "react-hook-form";
import "./Login.css";
import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginService } from "../../services";
import { useAuth } from "../../contexts/authContext";
import { useLoginError } from "../../hooks";

export const Login = () => {
  const { register, handleSubmit } = useForm();
  const { login, setUser } = useAuth();
  const navigate = useNavigate();

  const [ isSent, setIsSent ] = useState(false);  //isSent maneja los botones, el disable
  const [ res, setRes ] = useState({});
  const [ successfulLogin, setSuccessfulLogin ] = useState(false)

  const formSubmit = async (formData) => {
    setIsSent(true);
    setRes(await loginService(formData));
    setIsSent(false);
  }

    useEffect(() => {
      console.log("res en el primer useEffect", res)
      useLoginError(res, setRes, login, setSuccessfulLogin)
    }, [res])


    useEffect(() => {
      setUser(()=> null);
      localStorage.removeItem("user");
    }, [])
    
    if (successfulLogin) {
      console.log("aaa")
      if (res?.data?.user?.isVerified == false) {
        return <Navigate to="/codeConfirmation" />;
      } else {
        return <Navigate to="/dashboard" />;
      }
  }

  return (
    <>
    <div className="formContainer">
      <form onSubmit={handleSubmit(formSubmit)}>
        <input
          type="email"
          id="userEmail"
          name="userEmail"
          autoComplete="false"
          {...register("userEmail", { required: true })}
        />
        <label htmlFor="userEmail">Email</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="false"
          {...register("password", { required: true })}
        />
        <label htmlFor="password">Password</label>
      <div className="buttonContainer">
        <button
          type="submit"
          disabled={isSent}
          style={{
            background: isSent ? "rgb(239, 215, 236)" : "rgb(85,25,77)",
          }}
        >
          Login
        </button>
      </div>
      <p className="bottom-text">
            <small>
              Have you forgotten the password?
              <Link to="/forgotpassword" className="anchorCustom">
                Change password
              </Link>
            </small>
          </p>
        </form>
      <div className="footerForm">
        <p className="parrafoLogin">
          Are you not registered? <Link to="/register">Register Here</Link>
        </p>
      </div>
    </div>
    </>
  );
};
