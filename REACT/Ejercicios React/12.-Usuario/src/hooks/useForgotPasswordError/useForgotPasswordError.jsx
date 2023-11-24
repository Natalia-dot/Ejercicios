import Swal from "sweetalert2/dist/sweetalert2.all.js";
export const useForgotPasswordError = (res, setRes, setForgotOk) => {

    //sec NO REGISTRADO 404
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.includes("User does not exist.")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Sorry.",
      text: "Enter a valid email address please.",
      showConfirmButton: false,
      timer: 3000,
    });
  }


 //sec EMAIL: AND PASS NOT CHANGED
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.error.includes("Mail not sent and password not changed. Please try again")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "We could not update your password... Please retry.",
      showConfirmButton: false,
      timer: 3000,
    });
  }
 //SEC 200 CORRECT
  if (res?.status == 200) {
    if (res?.data?.sendPassword == true && res?.data?.updateUser == true) {
      setForgotOk(() => true);
      setRes(() => ({}));
      Swal.fire({
        icon: "success",
        title: "All good!",
        text: "You should have received an email with your new password.",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }

  //SEC ERROR SENDING MAIL
  if (
    res?.response?.status == 404 &&
    res?.response?.data?.message.includes("Mail sent but password not changed. Please send the code again.")
  ) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Error send incorrect email",
      text: "We don't change your password, your email isn't valid ❎",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //sec 500 SERVER ERRROR SERVIce

  if (res?.response?.status == 500 && res?.response?.data?.error.includes("Error in password change catch while logged out.")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Ouch!",
      text: "There was an error with the servers... Please try again in a couple minutes, ",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //sec 500 REDIRECT
  if (res?.response?.status == 500 && res?.response?.data?.error.includes("Catch sendPasswordRedirect")) {
    setRes(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Ouch!",
      text: "There was an error with the redirect Please try again in a couple minutes, ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};
