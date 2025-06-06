import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaUserCircle,
  FaChevronDown,
  FaSignOutAlt,
  FaHome,
  FaQuestionCircle,
  FaLaptopCode,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa"; // Añadidas más iconos para el menú mobile

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Estado para simular si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user-bienestar-estudiantil");
    setIsLoggedIn(!!token);
  }, []);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem("user-bienestar-estudiantil");
    setIsLoggedIn(false);
    setUserDropdown(false);
    navigate("/login");
  };

  const toggleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  return (
    <header className="bg-gradient-to-r from-indigo-800 to-blue-700 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 md:py-3">
        <div className="flex justify-between items-center">
          {/* Logo (izquierda) */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-tight hover:text-blue-200 transition-colors duration-300 flex items-center group"
          >
            <FaUserCircle className="mr-2 text-indigo-200 group-hover:text-white transition-colors duration-300" />
            <span className="text-white group-hover:text-blue-200 transition-colors duration-300">
              Bienestar Estudiantil
            </span>
          </Link>

          {/* Menú Desktop (centro/derecha) */}
          <div className="hidden md:flex items-center space-x-7">
            <nav className="flex space-x-6">
              {isLoggedIn && (
                <>
                  <Link
                    to="/encuesta"
                    className={`text-lg font-medium relative group ${
                      location.pathname === "/encuesta"
                        ? "text-yellow-300"
                        : "text-white hover:text-blue-200"
                    } transition-colors duration-300`}
                  >
                    Encuesta
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                        location.pathname === "/encuesta" ? "scale-x-100" : ""
                      }`}
                    ></span>
                  </Link>
                  <Link
                    to="/agenda"
                    className={`text-lg font-medium relative group ${
                      location.pathname === "/agenda"
                        ? "text-yellow-300"
                        : "text-white hover:text-blue-200"
                    } transition-colors duration-300`}
                  >
                    Agenda
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                        location.pathname === "/agenda" ? "scale-x-100" : ""
                      }`}
                    ></span>
                  </Link>
                </>
              )}
              <Link
                to="/servicios"
                className={`text-lg font-medium relative group ${
                  location.pathname === "/servicios"
                    ? "text-yellow-300"
                    : "text-white hover:text-blue-200"
                } transition-colors duration-300`}
              >
                Servicios
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    location.pathname === "/servicios" ? "scale-x-100" : ""
                  }`}
                ></span>
              </Link>
              <Link
                to="/contacto"
                className={`text-lg font-medium relative group ${
                  location.pathname === "/contacto"
                    ? "text-yellow-300"
                    : "text-white hover:text-blue-200"
                } transition-colors duration-300`}
              >
                Contacto
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    location.pathname === "/contacto" ? "scale-x-100" : ""
                  }`}
                ></span>
              </Link>
              <Link
                to="/ayuda"
                className={`text-lg font-medium relative group ${
                  location.pathname === "/ayuda"
                    ? "text-yellow-300"
                    : "text-white hover:text-blue-200"
                } transition-colors duration-300`}
              >
                Ayuda
                <span
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
                    location.pathname === "/ayuda" ? "scale-x-100" : ""
                  }`}
                ></span>
              </Link>
            </nav>

            {/* Dropdown de usuario o botón de login */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full py-1 px-3 transition-all duration-200"
                  aria-expanded={userDropdown ? "true" : "false"}
                  aria-haspopup="true"
                >
                  <FaUserCircle className="text-xl" />
                  <span className="font-medium">Usuario</span>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${
                      userDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-3 w-52 bg-white rounded-lg shadow-xl py-2 z-50 transform origin-top-right animate-scale-in">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-gray-800 text-sm hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200 rounded-md mx-2"
                      onClick={toggleUserDropdown}
                    >
                      <FaUserCircle className="inline-block mr-2" /> Mi Perfil
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <button
                      className="w-full text-left px-4 py-2 text-gray-800 text-sm hover:bg-red-50 hover:text-red-600 transition-colors duration-200 rounded-md mx-2 flex items-center"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="mr-2" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-indigo-700 font-semibold px-5 py-2 rounded-full hover:bg-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Iniciar Sesión
              </Link>
            )}
          </div>

          {/* Botón Hamburguesa (mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl text-white focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-1"
            aria-label="Menú"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Menú Mobile (desplegable) */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 bg-indigo-700 rounded-lg shadow-xl animate-slideDown overflow-hidden">
            <nav className="flex flex-col px-4 pt-2 pb-4 space-y-2">
              <Link
                to="/"
                className="flex items-center py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <FaHome className="mr-3 text-lg" /> Inicio
              </Link>
              <Link
                to="/encuesta"
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600 hover:text-white ${
                  location.pathname === "/encuesta"
                    ? "bg-indigo-600 text-yellow-300"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FaQuestionCircle className="mr-3 text-lg" /> Encuesta
              </Link>
              <Link
                to="/servicios"
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600 hover:text-white ${
                  location.pathname === "/servicios"
                    ? "bg-indigo-600 text-yellow-300"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FaLaptopCode className="mr-3 text-lg" /> Servicios
              </Link>
              <Link
                to="/agenda"
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600 hover:text-white ${
                  location.pathname === "/agenda"
                    ? "bg-indigo-600 text-yellow-300"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FaCalendarAlt className="mr-3 text-lg" /> Agenda
              </Link>
              <Link
                to="/contacto"
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600 hover:text-white ${
                  location.pathname === "/contacto"
                    ? "bg-indigo-600 text-yellow-300"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FaEnvelope className="mr-3 text-lg" /> Contacto
              </Link>
              <Link
                to="/ayuda"
                className={`flex items-center py-2 px-4 rounded-lg transition-all duration-200 hover:bg-indigo-600 hover:text-white ${
                  location.pathname === "/ayuda"
                    ? "bg-indigo-600 text-yellow-300"
                    : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                <FaQuestionCircle className="mr-3 text-lg" /> Ayuda
              </Link>
            </nav>

            {isLoggedIn && (
              <>
                <hr className="border-indigo-600 mx-4" />
                <div className="px-4 pb-2 space-y-2">
                  <Link
                    to="/perfil"
                    className="flex items-center py-2 px-4 hover:bg-indigo-600 rounded-lg transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <FaUserCircle className="mr-3 text-lg" /> Mi Perfil
                  </Link>
                  <button
                    className="w-full text-left py-2 px-4 hover:bg-indigo-600 rounded-lg transition-all duration-200 flex items-center text-red-300 hover:text-white"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt className="mr-3 text-lg" /> Cerrar Sesión
                  </button>
                </div>
              </>
            )}

            {!isLoggedIn && (
              <div className="px-4 pb-4">
                <Link
                  to="/login"
                  className="block w-full mt-4 bg-white text-indigo-700 py-3 text-center rounded-full font-semibold hover:bg-gray-100 hover:shadow-md transition-all duration-300 transform hover:scale-105"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
