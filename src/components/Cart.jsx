import { useState } from "react";

const Cart = ({ item }) => {
  const [eliminate, setEliminate] = useState(false);

  const handleEliminate = () => {
    setEliminate(true);
    let cartList = JSON.parse(localStorage.getItem("cartList")) || [];
    const updatedList = cartList.filter((product) => product.id !== item.id);
    localStorage.setItem("cartList", JSON.stringify(updatedList));
  };

  return (
    <div className={eliminate ? "hidden" : "bg-white grid grid-cols-2 gap-2 p-4 border"}>
      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
      <div>
        <h1 className="text-lg font-semibold">{item.name}</h1>
        <span className="text-gray-600">${item.price}</span>
        <button onClick={handleEliminate} className="bg-red-600 text-white px-2 py-1 rounded ml-4">
          X
        </button>
      </div>
    </div>
  );
};

export default Cart;
