import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import carrito from "../assets/carro-de-la-compra.png";
import { getUser } from "../api/user.js";
import { getAllCat } from "../api/category.js";
import ICONIC from "../assets/ICONIC.png";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCat , setShowCat] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showContactUs, setShowContactUs] = useState(false);
  const [error, setError] = useState(null);

const handleShowCat = ()=>{
  if(showCat){
    setShowCat(false);
  }else{
    setShowCat(true);
  }
}

const handleShowContactUs = () => {
if(showContactUs){
  setShowContactUs(false);
}else{
  setShowContactUs(true)
}
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getAllCat(0, 0);
        
        setCategories(categoriesData);
        
      } catch (error) {

        setError(error.message);
      }
    };
  
    fetchData();
  },[]); 



    useEffect(() => {
      const checkUser = async () => {
          const result = await getUser();
        if(result?.Role==="admin"){
          setAdmin(true);
        }
      };
  
      checkUser();
  }, []);
  

  return (
    <nav className="bg-[#FAF3E0]  z-50 shadow-xl  border-[#D4AF37]">
      <div className="max-w-screen-xl flex flex-wrap  items-center h-16 justify-between mx-auto p-4">

        
        {/* Logo */}
        <NavLink to="/iconic_e-commerce/" className="items-center hidden md:block space-x-3 rtl:space-x-reverse">
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
        <NavLink to="/iconic_e-commerce/" className="flex md:hidden items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap">ICONIC</span>
        </NavLink>
        {/* Menú normal (escondido en móviles) */}
        <div className="hidden md:block  md:w-auto">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#FAF3E0]   md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-[#FAF3E0]">
          <li className="bg-[#FAF3E0]">
              <NavLink className="h-12 p-2 flex items-center" to="/iconic_e-commerce/">
              Inicio
              </NavLink>
            </li>
            <li>
              <NavLink className="h-12 p-2 flex items-center" to="/iconic_e-commerce/UserPage">
              Usuario
              </NavLink>
            </li>
            <li className={admin ? "h-12 p-2 flex items-center" : "hidden"}>
              <NavLink to="/iconic_e-commerce/CreateProduct">
                Crear objetos nuevos
              </NavLink>
            </li>
            <li className="h-12 p-2 flex items-center">
              <NavLink to="/iconic_e-commerce/ShoppingCart" className="block px-4 py-2 hover:bg-gray-100">
                <div className="w- h-7 flex items-center justify-center">
                  <img className="w-full h-full object-cover" src={carrito} alt="Carrito" />
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className=" hidden  lg:block gap-3 z-50 h-10">
        <div className="flex flex-row w-full align-middle justify-center gap-4">
           {error}
            {categories.map((cat , index)=>(
              <NavLink  to={`iconic_e-commerce/Category/${cat.Name_Category}`} key={index}>
                 <div className="border-b-1 m-1">
                     <span className="text-md font-light ">
                      {cat.Name_Category}
                     </span>
                </div>
               </NavLink>
                ))}  
                <div className=" justify-end ml-16 flex items-end">
                  <a href="https://wa.me/+598092767290">
                <li className="flex flex-row   rounded-md transition items-center">
                         <img src="https://static.whatsapp.net/rsrc.php/v4/yP/r/rYZqPCBaG70.png" className="w-6 h-6" alt="whatsapp" />
                          <a href="https://wa.me/+598092767290" className="block font-light py-2 px-4 text-gray-700 rounded-md transition">092767290</a>
                </li>
                </a>
                </div>
            </div> 
      </div>
      <div>
      {isOpen && (
        <aside className="fixed md:hidden top-0 left-0 z-40 w-64 h-screen transition-transform">
            <div className="h-full px-3 py-4 overflow-y-auto  bg-[#FAF3E0]">
            <button className="text-3xl fixed left-52" onClick={()=>setIsOpen(false)}>X</button>
              <ul className="space-y-2 my-8 flex-row-1 justify-between p-4 font-medium">
              
              <li className="p-4">
                <button onClick={()=>{handleShowCat()}}>
                  <span className="flex-1 ms-3 text-xl text-left rtl:text-right whitespace-nowrap">Categorías ⏷</span>
                </button>   
                <div className="flex flex-col justify-between">
                {error}
                {categories.map((cat , index)=>(
                  <NavLink className={showCat ? '' : 'hidden'} to={`iconic_e-commerce/Category/${cat.Name_Category}`} key={index}>
                    <div className="border-b-1 m-1">
                     <span className="flex-1 ms-3 text-md text-left rtl:text-right whitespace-nowrap">
                      {cat.Name_Category}
                     </span>
                    </div>
                  </NavLink>
                ))}   
                </div>         
              </li>
              <li className="p-4 transition-all">
                <button onClick={()=>{handleShowContactUs()}}>
                <span className="flex-1 ms-3 text-left rtl:text-right text-xl whitespace-nowrap">Contactanos ⏷</span>
                </button>
                <ul className={showContactUs ? "" : "hidden"}>
                <li className="flex flex-row hover:bg-gray-200 rounded-md transition items-center">
                         <img src="https://static.whatsapp.net/rsrc.php/v4/yP/r/rYZqPCBaG70.png" className="w-6 h-6" alt="whatsapp" />
                          <a href="https://wa.me/+598092767290" className="block py-2 px-4 text-gray-700 rounded-md transition">WhatsApp</a>
                      </li>
                  <li>
                    <a className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100" href="https://www.instagram.com/icn.uy/">
                      instagram
                    </a>
                  </li>
                </ul>
              </li>
              <li className="p-4 border-b border-gray-300">
              <NavLink to="/iconic_e-commerce/about" className="w-full flex justify-between items-center text-xl font-medium text-gray-800 hover:text-blue-500 transition">Sobre Nosotros</NavLink>
              </li>
              </ul>
            </div>
        </aside>
      )}
         
        </div>
    </nav>
    
  );
};

export default NavBar;
