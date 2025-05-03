import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Asegúrate de tener useNavigate si lo estás usando
import { FaBars, FaTimes, FaUserCircle, FaSearch, FaChevronDown, FaSignOutAlt } from 'react-icons/fa';

export const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const dropdownRef = useRef(null);
    const navigate = useNavigate(); // Asegúrate de tener useNavigate si lo estás usando

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Función de búsqueda
    const handleSearch = (e) => {
        e.preventDefault();
        alert(`Buscando: ${searchQuery}`);
        // Aquí implementarías tu lógica de búsqueda
    };

    // Función para cerrar sesión y redirigir al login (asumiendo que la tienes)
    const handleLogout = () => {
        // ... tu lógica de cierre de sesión ...
        setUserDropdown(false);
        setIsOpen(false);
        navigate('/login');
    };

    // Determinar si el usuario está "logueado" (ejemplo)
    const isLoggedIn = true; // Cambiar a tu lógica real

    return (
        <header className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 flex-1">
                        <Link to="/" className="text-2xl font-bold hover:text-indigo-200 transition-colors flex items-center">
                            <FaUserCircle className="mr-2" />
                            Bienestar Estudiantil
                        </Link>
                        <form
                            onSubmit={handleSearch}
                            className="hidden lg:flex items-center bg-indigo-500 rounded-full px-3 py-1 flex-1 max-w-md focus-within:ring-2 focus-within:ring-indigo-300 transition-shadow duration-200"
                        >
                            <button type="submit" className="text-indigo-200 hover:text-white"><FaSearch /></button>
                            <input type="text" placeholder="Buscar servicios..." className="bg-transparent border-none focus:ring-0 text-white placeholder-indigo-200 w-full ml-2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </form>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <nav className="flex space-x-6">
                            <Link to="/encuesta" className={`hover:text-indigo-200 transition-all duration-200 font-medium ${location.pathname === '/encuesta' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'hover:border-b-2 hover:border-yellow-300'}`}>Encuesta</Link>
                            <Link to="/servicios" className={`hover:text-indigo-200 transition-all duration-200 font-medium ${location.pathname === '/servicios' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'hover:border-b-2 hover:border-yellow-300'}`}>Servicios</Link>
                            <Link to="/agenda" className={`hover:text-indigo-200 transition-all duration-200 font-medium ${location.pathname === '/agenda' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'hover:border-b-2 hover:border-yellow-300'}`}>Agenda</Link>
                            <Link to="/contacto" className={`hover:text-indigo-200 transition-all duration-200 font-medium ${location.pathname === '/contacto' ? 'text-yellow-300 border-b-2 border-yellow-300' : 'hover:border-b-2 hover:border-yellow-300'}`}>Contacto</Link>
                        </nav>
                        {isLoggedIn ? (
                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setUserDropdown(!userDropdown)} className="flex items-center space-x-1 hover:text-indigo-200 focus:outline-none cursor-pointer">
                                <span className="hover:text-yellow-300 transition-colors duration-200">Usuario</span>
                                    <FaChevronDown className={`transition-transform duration-200 ${userDropdown ? 'transform rotate-180' : ''}`} />
                                </button>
                                {userDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 animate-slideIn">
                                        <Link to="/perfil" className="block px-4 py-2 text-gray-800 hover:bg-indigo-50 transition-colors duration-150" onClick={() => setUserDropdown(false)}>Mi Perfil</Link>
                                        <Link to="/login" className="w-full text-left px-4 py-2 text-gray-800 hover:bg-indigo-50 transition-colors duration-150 flex items-center" onClick={handleLogout}>
                                            <FaSignOutAlt className="mr-2" />
                                            Cerrar Sesión
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition">Iniciar Sesión</Link>
                        )}
                    </div>

                    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl focus:outline-none" aria-label="Menú">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
        </header>
    );
};