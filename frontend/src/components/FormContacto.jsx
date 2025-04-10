import { useState } from 'react';

export const FormContacto = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });

  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario a tu backend
    console.log('Formulario enviado:', formData);
    setEnviado(true);
    setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    
    // Resetear mensaje después de 5 segundos
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {enviado && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
          ¡Mensaje enviado con éxito! Nos contactaremos pronto.
        </div>
      )}

      <div>
        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
          Nombre completo
        </label>
        <input
          type="text"
          id="nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({...formData, nombre: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>

      <div>
        <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
          Asunto
        </label>
        <select
          id="asunto"
          value={formData.asunto}
          onChange={(e) => setFormData({...formData, asunto: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        >
          <option value="">Selecciona un asunto</option>
          <option value="consulta">Consulta general</option>
          <option value="soporte">Soporte técnico</option>
          <option value="cita">Agendar cita</option>
          <option value="otros">Otros</option>
        </select>
      </div>

      <div>
        <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          rows="5"
          value={formData.mensaje}
          onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        ></textarea>
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Enviar mensaje
        </button>
      </div>
    </form>
  );
};