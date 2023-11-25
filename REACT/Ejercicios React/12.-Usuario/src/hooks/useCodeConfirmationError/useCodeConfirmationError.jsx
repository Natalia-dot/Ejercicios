import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCodeConfirmationError = (
  res,
  setRes,
  setCodeConfirmationSuccessful,
  setDeletedUserSuccessful,
  login,
  setUserNotFound
) => {
  //sec EMAIL VALIDATION UPDATE WORKED 200
  if (res?.data?.testCheckUser?.toString() == "true") {
    if (localStorage.getItem("user")) {
      //tip vamos a settear el isVerified al estado de user si viene ddesde
      //tip el login, es decir, que tiene "user" en el localStorage
      const localStorageUser = localStorage.getItem("user");
      console.log(localStorageUser)
      const parsedUserToEditLocalStorageUser = JSON.parse(localStorageUser);
      const userToSetInLogin = {
        ...parsedUserToEditLocalStorageUser,
        isVerified: true,
      };
      const stringifiedUserToSetInLogin = JSON.stringify(userToSetInLogin);
      login(stringifiedUserToSetInLogin);
    }
    setCodeConfirmationSuccessful(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "success",
      title: "Code is correct! Welcome.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //sec EMAIL VALIDATION UPDATE FAILED 200
  if (res?.data?.isVerified?.toString() == "false") {
    // el codigo si era correcto pero el actualizar en el back el check no se ha producido correctamente
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Ouch...",
      text: "Sorry, we had internal problems, try again.",
      showConfirmButton: false,
      timer: 2500,
    });
  }


  //SEC NOT FOUND
  if (res?.response?.data?.message?.includes("User not found.")) {
    setRes(() => ({}));
    setUserNotFound(()=> true)
    Swal.fire({
      icon: "error",
      title: "User is not in the database.",
      text: "Whoops...",
      showConfirmButton: false,
      timer: 2500,
    });
  }


  //sec DELETED, INCORRECT CODE
  if (
    res?.response?.data?.delete?.includes(
      "User deleted for security. Please submit again."
    )
  ) {
    // esto le enviamos al register porque le henmos borrrado el usuario
    setDeletedUserSuccessful(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "incorrect code.",
      text: "Sorry that was incorrect! Your user was deleted. Try registering again.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //SEC NOT DELETED, ERROR WHILE DELETING
  if (res?.response?.data?.delete?.includes("Error deleting user.")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Sorry, try again.",
      text: "Incorrect code, please retry.",
      showConfirmButton: false,
      timer: 2500,
    });
  }

  //SEC
  if (res?.response?.data?.includes("Error in updating validation.")) {
    setUserNotFound(() => true);
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Internal server error.",
      text: "Ohh! An internal server error. Please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //sec  SERVER 500
  if (res?.response?.status == 500) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Server error! Please come back in a little.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
  }
};
