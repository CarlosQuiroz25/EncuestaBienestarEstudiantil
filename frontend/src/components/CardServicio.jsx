import { useNavigate } from "react-router-dom";

export const CardServicio = ({ servicio }) => {
  const navigate = useNavigate();

  const handleVerDetalles = () => {
    navigate(`/servicios/${servicio.id}`);
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 ${servicio.destacado ? 'border-indigo-500' : 'border-transparent'}`}>
      <div className="p-6">
        <div className="flex items-start">
          <span className="text-4xl mr-4">{servicio.icono}</span>
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{servicio.titulo}</h3>
            <p className="text-gray-600 mb-4">{servicio.descripcion}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
            {servicio.categoria === 'salud' ? 'Salud' : 'Académico'}
          </span>
          <button
            className="text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={handleVerDetalles}
          >
            Ver detalles →
          </button>
        </div>
      </div>
    </div>
  );
};