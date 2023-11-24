import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom"
import "./index.css";
import { router } from "./routes/routes.jsx";
import { AuthContextProvider } from "./contexts/authContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
