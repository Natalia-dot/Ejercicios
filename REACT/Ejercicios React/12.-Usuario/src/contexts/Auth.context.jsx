import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; //useNavigate no lo vamos a utilizar aqui
//porque el contexto esta fuera del router,por lo que no puede acceder a las rutas hijas

const AuthorizationToken = createContext();
//ex 1.Creamos el contexto

export const authContextProvider = ({ children }) => {
    //ex aqui vamos a meterle el provider de contexto al proveedor
    //ex lo primero que hacemos es dar el estado que nos va a recoger el user del localStorage.
    //ex vamos a setear el useState con un valor de, si encuentra user en el local storage,
    //ex de user, y si no, null.
    const [user, setUser] = useState(()=> {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    })

    //ex aqui vamos a crear otro useState para setear toda la informacion completa del usuario,
    //ex que aun para el registration no la vamos a utilizar
    const [completeUserInfo, setCompleteUSerInfo] = useState({
        data: {
            user: {
                userEmail: "",
                password: "",
            },
            confirmationEmailCode: "",
        }
    })

}
