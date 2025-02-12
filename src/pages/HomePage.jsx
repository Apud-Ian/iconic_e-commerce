import { useState, useEffect } from "react";
import { getAllProducts } from "../api/product.js";
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
    <div className="h-screen w-full bg-white">

    <div className="relative w-full h-[500px]">
      <img
        className="absolute inset-0 w-full h-full object-cover  overflow-hidden"
        src="https://instagram.fmvd1-1.fna.fbcdn.net/v/t39.30808-6/452013047_17964828830781338_4825859611263070756_n.jpg?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMTI1eDExMzEuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fmvd1-1.fna.fbcdn.net&_nc_cat=102&_nc_ohc=Dp0dqj3Xlj4Q7kNvgEui3ec&_nc_gid=174877ddaddd46c78f86becd4ef7bdb1&edm=APoiHPcAAAAA&ccb=7-5&ig_cache_key=MzQxNjQwMjI4MDI0MzkxNDkyNQ%3D%3D.3-ccb7-5&oh=00_AYAJzyo3zoi_RXQsFhkBZUEdv6yZYZSgRLAfYH8ZtJdcrQ&oe=67A91C56&_nc_sid=22de04"
        alt="Fondo"
      />
      </div>
      <div className="p-8">
      <h3 className="text-2xl  font-semibold mb-4">Nuevos arribos</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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