// src/router/RutaProtegida.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export const RutaProtegida = ({ children }) => {
  const { usuario } = useAuth();
  
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};