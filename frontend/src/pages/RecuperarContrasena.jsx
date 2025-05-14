import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const RecuperarContrasena = () => {
  const [email, setEmail] = useState(""); // Estado para el correo electrónico
  const navigate = useNavigate(); // Para redirigir a otras páginas después de enviar

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    if (!email) {
      // Validar que el email no esté vacío
      alert("Por favor ingresa tu correo electrónico.");
      return;
    }

    // Lógica para manejar la recuperación de contraseña
    console.log("Enviando enlace de recuperación a:", email);

    // Redirigir a la página de confirmación (por ejemplo)
    navigate("/confirmacion-recuperacion");
  };

  return (
    <main className="font-sans bg-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-marian-blue/20 flex flex-col gap-6 backdrop-filter backdrop-blur-lg min-w-96 p-10 rounded-lg shadow-lg">
        <h2 className="font-bold text-2xl text-black text-center mb-4">
          Recuperar Contraseña
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <div className="mt-1">
              <input
                id="email"
                type="email"
                required
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Actualizar el estado con el valor del input
                className="shadow-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md p-2 bg-white"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-marian-blue hover:bg-marian-blue/90"
            >
              Enviar enlace
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <Link
            to="/login"
            className="font-medium text-sm text-indigo-900 hover:text-indigo-600"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </main>
  );
};
