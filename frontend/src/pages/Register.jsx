import React, { useState } from "react";
import { Input } from "../components/input/input"; // Asegúrate de que la ruta sea correcta
import { Button } from "../components/botton/botton"; // Asegúrate de que la ruta sea correcta
import { Link, useNavigate } from "react-router-dom";
import { fetchRegister } from "@/api/register";

const registerSchema = {
  email: "",
  password: "",
  password_confirmation: "",
};

export function Register() {
  const [register, setFormRegister] = useState(registerSchema);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (
      register.email === "" ||
      register.password === "" ||
      register.password_confirmation === ""
    ) {
      setError("Por favor, completa todos los campos para registrarte.");
      return;
    }
    if (register.password !== register.password_confirmation) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    fetchRegister(register)
      .then(() => {
        alert("Registrado con exito");
        navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <main className="font-sans bg-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-marian-blue/20 flex flex-col gap-8 backdrop-filter backdrop-blur-lg min-w-96 p-10 rounded-lg shadow-lg">
        <h2 className="font-bold text-2xl text-black text-center mb-6">
          Crear Cuenta
        </h2>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              email
            </label>
            <div className="mt-1">
              <Input
                id="email"
                type="text"
                name="email"
                value={register.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="contraseña"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <div className="mt-1">
              <Input
                id="contraseña"
                type="password"
                name="password"
                value={register.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmarContraseña"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmar Contraseña
            </label>
            <div className="mt-1">
              <Input
                id="confirmarContraseña"
                type="password"
                name="password_confirmation"
                value={register.password_confirmation}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full text-white">
              Crear Cuenta
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          {/* Link para volver a la página de login */}
          <Link
            to="/login"
            className="font-medium text-sm text-indigo-900 hover:text-indigo-600"
          >
            ¿Ya tienes una cuenta? Iniciar sesión
          </Link>
        </div>
      </div>
    </main>
  );
}
