import { useState } from "react";
import { removeFromCart } from "../api/shopCart";

const Cart = ({ item, user, products, setProducts }) => {
  const [eliminate, setEliminate] = useState(false);
  const handleEliminate = async () => {
    setEliminate(true);

    if (user) {
      console.log("Esta es el botón de la página", item.Id_Product, user);
      try {
        await removeFromCart(user, item.Id_Product, item.Color, item.Size);

        // 🔹 Filtrar el producto eliminado y actualizar el estado
        setProducts((prevProducts) => prevProducts.filter((p) => p.Id_Product !== item.Id_Product));
      } catch (error) {
        console.error("Error eliminando producto del carrito:", error);
        setEliminate(false); // Si falla la eliminación en la API, mostramos la card nuevamente
      }
    } else {
      // Obtener el carrito del localStorage
      let cartList = JSON.parse(localStorage.getItem("shopCart")) || [];

      // Filtrar el producto a eliminar
      const updatedList = cartList.filter((product) => product.Id_Product !== item.Id_Product);

      // Actualizar el localStorage con la nueva lista
      localStorage.setItem("shopCart", JSON.stringify(updatedList));

      // 🔹 Actualizar el estado
      setProducts(updatedList);
    }
  };


  return (

      <div
        className={`${
          eliminate ? "hidden" : "flex flex-col sm:flex-row items-center bg-white p-3 rounded-xl shadow-md border border-gray-300 transition-all duration-300 hover:shadow-lg"
        }`}
      >
        {/* Imagen del producto */}
        <img
          src={item.Image_URL}
          alt={item.Name_Product}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border"
        />

        {/* Información del producto */}
        <div className="flex flex-col sm:flex-1 sm:ml-4 text-center sm:text-left">
          <h1 className="text-md sm:text-lg font-bold text-gray-800">{item.Name_Product}</h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Color: <span className="font-semibold">{item.Color}</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            {item.Size ? "Tamaño:" : ''} <span className="font-semibold">{item.Size}</span>
          </p>
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            ${Math.trunc(item.Price - (item.Price * item.Discount) / 100)}
          </span>
        </div>

        {/* Botón para eliminar */}
        <button
          onClick={handleEliminate}
          className="mt-3 sm:mt-0 bg-red-500 text-white px-3 py-1 rounded-md text-sm sm:text-lg flex items-center gap-1 hover:bg-red-600 transition"
        >
          🗑️ <span className="font-semibold">Eliminar</span>
        </button>
      </div>

  );
};

export default Cart;
