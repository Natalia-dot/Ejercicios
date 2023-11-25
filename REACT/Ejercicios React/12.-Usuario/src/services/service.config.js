import { getUpdatedToken } from "../utils";
import axios from "axios";

const APIHeaders = {
    Accept: "application/json",
    "Content-Type":"application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization:`Bearer ${getUpdatedToken()}`
}

export const APIUser = axios.create({
    baseURL: "http://localhost:8088/api/v1",
    headers: APIHeaders,
    timeout: 60000,
})

//Ex aqui vamos a crear los headers del 'enrutador' de axios para users. Le establecemos
//ex lo apiheaders por defecto para que funcione, y un util de verificacion en caso de que lo
//ex necesitemos en alguna pagina con verificacion. Y creamos el enrutador APIUSER con la url de base de
//ex usuarios, los headers correspondientes y el tiempo permitido de espera