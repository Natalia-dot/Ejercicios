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