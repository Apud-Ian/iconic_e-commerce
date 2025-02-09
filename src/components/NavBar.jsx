import { NavLink } from "react-router";
import carrito from "../assets/carro-de-la-compra.png"
import addProduct from "../assets/agregar-producto.png"
import { useState } from "react";


const NavBar = ()=>{
const [hidden, sethidden] = useState(false)

    return(
        <nav className="bg-gray-800 flex justify-between p-1 z-40">
            <ul className="flex space-x-1 order-1 items-center">
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
            <ul className="order-2 flex space-x-1 items-end">
            <NavLink to="/CreateProduct" className={({isActive})=>
                    `text-white p-1 flex rounded ${
                    isActive ? "bg-gray-900 font-bold" : "hover:bg-gray-700"}`}>
                <li className={ hidden ? 'w-8 rounded-full' : 'hidden'}>
                   <div>
                    <img src={addProduct} alt="" />
                   </div>
                </li>
                </NavLink>
                <li>
                    <button onClick={sethidden} className={hidden ? 'bg-green-600' : 'bg-red-700'}>tuky</button>
                </li>
            </ul>

        </nav>
    )
}

export default NavBar;