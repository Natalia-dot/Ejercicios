import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useChangePasswordError = (res, setRes, setUser) => {
console.log("Esta es la res en el error", res)

//sec 200 CORRECT
  if (res?.status == 200) {
    setUser(() => null);
    localStorage.removeItem("user");
    setRes(() => ({}));
    return Swal.fire({
      icon: "success",
      title: "Password changed successfully, please login again.",
      showConfirmButton: false,
      timer: 1500,
    });
  }


//sec 404 internal server error
  if (res?.response?.data.includes("Password not updated." || "Error updating password.") == "false") {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Sorry!",
      text: "We had some errors, please try again.",
      showConfirmButton: false,
      timer: 2500,
    });
  }


//sec 404 old password incorrect
  if (res?.response?.data.includes("Password is not correct. Please input your password.")) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Incorrect password.",
      text: "Your old password is not correct. Please retry.",
      showConfirmButton: false,
      timer: 3000,
    });
  }

//sec 404 formato iuncorrecto
  if (res?.response?.data?.includes("Password needs one special character, 8 minimum letters, one in uppercase and at least a number.")) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Incorrect password format",
      text: "Password needs one special character, 8 minimum letters, one in uppercase and at least a number.",
      showConfirmButton: false,
      timer: 5000,
    });
  }

//sec 500 internal server error
  if (res?.response?.status == 500) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Interval Server Error ❎!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
