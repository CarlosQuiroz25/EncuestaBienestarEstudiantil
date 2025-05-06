import { useState } from 'react';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';

export const FormularioCita = ({ fechaSeleccionada, onCancelar, onConfirmar }) => {
  const [titulo, setTitulo] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !hora) return;
    onConfirmar({ titulo, hora });
    setTitulo('');
    setHora('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Nueva cita para el {format(fechaSeleccionada, 'PPP', { locale: es })}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Hora</label>
          <input
            type="time"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};
