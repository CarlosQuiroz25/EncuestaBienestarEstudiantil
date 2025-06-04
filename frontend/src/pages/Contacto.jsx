import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaComments } from 'react-icons/fa'; // Importamos iconos de Font Awesome
import { FormContacto } from '../components/FormContacto'; // Asumo que este componente tiene sus propios estilos
import { MapaUbicacion } from '../components/MapaUbicacion'; // Asumo que este componente maneja la visualización del mapa

export const Contacto = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 h-full pb-40"> {/* Fondo degradado suave */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 rounded-xl shadow-2xl mb-12 text-center transform -translate-y-4 animate-fade-in-down mx-32"> {/* Cabecera impactante */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <FaComments className="inline-block mr-4 text-blue-200" /> Contáctanos
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Estamos aquí para ayudarte. No dudes en comunicarte con nosotros para cualquier consulta o apoyo.
          </p>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"> {/* Mayor espacio entre columnas */}
          {/* Formulario de contacto */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-blue-100 transform hover:scale-[1.005] transition-all duration-300 animate-slide-in-left">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center">
              <FaEnvelope className="mr-4 text-blue-600" /> Envíanos un mensaje
            </h2>
            <FormContacto />
          </div>

          {/* Información de contacto y Mapa */}
          <div className="space-y-10"> {/* Espacio vertical uniforme */}
            {/* Información de contacto */}
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-indigo-100 transform hover:scale-[1.005] transition-all duration-300 animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center">
                <FaPhone className="mr-4 text-indigo-600" /> Información de Contacto
              </h2>
              <div className="space-y-6"> {/* Espacio entre cada detalle de contacto */}
                {/* Dirección */}
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                  <div className="bg-indigo-200 p-3 rounded-full mr-5 shadow-md">
                    <FaMapMarkerAlt className="w-7 h-7 text-indigo-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Nuestra Sede</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Dg. 50A #38 20 Piso 5,<br /> Hermosa Provincia, Bello, Antioquia
                    </p>
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                  <div className="bg-indigo-200 p-3 rounded-full mr-5 shadow-md">
                    <FaPhone className="w-7 h-7 text-indigo-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Llámanos</h3>
                    <p className="text-gray-700 leading-relaxed">
                      +51 123 456 789<br />
                      +51 987 654 321
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                  <div className="bg-indigo-200 p-3 rounded-full mr-5 shadow-md">
                    <FaEnvelope className="w-7 h-7 text-indigo-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Envía un Email</h3>
                    <p className="text-gray-700 leading-relaxed">
                      contacto@bienestarestudiantil.edu<br />
                      soporte@bienestarestudiantil.edu
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 transform hover:scale-[1.005] transition-all duration-300 animate-slide-in-right">
              <h2 className="text-3xl font-bold mb-8 text-gray-900 flex items-center">
                <FaMapMarkerAlt className="mr-4 text-blue-600" /> Dónde Encontrarnos
              </h2>
              <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-200 shadow-inner"> {/* Contenedor del mapa */}
                <MapaUbicacion />
              </div>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Haz clic en el mapa para explorar nuestra ubicación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};