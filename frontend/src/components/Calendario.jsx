import { useState } from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import es from 'date-fns/locale/es';

export const Calendario = ({ citas, onSeleccionFecha }) => {
  const [fechaActual, setFechaActual] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setFechaActual(subMonths(fechaActual, 1))} className="text-gray-600 hover:text-gray-800">
          &lt;
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {format(fechaActual, 'MMMM yyyy', { locale: es })}
        </h2>
        <button onClick={() => setFechaActual(addMonths(fechaActual, 1))} className="text-gray-600 hover:text-gray-800">
          &gt;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(fechaActual, { weekStartsOn: 1 });
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center text-gray-600 font-medium">
          {format(addDays(startDate, i), 'EEEEEE', { locale: es })}
        </div>
      );
    }
    return <div className="grid grid-cols-7 mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(fechaActual);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;
        const hasCita = citas.some((cita) => isSameDay(new Date(cita.fecha), cloneDay));
        days.push(
          <div
            className={`p-2 text-center cursor-pointer rounded-lg ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-400'
                : isSameDay(day, new Date())
                ? 'bg-blue-500 text-white'
                : 'text-gray-800 hover:bg-blue-100'
            } ${hasCita ? 'border border-blue-500' : ''}`}
            key={day}
            onClick={() => onSeleccionFecha(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="space-y-1">{rows}</div>;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};
