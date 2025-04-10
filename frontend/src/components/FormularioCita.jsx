import { useState } from 'react';
import { formatearFecha } from '../utils/fechaUtils';

export const FormularioCita = ({ fechaSeleccionada, onCancelar, onConfirmar }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    hora: '10:00',
    descripcion: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmar({
      ...formData,
      hora: formData.hora
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">
        Agendar para {formatearFecha(fechaSeleccionada)}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({...formData, titulo: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hora
          </label>
          <select
            value={formData.hora}
            onChange={(e) => setFormData({...formData, hora: e.target.value})}
            className="w-full p-2 border rounded"
            required
          >
            {['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'].map(hora => (
              <option key={hora} value={hora}>{hora}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            value={formData.descripcion}
            onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onCancelar}
            className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Agendar
          </button>
        </div>
      </form>
    </div>
  );
};