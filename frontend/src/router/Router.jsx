import Layout from "../layuot";
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Servicios } from '../pages/Servicios';
import { Agenda } from '../pages/Agenda';
import { Contacto } from '../pages/Contacto';
import Encuesta from '../pages/Encuesta';

export const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },{
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
        path: "*",
        element: <div className="text-center py-20"><h1 className="text-4xl font-bold">404 - Página no encontrada</h1></div>,
      }
    ],
  },
];