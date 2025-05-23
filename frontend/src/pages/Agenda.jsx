// src/pages/Agenda.jsx
import { useState, useEffect } from 'react'; // ¡Importa useEffect!
import { Calendario } from '../components/Calendario';
import { FormularioCita } from '../components/FormularioCita';
import { formatearFecha } from '../utils/fechaUtils';
import { FaCalendarCheck, FaCalendarPlus, FaInfoCircle } from 'react-icons/fa';

export const Agenda = () => {
  // Función para obtener las citas iniciales desde localStorage
  // Esta función se ejecutará solo una vez al inicio
  const getInitialCitas = () => {
    const storedCitas = localStorage.getItem('citasAgenda'); // Intentamos obtener las citas guardadas
    if (storedCitas) {
      // Si hay citas guardadas, las parseamos de JSON a un objeto JavaScript
      return JSON.parse(storedCitas);
    }
    // Si no hay citas guardadas, devolvemos el array inicial de ejemplo
    return [
      {
        id: 1,
        titulo: 'Asesoría Psicológica - Estrés Académico',
        fecha: '2025-06-15',
        hora: '10:00',
        estado: 'confirmada',
        profesional: 'Dr. Andrés Giraldo'
      },
      {
        id: 2,
        titulo: 'Taller de Gestión del Tiempo',
        fecha: '2025-06-20',
        hora: '14:30',
        estado: 'pendiente',
        profesional: 'Lic. Sofía Restrepo'
      },
      {
        id: 3,
        titulo: 'Orientación Vocacional',
        fecha: '2025-07-01',
        hora: '09:00',
        estado: 'confirmada',
        profesional: 'Dra. Elena Vélez'
      }
    ];
  };

  // Inicializa el estado 'citas' utilizando la función que carga desde localStorage
  const [citas, setCitas] = useState(getInitialCitas);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // useEffect para guardar las citas en localStorage cada vez que cambien
  useEffect(() => {
    // Convertimos el array de citas a una cadena JSON antes de guardarlo
    localStorage.setItem('citasAgenda', JSON.stringify(citas));
  }, [citas]); // Este efecto se ejecuta cada vez que el estado 'citas' cambia

  const handleSeleccionFecha = (fecha) => {
    setFechaSeleccionada(fecha);
    setMostrarFormulario(true);
  };

  const handleAgregarCita = (nuevaCita) => {
    // Aseguramos que el ID sea único (simple contador, podrías usar algo más robusto si es una app más grande)
    const newId = citas.length > 0 ? Math.max(...citas.map(c => c.id)) + 1 : 1;
    setCitas([
      ...citas,
      {
        id: newId,
        ...nuevaCita,
        fecha: fechaSeleccionada.toISOString().split('T')[0],
        estado: 'pendiente' // Por defecto al agregar
      }
    ]);
    setMostrarFormulario(false);
  };

  // Función para obtener las citas de una fecha específica
  const getCitasParaFecha = (fecha) => {
    if (!fecha) return [];
    const fechaString = fecha.toISOString().split('T')[0];
    return citas.filter(cita => cita.fecha === fechaString);
  };

  const citasParaFechaSeleccionada = getCitasParaFecha(fechaSeleccionada);

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col justify-center items-center py-12 px-4 h-full pb-40"
      style={{ backgroundImage: "url('/assets/fondo-agenda.jpg')" }}
    >
      <div className="w-full max-w-6xl bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
        
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-10 px-8 text-center rounded-t-xl">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
              <FaCalendarCheck className="inline-block mr-4 text-blue-200" /> Agenda de Bienestar
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Programa y gestiona tus citas de apoyo académico y emocional de forma sencilla.
            </p>
          </div>
        </header>

        <main className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* Calendario */}
            <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-[1.005] transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaCalendarPlus className="mr-3 text-blue-600" /> Selecciona una fecha
              </h2>
              <Calendario citas={citas} onSeleccionFecha={handleSeleccionFecha} />
            </div>

            {/* Sección derecha - Formulario y Próximas Citas */}
            <div className="lg:col-span-1 space-y-8">
              {mostrarFormulario && fechaSeleccionada ? (
                <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-100 animate-slide-in-right">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <FaCalendarPlus className="mr-3" /> Agendar Cita para {formatearFecha(fechaSeleccionada.toISOString().split('T')[0])}
                  </h3>
                  <FormularioCita
                    fechaSeleccionada={fechaSeleccionada}
                    onCancelar={() => setMostrarFormulario(false)}
                    onConfirmar={handleAgregarCita}
                  />
                  {citasParaFechaSeleccionada.length > 0 && (
                      <div className="mt-6 p-4 bg-blue-100 border border-blue-200 rounded-md text-blue-800 text-sm">
                          <p className="font-semibold mb-2">Citas ya programadas para esta fecha:</p>
                          <ul className="list-disc list-inside">
                              {citasParaFechaSeleccionada.map(cita => (
                                  <li key={cita.id}>{cita.titulo} a las {cita.hora} ({cita.estado})</li>
                              ))}
                          </ul>
                      </div>
                  )}
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 text-gray-700 animate-fade-in">
                    <p className="flex items-center text-lg font-semibold mb-3">
                        <FaInfoCircle className="mr-3 text-blue-500" />
                        ¡Bienvenido a tu agenda!
                    </p>
                    <p className="mb-2">Selecciona una fecha en el calendario para programar una nueva cita.</p>
                    <p>Aquí verás un resumen de tus próximas citas.</p>
                </div>
              )}

              {/* Próximas citas */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-[1.005] transition-transform duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaCalendarCheck className="mr-3 text-green-600" /> Próximas Citas
                </h3>
                {citas.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {citas
                      .sort((a, b) => {
                        const dateA = new Date(`${a.fecha}T${a.hora}`);
                        const dateB = new Date(`${b.fecha}T${b.hora}`);
                        return dateA - dateB;
                      })
                      .filter(cita => new Date(`${cita.fecha}T${cita.hora}`) >= new Date()) // Solo citas futuras
                      .map((cita) => (
                        <li key={cita.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center group">
                          <div className="mb-2 sm:mb-0">
                            <p className="text-gray-900 font-semibold text-lg">{cita.titulo}</p>
                            <p className="text-gray-600 text-sm mt-1">
                              {formatearFecha(cita.fecha)} <span className="font-bold">a las {cita.hora}</span>
                            </p>
                            {cita.profesional && (
                                <p className="text-gray-500 text-xs mt-1">
                                    Profesional: {cita.profesional}
                                </p>
                            )}
                          </div>
                          <span
                            className={`px-3 py-1 text-xs font-semibold rounded-full min-w-[90px] text-center capitalize ${
                              cita.estado === 'confirmada'
                                ? 'bg-green-100 text-green-800 border border-green-200'
                                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}
                          >
                            {cita.estado}
                          </span>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                    <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-lg">No tienes citas programadas próximamente.</p>
                    <p className="text-sm mt-1">¡Selecciona una fecha en el calendario para comenzar!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};