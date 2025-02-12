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

  // Función para eliminar un producto y actualizar el estado
  const handleRemoveProduct = (id) => {
    const updatedCart = productsCart.filter((item) => item.id !== id);
    localStorage.setItem("cartList", JSON.stringify(updatedCart));
    setProductsCart(updatedCart);
    useEffect(() => {
        const total = productsCart.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
      }, [productsCart]);
  };

  // 🔥 Nueva función para limpiar el carrito completamente
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
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-400 p-4">
      <h1 className="text-3xl font-semibold">MI CARRITO</h1>
      <button 
            className="rounded-md p-2 shadow-xl bg-gray-700 text-white mt-4"
            onClick={clearCart} // 🔥 Vaciar carrito
          >
            Vaciar carrito
          </button>
      <div className="m-2 flex flex-row justify-between gap-10 p-8">
        <div className="p-6 flex flex-col gap-6">
          {productsCart.map((item, index) => (
            <Cart key={index} item={item} onRemove={handleRemoveProduct} />
          ))}
        </div>
        <div className="mt-6 bg-white flex flex-col p-4 rounded-2xl">
          <h3 className="text-xl font-bold">Pedido</h3>
          <span className="text-lg">Total a pagar: ${totalPrice}</span>
          <div className="p-2 flex flex-col">
            <button className="rounded-md p-1 shadow-2xl bg-red-500 m-2">
              Realizar pedido onlie
            </button>
            <button className="rounded-md p-1 shadow-2xl bg-green-600 m-2">
              Comprar por whatsapp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
