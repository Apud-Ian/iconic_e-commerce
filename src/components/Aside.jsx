import { useEffect, useState } from "react";
import { getAllCat } from "../api/category";
import { NavLink } from "react-router";
const Aside = ()=>{
  const [categories, setCategories] = useState([]);
  const [showContactUs, setShowContactUs] = useState(false);
  const [error, setError] = useState(null);
  const [showCat , setShowCat] = useState(true);


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
        console.log(categoriesData)
        setCategories(categoriesData);
        
      } catch (error) {

        setError(error.message);
      }
    };
  
    fetchData();
  },[]); 

    return(<aside className="hidden md:flex m-4 max-h-[700px] w-72 bg-[#FAF3E0] shadow-lg rounded-lg overflow-hidden">
      <div className="h-full w-full px-4 py-6 overflow-y-auto">
          <ul className="space-y-4">
              <li className="p-4 border-b border-gray-300">
                  <button onClick={() => {handleShowCat()}} className="w-full flex justify-between items-center text-xl font-medium text-gray-800 hover:text-blue-500 transition">
                      Categorías ⏷
                  </button>
                  <div className={`flex flex-col mt-2 transition-all duration-300 ${showCat ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      {error}
                      {categories.map((cat, index) => (
                          <NavLink className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md transition" to={`iconic_e-commerce/Category/${cat.Name_Category}`} key={index}>
                              {cat.Name_Category}
                          </NavLink>
                      ))}
                  </div>
              </li>
              <li className="p-4 border-b border-gray-300">
                  <button onClick={() => {handleShowContactUs()}} className="w-full flex justify-between items-center text-xl font-medium text-gray-800 hover:text-blue-500 transition">
                      Contáctanos ⏷
                  </button>
                  <ul className={`mt-2 transition-all duration-300 ${showContactUs ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                      <li className="flex flex-row hover:bg-gray-200 rounded-md transition items-center">
                         <img src="https://static.whatsapp.net/rsrc.php/v4/yP/r/rYZqPCBaG70.png" className="w-6 h-6" alt="whatsapp" />
                          <a href="https://wa.me/+598092767290" className="block py-2 px-4 text-gray-700 rounded-md transition">WhatsApp</a>
                      </li>
                      <li>
                          <a href="https://www.instagram.com/icn.uy/" className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded-md transition">Instagram 📸 </a>
                      </li>
                  </ul>
              </li>
              <li className="p-4 border-b border-gray-300">
              <NavLink to="/iconic_e-commerce/about" className="w-full flex justify-between items-center text-xl font-medium text-gray-800 hover:text-blue-500 transition">Sobre Nosotros</NavLink>
              </li>
          </ul>
      </div>
  </aside>

    )
}

export default Aside ;