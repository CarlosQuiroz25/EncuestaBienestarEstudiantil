import React, { useState } from 'react';
import { Input } from '../components/input/input';
import { Button } from '../components/botton/botton';
import { Link, useNavigate } from 'react-router-dom';
import { RecuperarContrasena } from './RecuperarContrasena';

export function Login() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre === '' || contraseña === '') {
      setError('Por favor, completa todos los campos.');
      return;
    }

    const usuarioGuardado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

    if (
      usuarioGuardado &&
      usuarioGuardado.nombre === nombre &&
      usuarioGuardado.contraseña === contraseña
    ) {
      setError('');
      alert('Inicio de sesión exitoso');
      navigate('/');
    } else {
      setError('Nombre o contraseña incorrectos');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (nombre === '' || contraseña === '' || confirmarContraseña === '') {
      setError('Por favor, completa todos los campos para registrarte.');
      return;
    }
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const nuevoUsuario = { nombre, contraseña };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
    setError('');
    alert('Registro exitoso. Ahora inicia sesión.');
    setIsRegistering(false);
    setNombre('');
    setContraseña('');
    setConfirmarContraseña('');
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

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={isRegistering ? handleRegister : handleSubmit}>
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
              Nombre de usuario
            </label>
            <div className="mt-1">
              <Input
                id="nombre"
                type="text"
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
                  value={confirmarContraseña}
                  onChange={(e) => setConfirmarContraseña(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <Button type="submit" className="w-full text-white">
              {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center flex flex-col items-center gap-2">
          <Link
            to="/recuperar-contrasena"
            className="font-medium text-sm text-indigo-900 hover:text-indigo-600 "
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <button
            onClick={toggleForm}
            className="font-medium text-sm text-indigo-900 hover:text-indigo-600"
          >
            {isRegistering
              ? '¿Ya tienes una cuenta? Inicia sesión'
              : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
    </div>
    </main >
  );
}
