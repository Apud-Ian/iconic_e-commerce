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
    <div className="h-screen w-full bg-">
      <div className="p-8">
      <div className="inline-flex justify-between gap-3 m-2 rounded-md shadow-xs">
      <button onClick={() => setOrder("lower")}  className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
        menor precio 
      </button>
      <button onClick={() => setOrder("higher")} className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white">
        mayor precio
      </button>
    </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {sortedProducts.map((item, index) => <Card key={index} item={item} />)}
      </div>
    </div>
    </div>
    );
};

export default CategoryPage;
