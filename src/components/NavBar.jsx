import { useState } from "react";
import { NavLink } from "react-router-dom";
import carrito from "../assets/carro-de-la-compra.png";
import Dropdown from "./DropDown";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white z-50 shadow-xl border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <NavLink to="/iconic_e-commerce/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">ICONIC</span>
        </NavLink>

        {/* Botón Hamburguesa (solo en móviles) */}
        <button 
          className="md:hidden p-2 border rounded" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        {/* Menú normal (escondido en móviles) */}
        <div className="hidden md:block md:w-auto">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li className="h-12 p-2 flex items-center">
              <Dropdown />
            </li>
            <li className="h-12 p-2 flex items-center">
              <NavLink to="/iconic_e-commerce/CreateProduct">
                Crear objetos nuevos
              </NavLink>
            </li>
            <li className="h-12 p-2 flex items-center">
              <NavLink to="/iconic_e-commerce/ShoppingCart" className="block px-4 py-2 hover:bg-gray-100">
                <div className="w-8 h-8 flex items-center justify-center">
                  <img className="w-full h-full object-cover" src={carrito} alt="Carrito" />
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
          <ul className="flex flex-col gap-4">
            <li className="h-12 p-2 flex items-center">
              <Dropdown />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
