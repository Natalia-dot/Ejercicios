import { useForm } from "react-hook-form";
import "./DeleteUser.css";
import { deleteUserService } from "../../services";
import { useAuth } from "../../contexts/authContext";

export const DeleteUser = () => {
  const { register, handleSubmit } = useForm();
  const { setUser, setDeletedUser } = useAuth();
  const formSubmit = (formData) => {
    Swal.fire({
      title: "Are you sure you want to delete your profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(73, 193, 162)",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
    }).then(async (result) => {
      if(result.isConfirmed){
        const res = await deleteUserService();
      }
    })
  }

//Error updating references to other models.
  return (
    <div className="profileContent">
      <form className="formWrapDeleteUser">
      <input
          id="userEmail"
          name="userEmail"
          type="email"
          autoComplete="false"
          {...register("userEmail", {required: true})}
        />
        <label htmlFor="userEmail">Email</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="false"
          {...register("password",{required: true})}

        />
        <label htmlFor="password">Password</label>
        <button> DELETE PROFILE </button>
      </form>
    </div>
  );
};
