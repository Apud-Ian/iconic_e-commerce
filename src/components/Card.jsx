import { NavLink } from "react-router-dom";
import AddToCart from "../components/AddToCart.jsx"
 const Card = ({ item }) => {
  const url = `/product/${item.id}`;

  return (
    <NavLink to={url}>
      <div className="border rounded-lg shadow-md p-4 h-[400px] flex flex-col items-center w-[250px]">
        <div className="w-full h-2/3">
        <img 
          src={item.image} 
          alt={item.title || "Producto"} 
          className="w-full h-full object-cover rounded-md"
        />
        </div>
        <div className="px-5 h-1/3 pb-5">
          <h3 className="text-sm font-semibold tracking-tight text-gray-900">{item.title}</h3>
        </div>
        <div className="flex items-center gap-4 justify-between">
        <span className="text-gray-900">${Math.trunc(43*item.price)}</span>
        <AddToCart item={item}/>
        </div>
      </div>
    </NavLink>
  );
};


export default Card;