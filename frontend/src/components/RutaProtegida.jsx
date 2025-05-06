import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const RutaProtegida = ({ children, rolesPermitidos }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (!rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/no-autorizado" />;
  }

  return children;
};