import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import { AboutMe, Gallery, Home, NotFound, SingleElement } from "../pages"

//<!--EX Creamos el router para el routerProvider con un elemento principal que printea lo fijo en la pagina
//EX que seria el Header, el Footer, y el Main, que es lo que va a cambiar en esencia (el outlet), y creamos
//EX una clave children para meter las rutas hijas que existen en App

export const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/gallery",
                element: <Gallery />
            },
            {
                path: "/aboutMe",
                element: <AboutMe />
            },
            {
                path: "/gallery/:category/:id",
                element: <SingleElement />
            },
            {
                path: "*",
                element: <NotFound />
            }
        ]
    }
])