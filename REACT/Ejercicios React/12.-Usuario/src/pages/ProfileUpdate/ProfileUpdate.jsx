import { useForm } from "react-hook-form";

import "./ProfileUpdate.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

import { Uploadfile, UserFigure } from "../../components";
import { useAuth } from "../../contexts/authContext";
import { updateUserService } from "../../services";
import { useUpdateError } from "../../hooks/useUpdateError/useUpdateError";

export const ProfileUpdate = () => {
  const { user, setUser, logout } = useAuth();
  const { register, handleSubmit } = useForm();
  const [res, setRes] = useState({});
  const [isSent, setisSent] = useState(false);

  const defaultData = {
    name: user?.user,
  };

  //! ------------ 1) La funcion que gestiona el formulario----
  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to change your data profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const inputFile = document.getElementById("file-upload").files;

        if (inputFile.length != 0) {
          const customFormData = {
            ...formData,
            image: inputFile[0],
          };

          setisSent(true);
          setRes(await updateUserService(customFormData));
          setisSent(false);
        } else {
          const customFormData = {
            ...formData,
          };
          setisSent(true);
          setRes(await updateUserService(customFormData));
          setisSent(false);
        }
      }
    });
  };

  //! -------------- 2 ) useEffect que gestiona la parte de la respuesta ------- customHook

  useEffect(() => {
    console.log(res);
    useUpdateError(res, setRes, setUser, logout);
  }, [res]);

  return (
    <>
      <div className="containerProfile">
          <UserFigure user={user} />
        </div>
        <div className="formWrap formProfile">
          <h1>Change your data ♻</h1>
          <p>Please, enter your new data</p>
          <form onSubmit={handleSubmit(formSubmit)}>
            <div className="userContainer formGroup">
              <input
                className="inputUser"
                type="text"
                id="name"
                name="name"
                autoComplete="false"
                defaultValue={defaultData?.name}
                {...register("name")}
              />
              <label htmlFor="customInput" className="customPlaceholder">
                username
              </label>
            </div>
            <Uploadfile />
            <div className="btnContainer">
              <button
                className="btn"
                type="submit"
                disabled={isSent}
                style={{ background: isSent ? "#49c1a388" : "#49c1a2" }}
              >
                UPDATE DATA
              </button>
            </div>
          </form>
        </div>
    </>
  );
};
