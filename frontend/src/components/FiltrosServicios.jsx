// src/components/FiltrosServicios.jsx
import React from 'react';

export const FiltrosServicios = ({ filtro, setFiltro }) => {
  const categorias = [
    { key: 'todos', label: 'Todos' },
    { key: 'academico', label: 'Académico' },
    { key: 'salud', label: 'Salud' },
    { key: 'bienestar', label: 'Bienestar' },
    // Agrega más categorías si las tienes
  ];

  return (
    <div className="flex  space-x-4 mb-12 p-4 bg-white rounded-xl shadow-lg border border-gray-200 animate-fade-in-up">
      {categorias.map((cat) => (
        <button
          key={cat.key}
          onClick={() => setFiltro(cat.key)}
          className={`
            px-6 py-2 rounded-full font-semibold text-lg transition-all duration-300
            ${filtro === cat.key
              ? 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md transform scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
            }
            focus:outline-none focus:ring-2 focus:ring-blue-300
          `}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};