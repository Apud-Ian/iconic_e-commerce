import { NavLink } from "react-router";
import { useState, useEffect } from "react";
import { getUser } from "../api/user";
import { User } from "lucide-react";
import carrito from '../assets/shopping-cart_icon-icons.com_65051.svg'
const NavBot = ()=>{

      const [admin, setAdmin] = useState(false);
    
        useEffect(() => {
          const checkUser = async () => {
              const result = await getUser();
              console.log(result)
            if(result?.Role==="admin"){
              setAdmin(true);
            }
          };
      
          checkUser();
      }, []);

    return(
        <div className="fixed z-50 w-full block md:hidden h-16 max-w-lg -translate-x-1/2 bg-[#FAF3E0]  border border-gray-200 rounded-full bottom-0 left-1/2 ">
            <div className="flex justify-between h-fulla align-middle p-2 px-8  max-w-lg mx-auto">
                <NavLink to="/iconic_e-commerce/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50">  
                    <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" 
                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                    </svg>      
                </button>  
                </NavLink>
    <div className={admin ? '' : 'hidden'}>
        <NavLink to="/iconic_e-commerce/CreateProduct">
            <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50">
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" 
                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                </svg>           
            </button>  
        </NavLink>
    </div>
    <div className={admin ? 'hidden' : ''}>
        <NavLink to="/iconic_e-commerce/UserPage" >
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50">
        <User size={32} strokeWidth={2} className="text-gray-500" />
        </button>
        </NavLink>
    </div>
    <NavLink to="/iconic_e-commerce/ShoppingCart">
        <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-50"> 
            <img className="w-6 h-6 object-contain" src={carrito} alt="Carrito" />
        </button> 
    </NavLink>
    </div> 
</div>
    )
}

export default NavBot;