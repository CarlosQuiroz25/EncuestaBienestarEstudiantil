import Footer from "../components/Footer";
import { CardServicio } from '../components/CardServicio';

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
      <div className="min-h-screen flex flex-col">
        {/* ❌ Elimina <Header /> aquí */}
        <main className="flex-grow">
          <section className="bg-gradient-to-r from-primary to-secondary  py-20">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Bienestar Integral para Estudiantes</h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Apoyamos tu desarrollo académico, emocional y social durante tu vida universitaria.
              </p>
              <button className="bg-white text-primary px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition">
                Conoce nuestros servicios
              </button>
            </div>
          </section>
  
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
  