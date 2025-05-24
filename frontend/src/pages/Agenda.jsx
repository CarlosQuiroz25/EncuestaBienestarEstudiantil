import { useState, useEffect } from 'react';
import { format, isValid } from 'date-fns'; // Importamos 'isValid' para la validación
import es from 'date-fns/locale/es';
import { v4 as uuidv4 } from 'uuid';

import { Calendario } from '../components/Calendario';
import { FormularioCita } from '../components/FormularioCita';
import { FaCalendarCheck, FaCalendarPlus, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';

export const Agenda = () => {
  const getInitialCitas = () => {
    const storedCitas = localStorage.getItem('citasAgenda');
    if (storedCitas) {
      return JSON.parse(storedCitas);
    }
    // Citas de ejemplo (asegúrate de que los formatos de fecha y hora sean consistentes)
    return {
      '2025-06-15': [
        { id: uuidv4(), titulo: 'Asesoría Psicológica - Estrés Académico', hora: '10:00', estado: 'confirmada', profesional: 'Dr. Andrés Giraldo' },
      ],
      '2025-06-20': [
        { id: uuidv4(), titulo: 'Taller de Gestión del Tiempo', hora: '14:30', estado: 'pendiente', profesional: 'Lic. Sofía Restrepo' },
      ],
      '2025-07-01': [
        { id: uuidv4(), titulo: 'Orientación Vocacional', hora: '09:00', estado: 'confirmada', profesional: 'Dra. Elena Vélez' },
        { id: uuidv4(), titulo: 'Revisión de Portafolio', hora: '11:00', estado: 'pendiente', profesional: 'Ing. Carlos Pérez' },
      ],
      // Ejemplos de citas pasadas
      '2024-11-20': [
        { id: uuidv4(), titulo: 'Introducción a React', hora: '09:00', estado: 'confirmada', profesional: 'Ing. Juan Díaz' },
      ],
      '2025-01-05': [
        { id: uuidv4(), titulo: 'Taller de Productividad', hora: '16:00', estado: 'finalizada', profesional: 'Lic. Laura Martínez' },
      ],
    };
  };

  const [citasPorFecha, setCitasPorFecha] = useState(getInitialCitas);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    localStorage.setItem('citasAgenda', JSON.stringify(citasPorFecha));
  }, [citasPorFecha]);

  const handleSeleccionarFecha = (date) => {
    setFechaSeleccionada(date);
    setMostrarFormulario(true);
  };

  const handleAgregarCita = (nuevaCita) => {
    const fechaClave = format(fechaSeleccionada, 'yyyy-MM-dd');

    setCitasPorFecha(prevCitas => ({
      ...prevCitas,
      [fechaClave]: [
        ...(prevCitas[fechaClave] || []),
        {
          id: uuidv4(),
          ...nuevaCita,
          fecha: fechaClave,
          estado: 'pendiente',
          profesional: nuevaCita.profesional || 'Por asignar' // Asegura que siempre tenga un profesional
        }
      ]
    }));
    setMostrarFormulario(false);
  };

  const handleEliminarCita = (fecha, idCita) => {
    const fechaClave = format(fecha, 'yyyy-MM-dd');
    setCitasPorFecha(prevCitas => ({
      ...prevCitas,
      [fechaClave]: prevCitas[fechaClave].filter(cita => cita.id !== idCita)
    }));
  };

  const citasDelDiaSeleccionado = citasPorFecha[format(fechaSeleccionada, 'yyyy-MM-dd')] || [];

  const todasLasCitas = Object.values(citasPorFecha).flat();

  return (
    <div
      className="min-h-screen bg-fixed bg-center bg-cover flex flex-col justify-center items-center py-8 px-4 h-full pb-30 "
      style={{ backgroundImage: "url('/assets/fondo-agenda.jpg')" }}
    >
      <div className="w-full max-w-[99rem]  bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
        <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-15 px-8 text-center rounded-t-xl">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              <FaCalendarCheck className="inline-block mr-4 text-blue-200" /> Agenda de Bienestar
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Programa y gestiona tus citas de apoyo académico y emocional de forma sencilla.
            </p>
          </div>
        </header>

        <main className="p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 bg-gray-50 p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-[1.005] transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaCalendarCheck className="mr-3 text-blue-600" /> Gestiona tus citas
              </h2>
              <Calendario
                citasPorFecha={citasPorFecha}
                onSeleccionarFecha={handleSeleccionarFecha}
                fechaSeleccionada={fechaSeleccionada}
              />

              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaCalendarCheck className="mr-3 text-indigo-600" /> Citas para el{' '}
                  <span className="text-blue-700 ml-2">
                    {format(fechaSeleccionada, 'PPP', { locale: es })}
                  </span>
                </h3>
                {citasDelDiaSeleccionado.length > 0 ? (
                  <ul className="space-y-4">
                    {citasDelDiaSeleccionado
                      .sort((a, b) => a.hora.localeCompare(b.hora))
                      .map(cita => (
                        <li key={cita.id} className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-blue-900 text-lg">{cita.titulo}</p>
                            <p className="text-gray-700 text-sm mt-1">
                              A las <span className="font-bold">{cita.hora}</span>{' '}
                              {cita.profesional && `con ${cita.profesional}`}
                            </p>
                            <span
                              className={`px-2 py-0.5 text-xs font-semibold rounded-full mt-2 inline-block ${
                                cita.estado === 'confirmada'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {cita.estado}
                            </span>
                          </div>
                          <button
                            onClick={() => handleEliminarCita(fechaSeleccionada, cita.id)}
                            className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                            title="Eliminar cita"
                          >
                            <FaTimesCircle className="w-5 h-5" />
                          </button>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-gray-600 text-center">
                    <p className="text-lg flex items-center justify-center">
                      <FaInfoCircle className="mr-2 text-gray-400" /> No hay citas programadas para esta fecha.
                    </p>
                    <p className="text-sm mt-2">Selecciona un día en el calendario o usa el formulario para añadir una.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              {mostrarFormulario ? (
                <div className="bg-blue-50 p-6 rounded-lg shadow-lg border border-blue-100 animate-slide-in-right">
                  <h3 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
                    <FaCalendarPlus className="mr-3" /> Agendar Cita para{' '}
                    <span className="text-indigo-700">{format(fechaSeleccionada, 'PPP', { locale: es })}</span>
                  </h3>
                  <FormularioCita
                    fechaSeleccionada={fechaSeleccionada}
                    onCancelar={() => setMostrarFormulario(false)}
                    onConfirmar={handleAgregarCita}
                  />
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 text-gray-700 animate-fade-in">
                  <p className="flex items-center text-lg font-semibold mb-3">
                    <FaInfoCircle className="mr-3 text-blue-500" />
                    ¡Bienvenido a tu agenda!
                  </p>
                  <p className="mb-2">Selecciona una fecha en el calendario para programar una nueva cita.</p>
                  <p>Aquí verás un resumen de todas tus citas, pasadas y futuras.</p>
                </div>
              )}

              {/* Sección de "Todas tus Citas" (ahora muestra todas, pasadas y futuras) */}
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-[1.005] transition-transform duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <FaCalendarCheck className="mr-3 text-green-600" /> Todas tus Citas
                </h3>
                {todasLasCitas.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {todasLasCitas
                      .sort((a, b) => {
                        // Creación segura de objetos Date para evitar 'Invalid time value'
                        const dateA = a.fecha && a.hora ? new Date(`${a.fecha}T${a.hora}`) : null;
                        const dateB = b.fecha && b.hora ? new Date(`${b.fecha}T${b.hora}`) : null;

                        // Manejo de fechas inválidas durante la ordenación
                        // Prioriza las citas con fechas válidas, luego las ordena
                        if (dateA && isValid(dateA) && dateB && isValid(dateB)) return dateA.getTime() - dateB.getTime();
                        if (dateA && isValid(dateA)) return -1; // 'a' es válido, 'b' no, 'a' va primero
                        if (dateB && isValid(dateB)) return 1;  // 'b' es válido, 'a' no, 'b' va primero
                        return 0; // Ambas son inválidas o nulas, mantén el orden relativo
                      })
                      .map((cita) => {
                        // Creación segura de objeto Date para el formato y la lógica de estado
                        const citaDateTime = cita.fecha && cita.hora ? new Date(`${cita.fecha}T${cita.hora}`) : null;
                        const isPastCita = citaDateTime && isValid(citaDateTime) ? citaDateTime < new Date() : false;

                        return (
                          <li key={cita.id} className="py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center group">
                            <div className="mb-2 sm:mb-0">
                              <p className="text-gray-900 font-semibold text-lg">{cita.titulo}</p>
                              <p className="text-gray-600 text-sm mt-1">
                                {citaDateTime && isValid(citaDateTime) // Verifica si la fecha es válida antes de formatear
                                  ? format(citaDateTime, 'PPP', { locale: es })
                                  : 'Fecha Desconocida'}{' '}
                                <span className="font-bold">a las {cita.hora || 'Hora Desconocida'}</span>
                              </p>
                              {cita.profesional && (
                                <p className="text-gray-500 text-xs mt-1">
                                  Profesional: {cita.profesional}
                                </p>
                              )}
                            </div>
                            <span
                              className={`px-3 py-1 text-xs font-semibold rounded-full min-w-[90px] text-center capitalize ${
                                isPastCita
                                  ? 'bg-gray-100 text-gray-600 border border-gray-200 opacity-75' // Estilo para citas pasadas
                                  : cita.estado === 'confirmada'
                                    ? 'bg-green-100 text-green-800 border border-green-200' // Estilo para confirmadas futuras
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200' // Estilo para pendientes futuras
                              }`}
                            >
                              {cita.estado}
                            </span>
                          </li>
                        );
                      })}
                  </ul>
                ) : (
                  <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg border border-gray-200">
                    <FaInfoCircle className="text-4xl text-gray-400 mx-auto mb-3" />
                    <p className="text-lg">No tienes citas programadas aún.</p>
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