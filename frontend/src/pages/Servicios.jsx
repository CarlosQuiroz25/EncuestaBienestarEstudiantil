import { useState } from 'react';
import { CardServicio } from '../components/CardServicio';
import { FiltrosServicios } from '../components/FiltrosServicios';

export const Servicios = () => {
  // Estado para el filtro activo
  const [filtro, setFiltro] = useState('todos');

  // Datos de ejemplo (luego puedes reemplazarlos con una API)
  const servicios = [
    {
      id: 1,
      titulo: 'Asesoría Psicológica',
      descripcion: 'Sesiones individuales para manejo de estrés, ansiedad y bienestar emocional.',
      categoria: 'salud',
      icono: '🧠',
      destacado: true
    },
    {
      id: 2,
      titulo: 'Taller de Manejo del Tiempo',
      descripcion: 'Aprende técnicas para organizar tus estudios y actividades personales.',
      categoria: 'academico',
      icono: '⏰',
      destacado: false
    },
    // Agrega más servicios según necesites...
  ];

  // Filtrar servicios
  const serviciosFiltrados = filtro === 'todos' 
    ? servicios 
    : servicios.filter(servicio => servicio.categoria === filtro);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Nuestros Servicios</h1>
          <p className="text-xl opacity-90">Apoyo integral para tu desarrollo universitario</p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto px-4 py-12">
        {/* Componente de Filtros */}
        <FiltrosServicios filtro={filtro} setFiltro={setFiltro} />

        {/* Listado de Servicios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {serviciosFiltrados.map(servicio => (
            <CardServicio 
              key={servicio.id} 
              servicio={servicio}
            />
          ))}
        </div>

        {/* Mensaje si no hay resultados */}
        {serviciosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No hay servicios disponibles en esta categoría</p>
          </div>
        )}
      </div>
    </div>
  );
};