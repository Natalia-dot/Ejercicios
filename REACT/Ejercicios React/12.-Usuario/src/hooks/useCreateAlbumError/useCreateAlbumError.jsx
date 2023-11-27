import Swal from "sweetalert2/dist/sweetalert2.all.js";

export const useCreateAlbumError = (
  res,
  setAlbumCreatedSuccesfully,
  setRes
) => {
  console.log("Esto es la res.response", res?.response);
  console.log("mensaje de error!!!!!", res?.response?.data?.message);

  if (res.status == 200) {
    console.log(res);

    Swal.fire({
      icon: "success",
      title: "Album created",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes({});
    setAlbumCreatedSuccesfully(() => true);
  }

  if (
    res?.response?.data?.message.includes(
      "Album is already in database. Please retry."
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Don't worry! That albums is already here",
      showConfirmButton: false,
      timer: 4500,
    });
    setRes({});
  }
  if (res?.response?.data?.message?.includes("Error in album creation.")) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Sorry! We had some trouble. Try again later.",
      showConfirmButton: false,
      timer: 3000,
    });
    setRes({});
  }
  if (
    res?.response?.data?.message?.includes("Album was not saved. Please retry.")
  ) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Album was not saved. Please retry.",
      showConfirmButton: false,
      timer: 2500,
    });
    setRes({});
  }
};
