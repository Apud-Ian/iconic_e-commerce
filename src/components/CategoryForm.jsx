import { useState, useEffect } from "react";
import { createCat, getAllCat } from "../api/category";
import { CategoryCard } from "./CategoryCard";

export const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]); 

  const handleAddCategory = async () => {
    if (!categoryName.trim()) return; // Evita nombres vacíos

    try {
      const result = await createCat(categoryName);
      setCategories([...categories, result.data]); // Agrega la nueva categoría
      setCategoryName(""); // Limpia el input
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error al crear categoría:", error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-1">
    <div className="w-full max-w-3xl bg-white p-4 md:p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
        Administrar Categorías
      </h2>
  
      {/* Input y botón */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <label htmlFor="categoryName" className="font-medium w-full md:w-auto">
          Nombre de Categoría:
        </label>
        <input
          id="categoryName"
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2 rounded w-full md:flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ejemplo: Ropa Femenina"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition w-full md:w-auto"
        >
          Crear
        </button>
      </div>
  
      {/* Lista de Categorías con Scroll */}
      <div className="w-full max-w-md mx-auto md:max-w-full h-96 overflow-y-auto border p-2 rounded bg-gray-50">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center">No hay categorías aún.</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((cat, index) => (
              <CategoryCard Id={cat.Id_Category} Name={cat.Name_Category} key={index} />
            ))}
          </ul>
        )}
      </div>
    </div>
  </div>
  
  );
};

export default CategoryForm;
