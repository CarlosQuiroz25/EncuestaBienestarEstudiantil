import React from 'react';
import SurveyForm from '../components/SurveyForm';

const Encuesta = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Encuesta de Bienestar Estudiantil</h1>
          <p className="text-lg">Estamos aquí para ayudarte</p>
        </div>
      </div>
      <h1 className="text-3xl font-bold text-center mb-8"></h1>
      <SurveyForm />
    </div>
  );
};

export default Encuesta;
