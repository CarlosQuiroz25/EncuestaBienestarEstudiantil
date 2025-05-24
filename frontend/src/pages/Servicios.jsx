import { useState } from 'react';
import { CardServicio } from '../components/CardServicio'; // Asumo que este componente recibirá las props y aplicará estilos
import { FiltrosServicios } from '../components/FiltrosServicios'; // Asumo que este componente maneja la lógica de los botones de filtro
import { FaGraduationCap, FaHandsHelping, FaHeartbeat, FaSearch, FaInfoCircle } from 'react-icons/fa'; // Importamos más iconos para la Hero Section y mensajes

export const Servicios = () => {
  // Estado para el filtro activo
  const [filtro, setFiltro] = useState('todos');

  // Datos de ejemplo (puedes reemplazarlos con una API)
  const servicios = [
    {
      id: 1,
      titulo: 'Asesoría Psicológica',
      descripcion: 'Sesiones individuales para manejo de estrés, ansiedad y bienestar emocional. ¡Agenda tu cita!',
      categoria: 'salud',
      icono: '🧠', // Emoji para compatibilidad, aunque preferimos FaIcons
      iconoFa: <FaHeartbeat className="text-red-500" />, // Icono de Font Awesome
      destacado: true
    },
    {
      id: 2,
      titulo: 'Taller de Manejo del Tiempo',
      descripcion: 'Aprende técnicas efectivas para organizar tus estudios y actividades personales y optimizar tu productividad.',
      categoria: 'academico',
      icono: '⏰',
      iconoFa: <FaGraduationCap className="text-blue-500" />,
      destacado: false
    },
    {
      id: 3,
      titulo: 'Sesión de Bienestar Integral',
      descripcion: 'Actividades y talleres enfocados en mejorar tu salud física y mental para un equilibrio completo.',
      categoria: 'bienestar',
      icono: '🧘',
      iconoFa: <FaHandsHelping className="text-green-500" />,
      destacado: false,
    },
    {
      id: 4,
      titulo: 'Taller de Mindfulness y Relajación',
      descripcion: 'Reduce el estrés y mejora tu enfoque a través de técnicas de atención plena y ejercicios de relajación.',
      categoria: 'bienestar',
      icono: '🧠',
      iconoFa: <FaHeartbeat className="text-purple-500" />,
      destacado: false,
    },
    {
      id: 5,
      titulo: 'Grupo de Apoyo Emocional',
      descripcion: 'Espacios seguros donde puedes compartir experiencias, recibir apoyo y fortalecer tu red social.',
      categoria: 'salud',
      icono: '🤝',
      iconoFa: <FaHandsHelping className="text-orange-500" />,
      destacado: false,
    },
    {
      id: 6,
      titulo: 'Tutorías Personalizadas',
      descripcion: 'Recibe ayuda individual y especializada en materias específicas para mejorar tu rendimiento académico.',
      categoria: 'academico',
      icono: '📘',
      iconoFa: <FaGraduationCap className="text-teal-500" />,
      destacado: false,
    },
    {
      id: 7,
      titulo: 'Orientación Vocacional',
      descripcion: 'Descubre tus intereses y habilidades para tomar decisiones informadas sobre tu futuro profesional.',
      categoria: 'academico',
      icono: '🧭',
      iconoFa: <FaGraduationCap className="text-yellow-500" />,
      destacado: true,
    },
    {
      id: 8,
      titulo: 'Charlas de Nutrición',
      descripcion: 'Consejos prácticos para una alimentación saludable que impulse tu energía y bienestar.',
      categoria: 'salud',
      icono: '🍎',
      iconoFa: <FaHeartbeat className="text-lime-500" />,
      destacado: false,
    },
  ];

  // Filtrar servicios
  const serviciosFiltrados = filtro === 'todos'
    ? servicios
    : servicios.filter(servicio => servicio.categoria === filtro);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-40 h-full pb-30"> {/* Fondo degradado suave */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 rounded-xl shadow-2xl mb-12 text-center transform -translate-y-4 animate-fade-in-down"> {/* Cabecera impactante */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <FaHandsHelping className="inline-block mr-4 text-blue-200" /> Nuestros Servicios de Apoyo
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Explora una amplia gama de apoyos diseñados para tu bienestar integral y éxito académico.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto">
        {/* Componente de Filtros */}
        {/* Se le pasa el filtro y el setter para que pueda cambiar el estado */}
        <FiltrosServicios filtro={filtro} setFiltro={setFiltro} />

        

        {/* Listado de Servicios Filtrados */}
        <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviciosFiltrados.map(servicio => (
                    <CardServicio
                        key={servicio.id}
                        servicio={servicio}
                        isFeatured={servicio.destacado} // Pasa el estado destacado a la Card
                    />
                ))}
            </div>
        </div>


        {/* Mensaje si no hay resultados */}
        {serviciosFiltrados.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-lg mt-12 animate-fade-in">
            <FaInfoCircle className="text-5xl text-gray-400 mx-auto mb-6" />
            <p className="text-gray-600 text-xl font-semibold mb-2">No se encontraron servicios</p>
            <p className="text-gray-500 text-lg">Prueba ajustando tus filtros o vuelve a "Todos".</p>
          </div>
        )}
      </div>
    </div>
  );
};