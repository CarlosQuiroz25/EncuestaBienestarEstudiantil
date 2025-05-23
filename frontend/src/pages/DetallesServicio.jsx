import { useParams, Link } from "react-router-dom";
import servicios from "../data/servicios";

const categoriaEstilos = {
    salud: "bg-green-100 text-green-800",
    academico: "bg-blue-100 text-blue-800",
    bienestar: "bg-yellow-100 text-yellow-800",
};

const DetalleServicio = () => {
    const { id } = useParams();
    const servicio = servicios.find(s => s.id === id);

    if (!servicio) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Servicio no encontrado</h2>
                <Link to="/servicios" className="text-indigo-600 hover:underline">Volver a servicios</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex flex-col items-center py-10">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
                <div className="flex items-center mb-6">
                    <span className="text-6xl mr-6">{servicio.icono}</span>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{servicio.titulo}</h1>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${categoriaEstilos[servicio.categoria] || "bg-gray-100 text-gray-800"}`}>
                            {servicio.categoria.charAt(0).toUpperCase() + servicio.categoria.slice(1)}
                        </span>
                    </div>
                </div>
                {servicio.imagen && (
                    <img
                        src={servicio.imagen}
                        alt={servicio.titulo}
                        className="w-full max-h-96 object-cover rounded-2xl mb-8 shadow-lg border-4 border-indigo-100"
                    />
                )}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Descripción</h2>
                    <p className="text-gray-700 text-lg">{servicio.descripcion}</p>
                </div>
                {servicio.detalle && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Más información</h2>
                        <p className="text-gray-700 text-lg whitespace-pre-line">{servicio.detalle}</p>
                    </div>
                )}
                {servicio.beneficios && (
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Beneficios</h2>
                        <ul className="list-disc list-inside text-gray-700 text-lg space-y-1">
                            {servicio.beneficios.map((b, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                    <span className="text-green-500">✔️</span>
                                    <span>{b}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="flex flex-col md:flex-row gap-4 justify-end">
                    <Link
                        to="/contacto"
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                    >
                        Contactar
                    </Link>
                    <Link
                        to="/servicios"
                        className="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                    >
                        ← Volver a servicios
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DetalleServicio;