import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { Servicios } from '../pages/Servicios';
import { Agenda } from '../pages/Agenda';
import { Contacto } from '../pages/Contacto';
import { Header } from '../components/Header';
import Footer from "../components/Footer";
import Encuesta from '../pages/Encuesta';


export const AppRouter = () => {
  return (
    <Router>
      <Header /> {/* Header visible en todas las páginas */}
      <main className="min-h-[calc(100vh-120px)]"> {/* Espacio para el contenido */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/encuesta" element={<Encuesta  />} />
          <Route path="*" element={<div className="text-center py-20"><h1 className="text-4xl font-bold">404 - Página no encontrada</h1></div>} />
        </Routes>
      </main>
      <Footer /> {/* Footer visible en todas las páginas */}
    </Router>
  );
};