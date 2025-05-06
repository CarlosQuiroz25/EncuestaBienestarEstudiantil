import React, { useState } from 'react';
import { Input } from '../components/input/input';
import { Button } from '../components/botton/botton';
import { Link, useNavigate } from 'react-router-dom';

export function Login({ setUser }) {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit llamado'); // Asegurémonos de que se llama
    if (nombre === '' || contraseña === '') {
      setError('Por favor, completa todos los campos.');
      return;
    }
    setError('');
    localStorage.setItem('usuario', nombre);
    setUser([nombre]);
    console.log('Navegando desde handleSubmit'); // Nuevo log
    navigate('/');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log('handleRegister llamado'); // Asegurémonos de que se llama
    console.log('Valores al inicio de handleRegister:', { nombre, contraseña, confirmarContraseña });
    if (nombre === '' || contraseña === '' || confirmarContraseña === '') {
      setError('Por favor, completa todos los campos para registrarte.');
      console.log('Error: Campos incompletos');
      return;
    }
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      console.log('Error: Contraseñas no coinciden');
      return;
    }
    setError('');
    console.log('Registro exitoso (simulado):', { nombre, contraseña });
    localStorage.setItem('usuario', nombre);
    localStorage.setItem('contraseña', contraseña);
    setUser([nombre]);
    console.log('Navegando desde handleRegister'); // Nuevo log
    navigate('/');
  };

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    setError('');
  };

  return (
    <main className="font-sans bg-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-marian-blue/20 flex flex-col gap-8 backdrop-filter backdrop-blur-lg min-w-96 p-10 rounded-lg shadow-lg">
        <h2 className="font-bold text-2xl text-black text-center mb-6">
          {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
        </h2>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>}

        <form className="space-y-6" onSubmit={isRegistering ? handleRegister : handleSubmit}>
          {/* ... (resto del formulario) ... */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <div className="mt-1">
              <Input
                id="nombre"
                type="text"
                className="shadow-sm focus:ring-indigo-900 focus:border-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div className="mt-1">
              <Input
                id="contraseña"
                type="password"
                className="shadow-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>
          </div>

          {isRegistering && (
            <div>
              <label htmlFor="confirmarContraseña" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <div className="mt-1">
                <Input
                  id="confirmarContraseña"
                  type="password"
                  className="shadow-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md"
                  value={confirmarContraseña}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-marian-blue hover:bg-marian-blue/90"
            >
              {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button onClick={toggleForm} className="font-medium text-sm text-indigo-900 hover:text-indigo-600">
            {isRegistering ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </main>
  );
}