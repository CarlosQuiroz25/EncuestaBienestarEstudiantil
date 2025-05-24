export const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bienestar Estudiantil</h3>
              <p className="text-gray-300">Promoviendo el desarrollo integral de nuestros estudiantes.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li><a href="/servicios" className="text-gray-300 hover:text-white">Servicios</a></li>
                <li><a href="/agenda" className="text-gray-300 hover:text-white">Agenda</a></li>
                <li><a href="/contacto" className="text-gray-300 hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <p className="text-gray-300">Email: bienestar@universidad.edu</p>
              <p className="text-gray-300">Teléfono: +123 456 7890</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Bienestar Estudiantil. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    );
  };

export default Footer;