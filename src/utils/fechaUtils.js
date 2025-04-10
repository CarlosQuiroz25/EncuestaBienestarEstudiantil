import { 
    format, 
    parseISO, 
    isToday, 
    isThisWeek, 
    addDays,
    startOfWeek,
    endOfWeek,
    differenceInDays,
    addMonths,
    isSameDay
  } from 'date-fns';
  
  import es from 'date-fns/locale/es'; // ✅ aquí va el idioma
  
  // Funciones ⬇️
  export const formatearFecha = (fecha, formato = 'PPPP') => {
    const fechaObj = typeof fecha === 'string' ? parseISO(fecha) : fecha;
    return format(fechaObj, formato, { locale: es });
  };
  
  export const esEstaSemana = (fecha) => {
    return isThisWeek(typeof fecha === 'string' ? parseISO(fecha) : fecha);
  };
  
  export const generarRangoFechas = (inicio, fin) => {
    const dias = differenceInDays(fin, inicio);
    return Array.from({ length: dias + 1 }, (_, i) => addDays(inicio, i));
  };
  
  export const obtenerSemana = (fecha) => {
    return {
      inicio: startOfWeek(fecha),
      fin: endOfWeek(fecha)
    };
  };
  
  export const agregarMesesSeguro = (fecha, meses) => {
    const nuevaFecha = addMonths(fecha, meses);
    if (nuevaFecha.getDate() !== fecha.getDate()) {
      return new Date(nuevaFecha.setDate(0));
    }
    return nuevaFecha;
  };
  
  export const esMismoDia = (fecha1, fecha2) => {
    const d1 = typeof fecha1 === 'string' ? parseISO(fecha1) : fecha1;
    const d2 = typeof fecha2 === 'string' ? parseISO(fecha2) : fecha2;
    return isSameDay(d1, d2);
  };
  