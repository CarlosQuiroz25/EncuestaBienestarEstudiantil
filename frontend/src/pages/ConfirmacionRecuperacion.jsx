import { Link } from "react-router-dom";

export const ConfirmacionRecuperacion = () => {
  return (
    <main className="font-sans bg-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-marian-blue/20 flex flex-col gap-6 backdrop-filter backdrop-blur-lg min-w-96 p-10 rounded-lg shadow-lg text-center">
        <h2 className="font-bold text-2xl text-black">¡Revisa tu correo!</h2>
        <p className="text-sm text-gray-700">
          Hemos enviado un enlace para recuperar tu contraseña. Por favor, revisa tu bandeja de entrada o la carpeta de spam.
        </p>
        <Link
          to="/login"
          className="font-medium text-sm text-indigo-900 hover:text-indigo-600"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </main>
  );
};
