import Swal from "sweetalert2/dist/sweetalert2.all";

export const useDeleteUserError = (res, setRes, setDeletedUser, setUser) => {
  console.log(res);
  if (res?.status == 200) {
    Swal.fire({
      icon: "success",
      title: "Delete User",
      text: "See you soon",
      showConfirmButton: false,
      timer: 1500,
    });

    setUser(() => null);
    setDeletedUser(() => true);
    localStorage.removeItem("user");
    setRes(() => ({}));
  }

  if (
    res?.response?.data?.includes(
      "Error in input fields, please check spelling and try again."
    )
  ) {
    Swal.fire({
      icon: "error",
      title: "Data incorrect.",
      text: "Verify input fields and retry.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
  }

  if (
    res?.response?.data?.includes("Error updating references to other models.")
  ) {
    Swal.fire({
      icon: "error",
      title: "User deleted but references remain.",
      text: ":( We will miss you.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
  }

  if (res?.response?.data?.includes("User not deleted. Please try again.")) {
    Swal.fire({
      icon: "error",
      title: "Sorry, your user was not deleted.",
      text: "There was an error, please try again.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
  }

  if (res?.response?.data?.error?.includes("'Error in delete catch'")) {
    Swal.fire({
      icon: "error",
      title: "Server error.",
      text: "Try again later.",
      showConfirmButton: false,
      timer: 1500,
    });
    setRes(() => ({}));
  }
};
