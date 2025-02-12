import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getProductById } from "../api/product";

const ProductPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductById(id); 
        setData(result);  // Asegurarse de acceder al primer elemento
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // 👈 Agregar id como dependencia

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

  if (!data) return <p>No se encontró el producto</p>;

  return (
    <div>
      <img src={data.image} alt={data.name} />
      <h1>{data.name}</h1>
    </div>
  );
};

export default ProductPage;
