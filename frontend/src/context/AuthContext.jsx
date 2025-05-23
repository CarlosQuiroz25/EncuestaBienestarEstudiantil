import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const usuarios = [
  { username: 'admin', password: 'admin123', rol: 'admin', nombre: 'Administrador' },
  { username: 'estudiante', password: 'estudiante123', rol: 'estudiante', nombre: 'Estudiante' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('usuario');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username, password) => {
    const usuarioValido = usuarios.find(u => u.username === username && u.password === password);
    if (usuarioValido) {
      localStorage.setItem('usuario', JSON.stringify(usuarioValido));
      setUser(usuarioValido);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
