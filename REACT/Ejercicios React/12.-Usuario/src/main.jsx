import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"
import "./index.css";
import { router } from "./routes/routes.jsx";
import { authContextProvider } from "./contexts/Auth.context.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <authContextProvider>
    <RouterProvider router={router} />
    </authContextProvider>
  </React.StrictMode>
);
