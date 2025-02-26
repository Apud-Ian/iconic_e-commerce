import { useState } from "react";
import { deleteCat } from "../api/category";

export const CategoryCard = ({ Id, Name }) => {
  const [invisible, setInvisible] = useState(false);
  const [show, setShow] = useState(false);

  const handleDeleteCategory = async () => {
    try {
      setInvisible(true);
      await deleteCat(Id);
    } catch (error) {
      console.error("Error al eliminar categoría:", error.message);
    }
  };

  return (
    <li className={!invisible ? "flex justify-between items-center bg-gray-100 p-2 rounded shadow-sm" : "hidden"}>
      <span>{Name}</span>
      <button
        onClick={() => setShow(true)}
        className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-800"
      >
        x
      </button>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-lg font-semibold">¿Seguro que quieres borrar la categoría?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => {
                  handleDeleteCategory();
                  setShow(false);
                }}
              >
                Borrar
              </button>
              <button
                onClick={() => setShow(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};
