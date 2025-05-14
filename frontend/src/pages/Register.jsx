import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const nuevoUsuario = { nombre, email, password };

    // Simulación de registro
    localStorage.setItem('usuarioRegistrado', JSON.stringify(nuevoUsuario));

    alert('Cuenta creada correctamente. Ahora inicia sesión.');
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear cuenta</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" placeholder="Nombre" className="w-full p-2 border rounded" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        <input type="email" placeholder="Correo electrónico" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
