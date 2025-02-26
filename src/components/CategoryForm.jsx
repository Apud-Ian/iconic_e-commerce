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
    <div className="w-full md:w-2/3 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Administrar Categorías</h2>

      {/* Input y botón */}
      <div className="flex items-center gap-2 mb-4">
        <label className="font-medium">Nombre de Categoría:</label>
        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAddCategory}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear Categoría
        </button>
      </div>

      {/* Lista de Categorías con Scroll */}
      <div className="w-64 h-40 overflow-y-auto border p-2 rounded">
        {error && <p className="text-red-500 text-center">{error}</p>}
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center">No hay categorías aún.</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((cat,index) => (<CategoryCard Id={cat.Id_Category} Name={cat.Name_Category} key={index} /> ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategoryForm;
