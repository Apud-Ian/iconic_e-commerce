import { NavLink } from "react-router";
import carrito from "../assets/carro-de-la-compra.png"
const NavBar = ()=>{
    return(
        <nav className="bg-gray-800 p-1 z-40">
            <ul className="flex space-x-1 items-center">
                <li className="h-12 p-2 items-center">
                    <NavLink to="/" className={({isActive})=>
                    `text-white px-3  flex rounded ${
                    isActive ? "bg-gray-900 font-bold" : "hover:bg-gray-700"}`}>
                        <div className="w-12 items-center h-8">
                        <h2 className="text-center items-center">Home</h2>
                        </div>
                    </NavLink>
                </li>
                <li className="h-12 p-2 items-center">
                    <NavLink to="/ShoppingCart" className={({isActive})=>
                    `text-white px-3  flex rounded ${
                    isActive ? "bg-gray-900 font-bold" : "hover:bg-gray-700"}`}>
                        <div className="w-8 items-center h-8">
                        <img className="w-full h-full object-cover" src={carrito}/>
                        </div>
                    </NavLink>
                </li>
            </ul>

        </nav>
    )
}

export default NavBar;