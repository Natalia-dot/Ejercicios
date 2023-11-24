import { getUpdatedToken } from "../../utils";
import { APIUser } from "../service.config";

//Ex en el userRegister es donde nos vamos a conectar a la db, mas concretamente
//Ex en service.config, en el que vamos a utilizar axios para realizar peticiones http
export const userRegister = async (formData) => {
  return APIUser.post("/users/register/registerRedirect", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => res)
    .catch((error) => error);
};

//ex a userRegister le vienen los datos desde el mismo register, y aqui trae el enrutador de la api (que finalmente he decidido
//ex hacer general), y hacemos el metodo correspondiente de nuestro backend, en cuyo caso es el register.
//ex Le pasamos el body(formData), y los headers si es necesario cambiar alguno. Como en nuestro config esta
//ex puesto por defecto como json, hay que modificarlo a multipart, ya que puede que nos entre una imagen.
//EX Luego cuando la promesa se resuelve y todo esto se completa, (.then), devolvemos la respuesta, y si da
//ex error, lo capturamos y devolvemos

export const loginService = async (formData) => {
  return APIUser.post("/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const codeConfirmationService = async (formData) => {
  return APIUser.post("/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const resendEmailService = async (formData) => {
  return APIUser.post("resend", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const autoLoginService = async (formData) => {
  return APIUser.post("/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteUserService = async () => {
  return APIUser.delete("/deleteUser", {
    headers: {
      Authorization: `Bearer ${getUpdatedToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const updateUserService = async (formData) => {
  return APIUser.patch("/update/update", formData, {
    headers: {
      Authorization: `Bearer ${getUpdatedToken()}`,
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const forgotPasswordService = async (formData) => {
  return APIUser.patch("/changeUserPassword/changeUserPassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const changePasswordService = async (formData) => {
  return APIUser.patch("/changePassword", formData, {
    headers: {
      Authorization: `Bearer ${getUpdatedToken()}`,
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
