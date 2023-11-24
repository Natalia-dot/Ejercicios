import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useEmailResendError = (
  resResend,
  setResResend,
  setUserNotFound
) => {
console.log(resResend)
//sec RESEND DONE SUCCESSFUL 200
  if (resResend?.data?.resendDone.toString() == "true") {
    setResResend(() => ({}));
    Swal.fire({
      icon: "success",
      title: "Resend done, please check your email.",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  //sec RESEND DONE FAILED 200
  if (resResend?.data?.resendDone.toString() == "false") {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Error sending the email! Please try again",
      showConfirmButton: false,
      timer: 1500,
    });
  }

//sec USER NOT FOUND 404
  if (
    resResend?.response?.status == 404 &&
    resResend?.response?.data.includes("User does not exist.")
  ) {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Interval server error.",
      text: "Resend failed, try again.",
      showConfirmButton: false,
      timer: 1500,
    });
    setUserNotFound(() => true);
  }
  // 500 ----------> interval server error
  if (resResend?.response?.status == 500) {
    setResResend(() => ({}));
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "We had a server error! The email was not sent, please try again.",
      showConfirmButton: false,
      timer: 2500,
    });
  }
};
