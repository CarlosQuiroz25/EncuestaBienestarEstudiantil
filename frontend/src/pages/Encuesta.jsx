import React from 'react';
import SurveyForm from '../components/SurveyForm';
import { FaClipboardList, FaHeart, FaSmile } from 'react-icons/fa'; // Importamos iconos para la Hero Section

const Encuesta = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full pb-40"> {/* Fondo degradado y centrado */}
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 rounded-xl shadow-2xl mb-12 text-center w-full max-w-4xl transform -translate-y-4 animate-fade-in-down"> {/* Cabecera impactante */}
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <FaClipboardList className="inline-block mr-4 text-blue-200" /> ¡Tu Bienestar es Nuestra Prioridad!
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Cada respuesta que compartes nos ayuda a crear un cambio positivo y a ofrecerte un mejor apoyo.
          </p>
          <div className="flex justify-center space-x-6 mt-6 text-3xl">
            <FaHeart className="text-red-300 animate-pulse" />
            <FaSmile className="text-yellow-300 animate-bounce-slow" />
            <FaClipboardList className="text-green-300 animate-wobble" />
          </div>
        </div>
      </div>

      {/* Contenedor del Formulario */}
      <div className="w-full max-w-3xl bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 transform hover:scale-[1.005] transition-all duration-300 animate-fade-in">
        <SurveyForm />
      </div>
    </div>
  );
};

export default Encuesta;