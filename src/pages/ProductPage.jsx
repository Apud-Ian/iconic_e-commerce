import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getAllProductByCategoria, getProductById } from "../api/product.js";
import Card from "../components/Card.jsx";
const ProductPage = () => {
  const [data, setData] = useState(null);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Obtener datos del producto
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getProductById(id);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Obtener productos relacionados por categoría
  useEffect(() => {
    if (!data?.category) return; // Evitar ejecutar sin datos

    const fetchCategory = async () => {
      try {
        const categoryData = await getAllProductByCategoria(data.category);
        setCategory(categoryData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCategory();
  }, [data?.category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen w-full flex-col">
        <ul className="flex space-x-4">
          <li className="animate-ping rounded-full bg-sky-400 h-6 w-6"></li>
          <li className="animate-ping rounded-full bg-sky-400 h-6 w-6 delay-200"></li>
          <li className="animate-ping rounded-full bg-sky-400 h-6 w-6 delay-400"></li>
        </ul>
        <p className="text-gray-700 mt-4">Cargando...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
      </div>
    );
  }

  if (!data) return <p>No se encontró el producto</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img
          src={data.image}
          alt={data.name}
          className="w-64 h-64 object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">{data.name}</h1>
          <p className="text-lg text-gray-700">{data.description}</p>
          <span className="text-xl font-semibold text-green-600">
            ${data.price}
          </span>
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            Agregar al carrito
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Productos relacionados</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {category.slice(0, 4).map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
