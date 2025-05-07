// src/pages/Agenda.jsx
import { useState } from 'react';
import { Calendario } from '../components/Calendario';
import { FormularioCita } from '../components/FormularioCita';
import { formatearFecha } from '../utils/fechaUtils';

export const Agenda = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [citas, setCitas] = useState([
    {
      id: 1,
      titulo: 'Asesoría Psicológica',
      fecha: '2025-06-15',
      hora: '10:00',
      estado: 'confirmada'
    }
  ]);

  const handleSeleccionFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMostrarFormulario(true);
  };

  const handleAgregarCita = (nuevaCita) => {
    setCitas([
      ...citas,
      {
        id: citas.length + 1,
        ...nuevaCita,
        fecha: fechaSeleccionada.toISOString().split('T')[0],
        estado: 'pendiente'
      }
    ]);
    setMostrarFormulario(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/fondo.jpg')" }}
    >
      <div className="bg-white bg-opacity-80 min-h-screen">
        <header className="bg-white-600 text-marian-blue py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Agenda de Bienestar Estudiantil</h1>
            <p className="text-lg">Gestiona y programa tus citas de apoyo académico y emocional.</p>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendario */}
            <div className="lg:col-span-2">
              <Calendario citas={citas} onSeleccionFecha={handleSeleccionFecha} />
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

              {/* Próximas citas */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Próximas Citas</h3>
                {citas.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {citas
                      .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
                      .map((cita) => (
                        <li key={cita.id} className="py-4 flex justify-between items-center">
                          <div>
                            <p className="text-gray-800 font-medium">{cita.titulo}</p>
                            <p className="text-gray-600 text-sm">
                              {formatearFecha(cita.fecha)} a las {cita.hora}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 text-sm rounded-full ${
                              cita.estado === 'confirmada'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {cita.estado}
                          </span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No tienes citas programadas</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
