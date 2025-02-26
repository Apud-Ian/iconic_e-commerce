import { useState } from "react";
import { NavLink } from "react-router-dom"; // Corrección: Importar desde react-router-dom

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Categorías");

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300"
      >
        {selected} ⏷
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute md:top-0 md:left-full lg:left-0  z-50 mt-2 bg-white border rounded-md shadow-lg p-2">
          <ul className="flex flex-row md:flex-col items-start md:items-center justify-start gap-2">
            <li>
              <NavLink
                to="iconic_e-commerce/Category/vestido"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md transition duration-200"
                onClick={() => handleSelect("vestido")}
              >
                vestido
              </NavLink>
            </li>
            <li>
              <NavLink
                to="iconic_e-commerce/Category/men's clothing"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md transition duration-200"
                onClick={() => handleSelect("Ropa masculina")}
              >
                Ropa masculina
              </NavLink>
            </li>
            <li>
              <NavLink
                to="iconic_e-commerce/Category/women's clothing"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 rounded-md transition duration-200"
                onClick={() => handleSelect("Ropa femenina")}
              >
                Ropa femenina
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
