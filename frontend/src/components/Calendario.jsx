import { useState } from 'react';
import { 
  format, 
  isToday, 
  isSameDay, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  addDays, 
  isSameMonth, 
  subMonths, 
  addMonths,
  parseISO
} from 'date-fns';
import { es } from 'date-fns/locale';

export const Calendario = ({ citas, onSeleccionFecha }) => {
  const [mesActual, setMesActual] = useState(new Date());

  // Generar días del mes
  const diasMes = [];
  const inicioMes = startOfMonth(mesActual);
  const finMes = endOfMonth(mesActual);
  
  let diaActual = startOfWeek(inicioMes);
  while (diaActual <= endOfWeek(finMes)) {
    diasMes.push(diaActual);
    diaActual = addDays(diaActual, 1);
  }

  // Verificar si un día tiene citas
  const tieneCitas = (fecha) => {
    return citas.some(cita => isSameDay(parseISO(cita.fecha), fecha));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Controles del calendario */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setMesActual(subMonths(mesActual, 1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ◀
        </button>
        <h2 className="font-bold text-xl">
          {format(mesActual, 'MMMM yyyy', { locale: es })}
        </h2>
        <button 
          onClick={() => setMesActual(addMonths(mesActual, 1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ▶
        </button>
      </div>

      {/* Grid de días */}
      <div className="grid grid-cols-7 gap-2">
        {/* Nombres de días */}
        {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(dia => (
          <div key={dia} className="text-center font-medium py-2">
            {dia}
          </div>
        ))}

        {/* Días del mes */}
        {diasMes.map((dia, index) => {
          const esDiaMes = isSameMonth(dia, mesActual);
          const esHoy = isToday(dia);
          const tieneCita = tieneCitas(dia);

          return (
            <button
              key={index}
              onClick={() => esDiaMes && onSeleccionFecha(dia)}
              className={`p-2 rounded-full text-center h-10 w-10 flex items-center justify-center 
                ${!esDiaMes ? 'text-gray-300' : ''}
                ${esHoy ? 'bg-indigo-100 text-indigo-700' : ''}
                ${tieneCita ? 'border-2 border-indigo-400' : ''}
                hover:bg-indigo-50 transition-colors`}
            >
              {format(dia, 'd')}
            </button>
          );
        })}
      </div>
    </div>
  );
};