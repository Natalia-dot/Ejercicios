import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; //useNavigate no lo vamos a utilizar aqui
//porque el contexto esta fuera del router,por lo que no puede acceder a las rutas hijas

const AuthorizationContext = createContext();
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
    const [completeUserInfo, setCompleteUserInfo] = useState({
        data: {
            user: {
                userEmail: "",
                password: "",
            },
            confirmationEmailCode: "",
        }
    })

    //!todo tenemos que hacer el puente aqui pero me espero a manana


    //ex este es el login en el que vamos a meter el user en el localstorage que nos han pasado como string, y luego
    //ex lo parseamos a objeto de javascript para poder settearlo como estado y poder referenciarlo en los servicios
    //ex de autenticacion
    const login = (data) => {
        localStorage.setItem("user", data);
        setUser(JSON.parse(data)) //fix esto se puede hacer?
    }

    //ex en el logout vamos a quitar los datos asociados a la clave "user" (que hemos metido en el login),
    //ex y a borrar los datos del estado. Es todo deshacerlo de la misma manera que lo hicimos.
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }

    //ex por ultimo vamos a hacer un useMemo para que en el contexto persistan todas las funciones y setteos de 
    //ex estado que hemos hecho. puesto que useMemo solo memoiza el return de las funciones, tenemos que retornar
    //ex las funciones que queramos mantener dentro de este useMEmo

    const value = useMemo(()=>({
        user,
        setUser,
        completeUserInfo,
        setCompleteUserInfo,
        login,
        logout,
        //!todo falta el bridge!

    }),[user])
    //ex esta "dependencia", significa que va a volver a memoizar cuando cambie user, que la tenemos mas arriba
    //ex (el estado)

    return <AuthorizationContext.Provider value={value}>{children}</AuthorizationContext.Provider>
    /*ex aqui estamos senalando a lo que acabamos de crear (authorizationContext), y estamos senalando
    //ex a su provider, para establecerle el valor value al return de useMemo, por eso hemos utilizado
    //ex useMemo, para poder devolverlo y que cambie a su vez cada vez que cambia [user], gracias a las
    //ex dependencias y a su similitud con un useEffect sintacticamente(en cuanto a su significado), y 
    //ex gracias a estas funciones con las que hemos provisto al provider con useMemo, podremos recurrir
    //ex a ellas en toda nuestra aplicacion(children)
    
    
    //ex */
}

export const useAuth = () => useContext(AuthorizationContext)