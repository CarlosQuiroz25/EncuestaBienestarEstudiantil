import React, { useState } from 'react';
import { Input } from '../components/input/input'; // Asegúrate de que la ruta sea correcta
import { Button } from '../components/botton/botton'; // Asegúrate de que la ruta sea correcta
import { Link, useNavigate } from 'react-router-dom';

export function Register() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

    // Verificar si el usuario ya existe (opcional, pero buena práctica)
    const usuarioExistente = localStorage.getItem('usuarioRegistrado');
    if (usuarioExistente && JSON.parse(usuarioExistente).nombre === nombre) {
      setError('Este nombre de usuario ya está registrado.');
      return;
    }

    const nuevoUsuario = { nombre, contraseña };
    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));
    setError('');
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigate('/login'); // Redirigir al usuario a la página de login después del registro
  };

  return (
    <main className="font-sans bg-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-marian-blue/20 flex flex-col gap-8 backdrop-filter backdrop-blur-lg min-w-96 p-10 rounded-lg shadow-lg">
        <h2 className="font-bold text-2xl text-black text-center mb-6">
          Crear Cuenta
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
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

          <div>
            <Button type="submit" className="w-full text-white">
              Crear Cuenta
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          {/* Link para volver a la página de login */}
          <Link
            to="/login"
            className="font-medium text-sm text-indigo-900 hover:text-indigo-600"
          >
            ¿Ya tienes una cuenta? Iniciar sesión
          </Link>
        </div>
      </div>
    </main>
  );
}