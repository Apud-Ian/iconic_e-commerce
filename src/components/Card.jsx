import { NavLink } from "react-router-dom";
import AddToCart from "../components/AddToCart.jsx"
 const Card = ({ item }) => {
  const url = `/iconic_e-commerce/product/${item.id}`;

  return (
    <NavLink to={url} onClick={()=>window.scrollTo(0, 0)}>
  <div className="border rounded-lg shadow-md m-2 flex flex-col items-center w-full sm:w-[250px] md:w-[300px] h-[350px] md:h-[400px] overflow-hidden">
    <div className="w-full m-3 h-2/3 overflow-hidden">
      <img 
        src={item.image} 
        alt={item.title || "Producto"} 
        className="w-full h-full object-cover rounded-md"
      />
    </div>

    <div className="px-5 h-1/6 flex items-center justify-center">
      <h3 className="text-sm font-semibold tracking-tight text-gray-900 text-center truncate w-full">
        {item.title}
      </h3>
    </div>

    <div className="flex items-center gap-2 justify-center md:flex-row  w-full h-1/6">
      <span className="text-gray-900 font-medium">${Math.trunc(43 * item.price)}</span>
      <AddToCart item={item} />
    </div>
  </div>
</NavLink>

  );
};


export default Card;