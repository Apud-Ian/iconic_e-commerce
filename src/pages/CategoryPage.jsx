import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllProductByCategoria } from "../api/product.js";
import Card from "../components/Card.jsx";
const CategoryPage = () =>{
  const [order, setOrder] = useState(""); // Copia de products

  const {category} = useParams()
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllProductByCategoria(category);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);
  const [sortedProducts, setSortedProducts] = useState([...data]); 
  useEffect(() => {
    let sorted = [...data]; // Copia para evitar modificar el estado original

    if (order === "lower") {
      sorted.sort((a, b) => a.price - b.price);
    }
    if (order === "higher") {
      sorted.sort((a, b) => b.price - a.price);
    }

    setSortedProducts(sorted);
  }, [order, data]); 



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

    return(
<div className="p-8">
  {/* Título */}
  <h3 className="text-2xl font-semibold mb-4">Ordenar por precio</h3>

  {/* Botones de ordenamiento */}
  <div className="flex gap-4 mb-6">
    <button 
      onClick={() => setOrder("lower")}  
      className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-500"
    >
      Menor precio 
    </button>
    <button 
      onClick={() => setOrder("higher")} 
      className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:ring-2 focus:ring-gray-500"
    >
      Mayor precio
    </button>
  </div>

  {/* Productos ordenados */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {sortedProducts.map((item, index) => (
      <Card key={index} item={item} />
    ))}
  </div>
</div>

    );
};

export default CategoryPage;
