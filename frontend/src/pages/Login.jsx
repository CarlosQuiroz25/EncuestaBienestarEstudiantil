import React, { useState } from "react";
import { Input } from "../components/input/input";
import { Button } from "../components/botton/botton";
import { Link, useNavigate } from "react-router-dom";
import { fetchLogin } from "@/api/login";

const schemaLogin = {
  email: "",
  contraseña: "",
};

export function Login() {
  const [loginForm, setLoginForm] = useState(schemaLogin);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginForm.email === "" || loginForm.contraseña === "") {
      setError("Por favor, completa todos los campos.");
      return;
    }

    fetchLogin({ email: loginForm.email, password: loginForm.contraseña })
      .then((user) => {
        localStorage.setItem(
          "user-bienestar-estudiantil",
          JSON.stringify(user)
        );
        navigate("/");
        window.location.reload(); // Fuerza el refresco de la página
        console.log(user);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <main className="font-sans bg-indigo-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-marian-blue/20 flex flex-col gap-8 backdrop-filter backdrop-blur-lg min-w-96 p-10 rounded-lg shadow-lg">
        <h2 className="font-bold text-2xl text-black text-center mb-6">
          Iniciar Sesión
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

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="mt-1">
              <Input
                id="email"
                name="email"
                type="text"
                value={loginForm.email}
                onChange={handleInputChange}
                required
                placeholder="Email"
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
                name="contraseña"
                value={loginForm.contraseña}
                onChange={handleInputChange}
                required
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full text-white">
              Iniciar Sesión
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center flex flex-col items-center gap-2">
          <Link
            to="/recuperar-contrasena"
            className="font-medium text-sm text-indigo-900 hover:text-indigo-600 "
          >
            ¿Olvidaste tu contraseña?
          </Link>

          <div>
            <Link
              to="/register"
              className="font-medium text-sm text-indigo-900 hover:text-indigo-600"
            >
              ¿No tienes cuenta? Regístrate aquí
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
