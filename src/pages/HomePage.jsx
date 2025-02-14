import { useState, useEffect } from "react";
import { getAllProducts } from "../api/product.js";
import ICONIC from '../assets/ICONIC.png'
import Card from "../components/Card.jsx";
const HomePage = () =>{
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const storedProducts = localStorage.getItem("newProduct");
  const productAddByUser = storedProducts ? JSON.parse(storedProducts) : [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProducts(); 
        setData(result); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if(loading){
    return (
      <div className="flex justify-center items-center h-screen w-full flex-col">
        <ul className="flex space-x-4">
          <li className="animate-ping rounded-full bg-sky-400 h-6 w-6"></li>
          <li className="animate-ping rounded-full bg-sky-400 h-6 w-6 delay-200"></li>
          <li className="animate-ping rounded-full bg-sky-400 h-6 w-6 delay-400"></li>
        </ul>
        <p className="text-gray-700 mt-4">Loading...</p>
      </div>
    );
    
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }


   const productList = [...productAddByUser, ...data];
   
   const newProducts = productList.slice(0,4)  
    return(
    <div className="w-screen overflow-x-hidden bg-white">

    <div className="relative w-full h-[500px]">
      <img
        className="absolute inset-0 w-full h-full object-cover  overflow-hidden"
        src={ICONIC}
        alt="Fondo"
      />
      </div>
      <div className="p-8">
      <h3 className="text-2xl  font-semibold mb-4">Nuevos arribos</h3>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {newProducts.map((item, index) => <Card key={index} item={item} />)}
      </div>
    </div>
    <div className="p-8">
      <h3 className="text-2xl text-white font-semibold mb-4">Liquidación</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

       </div>
     </div>
    </div>
    );
};

export default HomePage;