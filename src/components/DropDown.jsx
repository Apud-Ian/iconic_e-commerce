import { useState } from "react";
import { NavLink } from "react-router";
export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("categorias");

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false); 
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2"
      >
        {selected}
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-32 bg-white border rounded-md shadow-lg">
          <ul className="py-1 flex flex-col items-center">
            <li
              onClick={() => handleSelect("joyería")}
              className="cursor-pointer hover:bg-gray-100"
            >
              <NavLink to="/Category/jewelery">
              joyería  
              </NavLink>
            </li>
            <li
              onClick={() => handleSelect("ropa masculina")}
              className="cursor-pointer hover:bg-gray-100"
            >
            <NavLink to="/Category/men's clothing">
              ropa masculina  
            </NavLink>
            </li>
            <li
              onClick={() => handleSelect("ropa femenina")}
              className=" cursor-pointer hover:bg-gray-100"
            >
            <NavLink to="/Category/women's clothing">
              ropa femenina  
            </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}