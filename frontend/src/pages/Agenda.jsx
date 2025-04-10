import { useState } from 'react';
import { Calendario } from '../components/Calendario';
import { FormularioCita } from '../components/FormularioCita';
import { formatearFecha } from '../utils/fechaUtils';

export const Agenda = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [citas, setCitas] = useState([
    // Ejemplo de citas existentes
    {
      id: 1,
      titulo: 'Asesoría Psicológica',
      fecha: '2024-06-15',
      hora: '10:00',
      estado: 'confirmada'
    }
  ]);

  const handleSeleccionFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMostrarFormulario(true);
  };

  const handleAgregarCita = (nuevaCita) => {
    setCitas([...citas, {
      id: citas.length + 1,
      ...nuevaCita,
      fecha: fechaSeleccionada.toISOString().split('T')[0], // Formato YYYY-MM-DD
      estado: 'pendiente'
    }]);
    setMostrarFormulario(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... (encabezado igual) ... */}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Calendario */}
          <div className="lg:col-span-2">
            <Calendario 
              citas={citas} 
              onSeleccionFecha={handleSeleccionFecha} 
            />
          </div>

          {/* Sección derecha */}
          <div className="space-y-6">
            {mostrarFormulario && fechaSeleccionada && (
              <FormularioCita 
                fechaSeleccionada={fechaSeleccionada}
                onCancelar={() => setMostrarFormulario(false)}
                onConfirmar={handleAgregarCita}
              />
            )}

            {/* Próximas citas (actualizado) */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-4">Próximas citas</h3>
              {citas.length > 0 ? (
                <ul className="space-y-3">
                  {citas
                    .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                    .map(cita => (
                      <li key={cita.id} className="border-b pb-3 last:border-0">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium">{cita.titulo}</p>
                            <p className="text-sm text-gray-600">
                              {formatearFecha(cita.fecha)} a las {cita.hora}
                            </p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            cita.estado === 'confirmada' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {cita.estado}
                          </span>
                        </div>
                      </li>
                    ))
                  }
                </ul>
              ) : (
                <p className="text-gray-500">No tienes citas programadas</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};