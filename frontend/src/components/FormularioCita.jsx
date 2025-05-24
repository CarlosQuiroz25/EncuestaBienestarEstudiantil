// src/components/FormularioCita.jsx
import { useState } from 'react';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import { FaCalendarPlus, FaClock, FaTag, FaTimes, FaCheck } from 'react-icons/fa'; // Importamos iconos útiles

export const FormularioCita = ({ fechaSeleccionada, onCancelar, onConfirmar }) => {
  const [titulo, setTitulo] = useState('');
  const [hora, setHora] = useState('');
  const [error, setError] = useState(''); // Estado para manejar mensajes de error

  const handleChange = (e) => {
    // Actualiza el estado del campo y limpia cualquier mensaje de error existente
    if (e.target.id === 'titulo') {
      setTitulo(e.target.value);
    } else if (e.target.id === 'hora') {
      setHora(e.target.value);
    }
    setError(''); // Limpiar error al empezar a escribir de nuevo
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // Limpiamos errores anteriores antes de la validación

    // Validaciones básicas
    if (!titulo.trim() || !hora.trim()) {
      setError('Por favor, completa tanto el título como la hora de la cita.');
      return;
    }

    // Validación de la hora (formato HH:MM)
    const timeRegex = /^(?:2[0-3]|[01]?[0-9]):(?:[0-5]?[0-9])$/;
    if (!timeRegex.test(hora)) {
      setError('Por favor, introduce una hora válida en formato HH:MM (ej. 09:30).');
      return;
    }

    // Si todas las validaciones pasan, confirma la cita
    onConfirmar({ titulo, hora });
    setTitulo(''); // Limpia el formulario
    setHora('');   // Limpia el formulario
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-100 animate-fade-in"> {/* Contenedor principal con estilo de tarjeta */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
        <FaCalendarPlus className="mr-3 text-blue-600" /> Nueva Cita para el{' '}
        <span className="text-indigo-700 ml-2">
          {format(fechaSeleccionada, 'PPP', { locale: es })} {/* Muestra la fecha seleccionada */}
        </span>
      </h3>

      {/* Mensaje de error (visible solo si hay un error) */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-5 py-3 rounded-lg shadow-md mb-6 animate-fade-in text-center text-base font-medium flex items-center justify-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6"> {/* Mayor espacio entre elementos del formulario */}
        {/* Campo Título de la Cita */}
        <div>
          <label htmlFor="titulo" className="block text-base font-semibold text-gray-800 mb-2 items-center">
            <FaTag className="mr-2 text-gray-500" /> Título de la Cita
          </label>
          <input
            type="text"
            id="titulo"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
            value={titulo}
            onChange={handleChange}
            placeholder="Ej: Asesoría Psicológica, Tutoría de Matemáticas"
            required
          />
        </div>

        {/* Campo Hora de la Cita */}
        <div>
          <label htmlFor="hora" className="block text-base font-semibold text-gray-800 mb-2 items-center">
            <FaClock className="mr-2 text-gray-500" /> Hora de la Cita
          </label>
          <input
            type="time"
            id="hora"
            className="w-full px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-400 focus:border-blue-400 transition-all duration-200 text-gray-800"
            value={hora}
            onChange={handleChange}
            required
          />
        </div>

        {/* Botones de acción: Cancelar y Confirmar */}
        <div className="flex justify-end space-x-3 mt-8"> {/* Alinea botones a la derecha con espacio */}
          <button
            type="button"
            onClick={onCancelar}
            className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 flex items-center justify-center"
          >
            <FaTimes className="mr-2" /> Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
          >
            <FaCheck className="mr-2" /> Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};