import Layout from "../Layout";
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Servicios } from '../pages/Servicios';
import { Agenda } from '../pages/Agenda';
import { Contacto } from '../pages/Contacto';
import Encuesta from '../pages/Encuesta';
import { RecuperarContrasena } from "../pages/RecuperarContrasena";
import { NoEncontrado } from "../pages/NoEncontrado";
import { ConfirmacionRecuperacion } from "../pages/ConfirmacionRecuperacion";
import { PanelAdmin } from "../pages/PanelAdmin";
import { Register } from '../pages/Register';
import DetalleServicio from "../pages/DetallesServicio";

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      }, {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/servicios",
        element: <Servicios />,
      },
      {
        path: "/agenda",
        element: <Agenda />,
      },
      {
        path: "/contacto",
        element: <Contacto />,
      },
      {
        path: "/encuesta",
        element: <Encuesta />,
      },
      {
        path: "/recuperar-contrasena",
        element: <RecuperarContrasena />,
      },
      {
        path: "*",
        element:<NoEncontrado/>
      },
      {
        path: "/confirmacion-recuperacion",
        element: <ConfirmacionRecuperacion />,
      },
      {
        path: "/panel",
        element:<PanelAdmin/>,
      },
      {
        path: "/register",
        element:<Register/>,
      },
        {
       path: "/servicios/:id", 
       element: <DetalleServicio />,
       },
      {
        path: "*",
        element: <div className="text-center py-20"><h1 className="text-4xl font-bold">404 - Página no encontrada</h1></div>,
      },
    ],
  },
];