import { Link } from "react-router-dom";

export function NoEncontrado() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-indigo-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-marian-blue mb-4">404 - Página no encontrada</h1>
        <p className="text-lg mb-6">Lo sentimos, la página que buscas no existe o ha sido movida.</p>
        <Link 
          to="/" 
          className="px-6 py-2 bg-marian-blue text-white rounded-lg hover:bg-marian-blue/80 transition"
        >
          Volver al Inicio
        </Link>
      </div>
    </main>
  );
}