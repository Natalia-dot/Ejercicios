import { useForm } from "react-hook-form";
import "./DeleteUser.css";
import { deleteUserService } from "../../services";
import { useAuth } from "../../contexts/authContext";
import Swal from "sweetalert2/dist/sweetalert2.all";
import { useEffect, useState } from "react";
import { useDeleteUserError } from "../../hooks";

export const DeleteUser = () => {
  const { register, handleSubmit } = useForm();
  const { setUser, setDeletedUser } = useAuth();
  const [ res, setRes ] = useState({})
  const [isSent, setIsSent] = useState(false);
  const formSubmit = async(formData) => {
    Swal.fire({
      title: "Are you sure you want to delete your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if(result.isConfirmed){
        setRes(await deleteUserService(formData))
      }
    })
  }

  useEffect(() => {;
    useDeleteUserError(res, setRes, setDeletedUser, setUser)
  }, [res]);


//Error updating references to other models.
  return (
    <div className="profileContent">
      <form className="formWrapDeleteUser" onSubmit={handleSubmit(formSubmit)}>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="false"
          {...register("password",{required: true})}

        />
        <label htmlFor="password">Password</label>
        <button type="submit"> DELETE PROFILE </button>
      </form>
    </div>
  );
};
