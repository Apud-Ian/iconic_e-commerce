import { NavLink } from "react-router";

const Footer = () => {
    return (
      <footer className="bg-[#FAF3E0] shadow-sm mt-auto py-4 px-4 border-t">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-700">
          {/* Sección de enlaces */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4 md:mb-0">
            <NavLink to="/iconic_e-commerce/about" className="hover:text-blue-500">Sobre Nosotros</NavLink>
            <a href='https://wa.me/+598092767290'className="hover:text-blue-500">Contactanos</a>
            <NavLink to="/iconic_e-commerce/terms" className="hover:text-blue-500">Términos y Condiciones</NavLink>
          </div>
          
          {/* Sección de redes sociales */}
          <div className="flex gap-4">
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-500">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        
        {/* Sección de derechos de autor */}
        <div className="text-center text-gray-500 text-sm mt-4">
          &copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.
        </div>
      </footer>
    );
  };

  export default Footer ;