// src/components/FormContacto.jsx
import { useState } from 'react';
import { Button } from './botton/botton'; // Asumo que tu componente Button ya tiene sus propios estilos

export const FormContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState(''); // Nuevo estado para manejar errores de validación

  const handleChange = (e) => {
    // Actualiza el estado del formulario y limpia el error al escribir
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) setError(''); // Limpia el mensaje de error cuando el usuario comienza a escribir
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto de recargar la página

    // Validaciones básicas del formulario
    if (!formData.nombre.trim() || !formData.email.trim() || !formData.asunto.trim() || !formData.mensaje.trim()) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    // Validación de formato de email simple
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Por favor, introduce un correo electrónico válido.');
      return;
    }

    // Lógica para enviar el formulario (en un entorno real, aquí iría una llamada a API)
    console.log('Formulario enviado:', formData);
    setEnviado(true); // Muestra el mensaje de éxito
    setError('');     // Asegurarse de limpiar cualquier error previo

    // Restablece el formulario a sus valores iniciales
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });

    // Oculta el mensaje de éxito después de 5 segundos
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6"> {/* Espacio vertical entre los elementos del formulario */}
      {/* Mensaje de éxito (visible solo si el formulario fue enviado) */}
      {enviado && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-5 py-3 rounded-lg shadow-md animate-fade-in text-center text-base font-medium">
          <p className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            ¡Mensaje enviado con éxito! Nos contactaremos contigo pronto.
          </p>
        </div>
      )}

      {/* Mensaje de error (visible solo si hay un error de validación) */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg shadow-md animate-fade-in text-center text-base font-medium">
          <p className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            {error}
          </p>
        </div>
      )}

      {/* Campo Nombre completo */}
      <div>
        <label htmlFor="nombre" className="block text-base font-semibold text-gray-800 mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
          placeholder="Tu nombre completo"
          required
        />
      </div>

      {/* Campo Correo electrónico */}
      <div>
        <label htmlFor="email" className="block text-base font-semibold text-gray-800 mb-2">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
          placeholder="ejemplo@dominio.com"
          required
        />
      </div>

      {/* Campo Asunto (Dropdown/Select) */}
      <div className="relative"> {/* 'relative' para posicionar la flecha personalizada si la usas */}
        <label htmlFor="asunto" className="block text-base font-semibold text-gray-800 mb-2">
          Asunto
        </label>
        <select
          id="asunto"
          value={formData.asunto}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 bg-white text-gray-800 appearance-none pr-8" // 'appearance-none' para quitar la flecha por defecto del navegador
          required
        >
          <option value="">Selecciona un asunto</option>
          <option value="consulta">Consulta general</option>
          <option value="soporte">Soporte técnico</option>
          <option value="cita">Agendar cita</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      {/* Campo Mensaje (Textarea) */}
      <div>
        <label htmlFor="mensaje" className="block text-base font-semibold text-gray-800 mb-2">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows="5"
          value={formData.mensaje}
          onChange={handleChange}
          className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800 resize-y" // 'resize-y' permite redimensionar solo verticalmente
          placeholder="Escribe tu mensaje aquí..."
          required
        ></textarea>
      </div>

      {/* Botón de envío, usando tu componente 'Button' */}
      <Button type="submit">Enviar mensaje</Button>
    </form>
  );
};