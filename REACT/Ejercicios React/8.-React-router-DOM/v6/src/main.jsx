import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/routes.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>   
  </React.StrictMode>,
);

//<!--EX creamos una 'instancia' de un enrutador que vamos a crear ahora con sus rutas
//EX en una carpeta que se llame routes                                          




