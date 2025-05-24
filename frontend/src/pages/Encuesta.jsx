import React from 'react';
import SurveyForm from '../components/SurveyForm';
import { FaClipboardList, FaHeart, FaSmile } from 'react-icons/fa';

const Encuesta = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center h-full pb-40">
      {/* Hero Section - Esta sección es la cabecera azul/morada grande */}
      <div className="max-w-[99rem] bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 rounded-xl shadow-2xl mb-6 text-center w-full transform -translate-y-4 animate-fade-in-down">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <FaClipboardList className="inline-block mr-4 text-blue-200" /> ¡Tu Bienestar es Nuestra Prioridad!
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Cada respuesta que compartes nos ayuda a crear un cambio positivo y a ofrecerte un mejor apoyo.
          </p>
        </div>
      </div>

      {/* Contenedor del Formulario - ESTE ES EL DIV QUE QUEREMOS "ENCERRAR" */}
      {/* Aplicamos las clases para el estilo de la imagen "idea.jpg" */}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg border border-gray-100 transform hover:scale-[1.005] transition-all duration-300 animate-fade-in">
        {/*
          Aquí las clases:
          - bg-white: Fondo blanco.
          - p-6: Relleno interior (padding). Ajustado para coincidir con tu Agenda.
          - rounded-lg: Bordes redondeados. Ajustado para coincidir con tu Agenda.
          - shadow-lg: Sombra. Ajustado para coincidir con tu Agenda.
          - border border-gray-100: Borde delgado gris claro.
          - transform hover:scale-[1.005] transition-all duration-300: Efecto de escala al pasar el ratón.
          - animate-fade-in: Animación de aparición.
        */}
        <SurveyForm />
      </div>
    </div>
  );
};

export default Encuesta;