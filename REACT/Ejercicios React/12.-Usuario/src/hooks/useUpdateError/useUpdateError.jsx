import Swal from "sweetalert2/dist/sweetalert2.all.js";


export const useUpdateError = (res, setRes, setUser, logout) => {

  let counter;
  if (res?.data) {
    counter = 0;
    res?.data?.testingUpdate?.map((item) => {
      for (let key in item) {
        if (item[key] == false) {
          counter++;
        }
      }
    });
  }

  if (counter == 0) {
    let check = "";

    res?.data?.testingUpdate?.forEach((item) => {
      for (let key in item) {
        if (item[key] == true) {
          check += `-${key}-`;
        }
      }
    });
    if (res?.status == 200) {
      logout();
      setRes(() => ({}));
      return Swal.fire({
        icon: "success",
        title: `User Updated Successfully. Please login.`,
        showConfirmButton: false,
        timer: 2500,
      });
    }
  }

  if (res?.response?.status == 500 || res?.response?.status == 404) {
    setRes(() => ({}));
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sorry, server is being troublesome! Try again later...",
      showConfirmButton: false,
      timer: 1500,
    });
  }

  if (counter != 0) {
    if (res?.status == 200) {
      setRes(() => ({}));
      return Swal.fire({
        icon: "error",
        title: `Something was not updated correctly.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
};