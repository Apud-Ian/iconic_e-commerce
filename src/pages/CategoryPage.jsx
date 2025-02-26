import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getByCat } from "../api/product.js";
import Card from "../components/Card.jsx";

const CategoryPage = () => {
  const { category } = useParams();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState(""); 

  const totalPages = 10; // Número total de páginas

  // Llamada a la API
  useEffect(() => {
    console.log(category)
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getByCat(category, page);
        setData(result.data || []); // Evitar undefined
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, page]); // Se ejecuta cuando cambia la categoría o la página

  // Ordenar productos
  const sortedProducts = [...data].sort((a, b) => {
    if (order === "lower") return a.price - b.price;
    if (order === "higher") return b.price - a.price;
    return 0;
  });

  if (loading) {
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

  return (
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

      {/* Paginación */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((x) => (
          <button 
            key={x} 
            onClick={() => setPage(x)}
            className={`px-3 py-1 border rounded-lg ${
              page === x ? "bg-gray-900 text-white" : "bg-transparent border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white"
            }`}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
