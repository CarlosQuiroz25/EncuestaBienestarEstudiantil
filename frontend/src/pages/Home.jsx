import { CardServicio } from '@/components/CardServicio'
import { Link } from 'react-router-dom';
import { Button } from '../components/botton/botton';

export const Home = () => {
  const serviciosDestacados = [
    {
      id: 1,
      titulo: 'Asesoría Psicológica',
      descripcion: 'Apoyo profesional para manejar el estrés, ansiedad y otros aspectos emocionales.',
      icono: '🧠'
    },
    {
      id: 2,
      titulo: 'Orientación Vocacional',
      descripcion: 'Te ayudamos a descubrir tu camino profesional ideal.',
      icono: '🎯'
    },
    {
      id: 3,
      titulo: 'Talleres de Desarrollo',
      descripcion: 'Mejora tus habilidades blandas y técnicas con nuestros talleres.',
      icono: '📚'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50 h-full pb-30">
      <main className="flex-grow">
        {/* Sección de Bienvenida */}
        <section
          className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 md:p-8"
          style={{ backgroundImage: "url('/assets/imagen1.jpg')" }}
        >
          <div className="bg-white/80 p-8 md:p-10 rounded-xl shadow-lg text-center max-w-3xl mx-auto transform hover:scale-105 transition-transform duration-300 ease-in-out backdrop-blur-sm">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
              Bienestar Integral para <span className="text-blue-600">Estudiantes</span>
            </h1>
            <p className="text-lg sm:text-xl mb-10 text-gray-700 font-light">
              Apoyamos tu desarrollo académico, emocional y social durante tu vida universitaria.
            </p>
            <Link to="/register">
            <Button className="w-full text-white">
              Regístrate
            </Button>
            </Link>
          </div>
        </section>

        {/* Sección de Servicios */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-900 relative">
              Nuestros <span className="text-black">Servicios</span>
              <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-blue-500 rounded-full"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
              {serviciosDestacados.map(servicio => (
                <CardServicio key={servicio.id} servicio={servicio} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
