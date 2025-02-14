import { useState, useEffect } from "react";
import Cart from "../components/Cart.jsx";

const ShoppingCartPage = () => {
  const [productsCart, setProductsCart] = useState([]);
  let [totalPrice, setTotalPrice] = useState(0);

  // Función para obtener datos del carrito
  const fetchCartData = () => {
    const cartList = localStorage.getItem("cartList");
    const parsedCart = cartList ? JSON.parse(cartList) : [];
    setProductsCart(parsedCart);
  };

  // Obtener carrito al cargar la página
  useEffect(() => {
    fetchCartData();
  }, []);

  // Calcular el total cuando cambie productsCart
  useEffect(() => {
    let total = productsCart.reduce((acc, item) => acc + item.price, 0);
    setTotalPrice(total);
  }, [productsCart]); // 🔥 Se ejecuta cada vez que cambia `productsCart`

  const handleRemoveProduct = (id) => {
    const updatedCart = productsCart.filter((item) => item.id !== id);
    localStorage.setItem("cartList", JSON.stringify(updatedCart));
    setProductsCart(updatedCart);
    const total = productsCart.reduce((acc, item) => acc + item.price, 0);
    
    setTotalPrice(total);
  };

  useEffect(() => {
      const total = productsCart.reduce((acc, item) => acc + item.price, 0);
      setTotalPrice(total);
    }, [productsCart]);

  const clearCart = () => {
    localStorage.removeItem("cartList");
    setProductsCart([]);
  };

  if (productsCart.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gray-400 flex items-center justify-center p-4">
        <div>
          <h2 className="text-3xl font-semibold">HAY UN CARRITO QUE LLENAR.</h2>
          <p className="text-xl font-semibold mt-4">
            Actualmente no tenés productos en tu carrito.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center p-4 sm:p-6 md:p-8">

  <h1 className="text-3xl font-semibold">MI CARRITO</h1>

  <button 
    className="rounded-md p-2 shadow-xl bg-gray-700 text-white mt-4 w-full max-w-xs"
    onClick={clearCart} 
  >
    Vaciar carrito
  </button>

  <div className="mt-6 flex flex-col md:flex-row justify-between gap-6 w-full max-w-4xl">
    {/* Lista de productos */}
    <div className="p-4 flex flex-col gap-6 w-full">
      {productsCart.map((item, index) => (
        <Cart key={index} item={item} onRemove={handleRemoveProduct} />
      ))}
    </div>

    <div className="bg-white flex flex-col p-4 rounded-2xl w-full max-w-sm shadow-lg">
      <h3 className="text-xl font-bold text-center">Pedido</h3>
      <span className="text-lg text-center">Total a pagar: ${Math.trunc(43*totalPrice)}</span>

      <div className="mt-4 flex flex-col gap-3">
        <button className="rounded-md p-2 shadow-md bg-red-500 text-white w-full">
          Realizar pedido online
        </button>
        <button className="rounded-md p-2 shadow-md bg-green-600 text-white w-full">
          Comprar por WhatsApp
        </button>
      </div>
    </div>
  </div>
</div>
  );
};

export default ShoppingCartPage;
