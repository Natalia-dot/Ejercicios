import { getUpdatedToken } from "../../utils";
import { extraConfig } from "../service.config";


//Ex en el userRegister es donde nos vamos a conectar a la db, mas concretamente
//Ex en service.config, en el que vamos a utilizar axios para realizar peticiones http
export const userRegister = async (formData) => {
  const APIRoute = extraConfig();
  return APIRoute.post("/users/register/registerRedirect", formData, {
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
  const APIRoute = extraConfig();
  return APIRoute.post("/users/login", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const codeConfirmationService = async (formData) => {
  const APIRoute = extraConfig();
  return APIRoute.post("/users/check", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const resendEmailService = async (formData) => {
  const APIRoute = extraConfig();
  console.log(formData)
  return APIRoute.post("/users/resend/code", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const autoLoginService = async (formData) => {
  const APIRoute = extraConfig();
  return APIRoute.post("/users/login/autologin", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteUserService = async (formData) => {
  const APIRoute = extraConfig();
  return APIRoute.delete("/users/delete", {data: formData} )
    .then((res) => res)
    .catch((error) => error);
};

export const updateUserService = async (formData) => {
  const APIRoute = extraConfig();
  return APIRoute.patch("/users/update/update", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    },
  })
    .then((res) => res)
    .catch((error) => error);
};

export const forgotPasswordService = async (formData) => {
  const APIRoute = extraConfig();
  return APIRoute.patch("/users/changeUserPassword/changeUserPassword", formData)
    .then((res) => res)
    .catch((error) => error);
};

export const changePasswordService = async (formData) => {
  const APIRoute = extraConfig();
  return APIRoute.patch("/users/changePassword", formData, )
    .then((res) => res)
    .catch((error) => error);
};

export const getLikesById = async () => {
  const APIRoute = extraConfig();
  return APIRoute.get("/users/userByIdLikes", )
    .then((res) => res)
    .catch((error) => error);
};

export const getPopulatedLikesById = async () => {
  const APIRoute = extraConfig();
  return APIRoute.get("/users/populatedAlbums", )
    .then((res) => res)
    .catch((error) => error);
};


  
export const toggleLikedAlbum = async (id) => {
  const APIRoute = extraConfig();
  return APIRoute.patch('/users/setFavAlbum', id, )
    .then((res) => res)
    .catch((error) => error);
};

