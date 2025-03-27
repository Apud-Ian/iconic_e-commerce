import { useState, useEffect } from "react";
import Cart from "../components/Cart.jsx";
import { getUser } from "../api/user.js";
import { getCartByUser } from "../api/shopCart.js";
import WhatsAppCartButton from "../components/WhatsAppCartButton.jsx";
import ButtonShopOnline from "../components/ButtonShopOnline.jsx"
const ShoppingCartPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [user, setUser] = useState(null);
  const [userGmail , setUserGmail] = useState(null)
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const checkUser = async () => {
      const result = await getUser();
      if (result) {
        setUser(result.Id_User);
        setUserGmail(result.User_Gmail)
      } else {
        fetchCartDataStorage();
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData(user);
    }
  }, [user]);

  const fetchData = async (user) => {
    const result = await getCartByUser(user);
    setProducts(result.data.items);
  };

  const fetchCartDataStorage = () => {
    const shopCart = localStorage.getItem("shopCart");
    const parsedCart = shopCart ? JSON.parse(shopCart) : [];
    setProducts(parsedCart); // Ahora `products` se llena con los datos del localStorage
  };
    
  useEffect(() => {
    if (!products || products.length === 0) return; // ✅ Evita errores
  
    const total = products.reduce((acc, item) => acc + item.Price, 0);
    const discount = products.reduce((acc, item) => acc + item.Price * (item.Discount / 100), 0);
  
    setTotalDiscount(discount);
    setTotalPrice(total);
  }, [products]);


  const clearCart = () => {
    localStorage.removeItem("shopCart");
    setProducts([]);
  };
  if (!products || products.length === 0) {
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

      <div className="mt-6 flex flex-col md:flex-row justify-between mb-20 gap-6 w-full max-w-4xl">
        {/* Lista de productos */}
        <div className="p-4 flex flex-col gap-6 w-full md:w-3/5 lg:w-2/3 lg:pr-12">
        {products.map((item) => (
          <Cart key={item.Id_Product} item={item} setProducts={setProducts} user={user} />
        ))}
        </div>

        <div className="bg-white lg:flex flex-col p-4 rounded-2xl w-full hidden max-w-sm shadow-lg lg:fixed lg:right-4 lg:top-60">
  <h3 className="text-xl font-bold text-center">Pedido</h3>
  <span className="text-md text-center">Precio total: ${totalPrice}</span>
  {totalDiscount > 0 && (
    <span className="text-lg text-center text-red-500">Descuento: -${Math.trunc(totalDiscount)}</span>
  )}
  <span className="text-lg text-center font-semibold">
    Total a pagar: ${Math.trunc(totalPrice - totalDiscount)}
  </span>
  <div className="mt-4 flex flex-col gap-3">
   <WhatsAppCartButton products={products}/>
   <ButtonShopOnline userGmail={userGmail}/>
  </div>
</div>

{/* Solo en pantallas pequeñas (se oculta en grandes) */}
<div className="fixed z-50 w-full h-auto max-w-lg bg-[#FAF3E0] border border-gray-200 rounded-t-2xl bottom-20 left-1/2 -translate-x-1/2 shadow-lg p-4 lg:hidden">
  <h3 className="text-xl font-bold text-center">Pedido</h3>
  <span className="text-md text-center">Precio total: ${totalPrice}</span>
  {totalDiscount > 0 && (
    <span className="text-lg text-center text-red-500">Descuento: -${Math.trunc(totalDiscount)}</span>
  )}
  <span className="text-lg text-center font-semibold">
    Total a pagar: ${Math.trunc(totalPrice - totalDiscount)}
  </span>
  <div className="mt-4 flex flex-col gap-3">
  <WhatsAppCartButton products={products}/>
  <ButtonShopOnline userGmail={userGmail}/>
  </div>
</div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
