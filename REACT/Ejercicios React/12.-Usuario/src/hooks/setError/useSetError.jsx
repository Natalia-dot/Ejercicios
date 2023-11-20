import Swal from "sweetalert2/dist/sweetalert2.all.js";

//Ex aqui vamos a settear todos los posibles errores que nos devuelva la res, o la respuesta correcta.
//Ex en caso de que la res sea 200 vamos a settear sucessfulregister a true para que nos mande despues
//Ex de la alerta al codeConfirmation

 export const useSetError = (res, setRes, setSuccessfulRegister)=> {
  console.log("ESta es la res", res)
  console.log("mensaje de error!!!!!", res?.response?.data?.message)
  console.log("Esto es solo la response", res?.response)

    if (res.status == 200) {
        setSuccessfulRegister(()=> true)
        Swal.fire({
            icon: "success",
            title: "Welcome to my Page 💌",
            showConfirmButton: false,
            timer: 1500,
          });
          setRes({});
    }
    if (res?.response?.status === 409) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your email is incorrect !❎",
            showConfirmButton: false,
            timer: 1500,
          });
          setRes({});
    }
    if (res?.response?.data?.message.includes("validation failed: password")){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Min 8 characters, 1 upper case, 1 lower case and a special character ❎",
            showConfirmButton: false,
            timer: 3000,
          });
          setRes({});
    }
    if (
        res?.response?.data?.message.includes(
          "E11000 duplicate key error collection: userProyect.users"
        )
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Sorry choose another name ❎",
          showConfirmButton: false,
          timer: 1500,
        });
        setRes({});
      }
      if (res?.response?.status == 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Interval server error!❎ Please try again.",
          showConfirmButton: false,
          timer: 1500,
        });
        setRes({});
      }
 }