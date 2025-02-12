import { NavLink } from "react-router";

const AddToCart = ({ item }) => {
    const handleAddToCart = () => {
      // Obtener la lista del localStorage
      const cartList = JSON.parse(localStorage.getItem("cartList")) || [];
      // Verificar si el producto ya está en el carrito
      const productExists = cartList.some((product) => product.id === item.id);
  
      if (productExists) {
        alert("Este producto ya está en el carrito.");
        return;
      }

      // Agregar el producto a la lista
      const updatedCart = [...cartList, item];
  
      // Guardar en localStorage
      localStorage.setItem("cartList", JSON.stringify(updatedCart));
  
    };
  
    return (
        <NavLink to='/ShoppingCart'>
      <button
        onClick={handleAddToCart}
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2"
      >
        <svg
          className="w-3 h-3.5 me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 21"
        >
          <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
        </svg>
        Añadir
      </button>
      </NavLink>
    );
  };
  
  export default AddToCart;
  