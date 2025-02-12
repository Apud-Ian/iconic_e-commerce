import { NavLink } from "react-router";
import carrito from "../assets/carro-de-la-compra.png"
import Dropdown from "./DropDown";

const NavBar = ()=>{

    return(
<nav className="bg-white border-gray-200 ">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4" >
            <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <span className="self-center text-2xl font-semibold whitespace-nowrap">ICONIC</span>
            </NavLink>
        <div className="hidden w-full md:block md:w-auto">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            <li className="h-12 p-2 flex items-center">
                <Dropdown/>
            </li>
                 <li className="h-12 p-2 flex items-center">
                    <NavLink to="/CreateProduct" className="">
                     Crear objetos nuevos    
                    </NavLink>
                </li>
                <li className="h-12 p-2 flex items-center">
                    <NavLink to="/ShoppingCart" className="block px-4 py-2 hover:bg-gray-100">
                        <div className="w-8 h-8 flex items-center justify-center"> {/* Centra el ícono */}
                            <img className="w-full h-full object-cover" src={carrito} />
                        </div>
                    </NavLink>
                </li>
            </ul>
        </div>
    </div>
</nav>
    )
}

export default NavBar;