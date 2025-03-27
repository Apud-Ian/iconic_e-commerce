import { addToCart } from "../api/shopCart";

const AddToCart = ({ ProductUser }) => {
  const handleShopCart = async () => {
    const Id_User = ProductUser?.Id_User || '';
    const Id_Product = ProductUser?.Id_Product;
    const color = ProductUser?.color || null;
    const size = ProductUser?.size || null;

    if (Id_User.length > 0) {
      // Si el usuario está logueado, agregar a la base de datos
      const result = await addToCart(Id_User, Id_Product, 1, color, size);
      return result.data;
    } else {
      // Si el usuario NO está logueado, guardar en localStorage
      const shopCart = JSON.parse(localStorage.getItem("shopCart")) || [];

      const product = {
        Id_Product,
        Quantity: 1,
        Color: color,
        Size: size,
      };

      shopCart.push(product);
      localStorage.setItem("shopCart", JSON.stringify(shopCart));
    }
  };

  return (
    <button
      onClick={handleShopCart}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all"
    >
      🛒 Agregar al carrito
    </button>
  );
};

export default AddToCart;
