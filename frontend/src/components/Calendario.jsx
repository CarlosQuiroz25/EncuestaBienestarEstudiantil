// src/components/Calendario.jsx
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Mantenemos los estilos base para que funcione
import { format } from 'date-fns';

export const Calendario = ({ fechaSeleccionada, onSeleccionarFecha, citasPorFecha }) => {

  // Función para añadir clases CSS personalizadas a los días que tienen citas
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Si hay citas para esta fecha, añade la clase 'has-appointments'
      if (citasPorFecha[formattedDate] && citasPorFecha[formattedDate].length > 0) {
        return 'has-appointments'; 
      }
    }
    return null; 
  };

  return (
    <div className="custom-calendar-container">
      <Calendar
        onChange={onSeleccionarFecha} 
        value={fechaSeleccionada}    
        locale="es-ES"               
        // Clases de Tailwind aplicadas directamente al componente Calendar principal
        // Estas clases se aplican a la envoltura más externa del calendario
        className="w-full rounded-lg shadow-xl border border-gray-100 p-4 bg-white font-sans text-gray-800" 
        
        // Función para aplicar clases a las "baldosas" (días) del calendario
        tileClassName={tileClassName} 
        
        // Estilo para la baldosa activa (día seleccionado)
        tileActiveClassName="react-calendar__tile--active-custom" 

        // Estilo para las baldosas de hoy
        tileContent={({ date, view }) => {
          if (view === 'month' && date.toDateString() === new Date().toDateString()) {
            return <div className="dot-today"></div>; // Pequeño punto para el día actual
          }
          return null;
        }}
      />

      {/*
        Estilos CSS personalizados para sobreescribir o añadir a las clases internas de react-calendar.
        Lo ideal es poner esto en un archivo CSS global (ej. index.css o un archivo dedicado como calendar.css)
        e importarlo una vez en tu archivo CSS principal o en el componente.
        Aquí lo mantenemos en <style jsx> para demostración.
      */}
      <style jsx>{`
        /* --- ESTILOS GENERALES DEL CALENDARIO (REACT-CALENDAR) --- */
        .react-calendar {
          /* Las clases en 'className' arriba ya manejan la mayoría de estos */
          /* border: 1px solid #e2e8f0; /* border-gray-200 */
          /* font-family: sans-serif; */
          /* line-height: 1.125em; */
        }

        /* --- NAVEGACIÓN (MES, AÑO, ETC.) --- */
        .react-calendar__navigation {
          display: flex;
          margin-bottom: 1rem; /* mb-4 */
          border-bottom: 1px solid #e2e8f0; /* border-gray-200 */
          padding-bottom: 0.75rem; /* pb-3 */
        }
        .react-calendar__navigation button {
          min-width: 44px; /* Aumenta el área clicable */
          background: none;
          border: none;
          padding: 0.5rem;
          font-size: 1.25rem; /* text-xl */
          font-weight: bold; /* font-bold */
          color: #4b5563; /* text-gray-700 */
          transition: background-color 0.2s, color 0.2s;
          border-radius: 0.5rem; /* rounded-lg */
        }
        .react-calendar__navigation button:hover {
          background-color: #f3f4f6; /* bg-gray-100 */
          color: #1f2937; /* text-gray-900 */
        }
        .react-calendar__navigation button:disabled {
          background-color: #f9fafb; /* bg-gray-50 */
          color: #d1d5db; /* text-gray-400 */
          cursor: not-allowed;
        }
        .react-calendar__navigation__label {
          flex-grow: 1;
          text-align: center;
          font-size: 1.25rem; /* text-xl */
          font-weight: bold; /* font-bold */
          color: #1f2937; /* text-gray-900 */
        }
        .react-calendar__navigation__label:hover {
          background-color: #f3f4f6; /* bg-gray-100 */
          border-radius: 0.5rem;
        }

        /* --- DÍAS DE LA SEMANA --- */
        .react-calendar__month-view__weekdays {
          text-align: center;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.875rem; /* text-sm */
          color: #6b7280; /* text-gray-500 */
          margin-bottom: 0.5rem; /* mb-2 */
        }
        .react-calendar__month-view__weekdays__weekday {
          padding: 0.5rem 0; /* py-2 */
        }
        .react-calendar__month-view__weekdays__weekday abbr { /* Eliminar el guion bajo del abbr */
          text-decoration: none;
        }

        /* --- DÍAS DEL MES (BALDOSAS/TILES) --- */
        .react-calendar__tile {
          max-width: 100%;
          padding: 0.75rem 0.5rem; /* py-3 px-2 */
          background: none;
          text-align: center;
          line-height: 1.25;
          font-size: 1rem; /* text-base */
          color: #374151; /* text-gray-700 */
          border-radius: 0.5rem; /* rounded-lg */
          transition: background-color 0.2s, color 0.2s, transform 0.2s;
        }
        .react-calendar__tile:hover {
          background-color: #e0f2f7; /* Un azul muy claro */
          color: #1e3a8a; /* Un azul oscuro */
          transform: translateY(-2px); /* Pequeño efecto de elevación */
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-md */
        }

        /* Días de otros meses */
        .react-calendar__month-view__days__day--neighboringMonth {
          color: #9ca3af; /* text-gray-400 */
          opacity: 0.7; /* Para que se vean un poco atenuados */
        }

        /* Día de hoy */
        .react-calendar__tile--now {
          background-color: #eff6ff; /* bg-blue-50 */
          color: #2563eb; /* text-blue-600 */
          font-weight: bold;
          position: relative;
        }
        .react-calendar__tile--now .dot-today {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: #2563eb; /* blue-600 */
          border-radius: 50%;
        }

        /* Día seleccionado (usando tileActiveClassName) */
        .react-calendar__tile--active-custom {
          background-color: #3b82f6 !important; /* bg-blue-500 */
          color: white !important;
          font-weight: bold;
          border-radius: 0.5rem; /* rounded-lg */
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-lg */
        }
        .react-calendar__tile--active-custom:hover {
          background-color: #2563eb !important; /* bg-blue-600 */
          transform: translateY(-2px);
        }

        /* Clase para días con citas */
        .react-calendar__tile.has-appointments {
          background-color: #dbeafe; /* bg-blue-100 */
          color: #1d4ed8; /* text-blue-700 */
          font-weight: bold;
          position: relative; /* Para el punto de la cita */
        }
        .react-calendar__tile.has-appointments:after {
          content: '';
          position: absolute;
          bottom: 4px; /* Ajusta la posición del punto */
          left: 50%;
          transform: translateX(-50%);
          width: 5px;
          height: 5px;
          background-color: #f59e0b; /* amber-500, o tu color de acento */
          border-radius: 50%;
        }
        .react-calendar__tile.has-appointments:hover {
          background-color: #bfdbfe !important; /* bg-blue-200 */
        }
        
        /* Ajustes para vistas de década/año */
        .react-calendar__year-view .react-calendar__tile,
        .react-calendar__decade-view .react-calendar__tile,
        .react-calendar__century-view .react-calendar__tile {
            padding: 2em 0.5em; /* Más padding para que los años/meses se vean bien */
        }
      `}</style>
    </div>
  );
};