import { createBrowserRouter } from "react-router-dom";
import { Home, Register } from "../pages";
import { App } from "../App";

export const router = createBrowserRouter([
    {path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/register",
            element: <Register />
        }
    ]
}
])