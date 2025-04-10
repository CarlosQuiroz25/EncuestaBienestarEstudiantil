export const FiltrosServicios = ({ filtro, setFiltro }) => {
    const categorias = [
      { id: 'todos', nombre: 'Todos' },
      { id: 'salud', nombre: 'Salud Mental' },
      { id: 'academico', nombre: 'Apoyo Académico' },
      { id: 'bienestar', nombre: 'Bienestar' }
    ];
  
    return (
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {categorias.map(categoria => (
          <button
            key={categoria.id}
            onClick={() => setFiltro(categoria.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filtro === categoria.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {categoria.nombre}
          </button>
        ))}
      </div>
    );
  };