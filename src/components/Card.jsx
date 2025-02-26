import { NavLink } from "react-router-dom";
 const Card = ({ item }) => {
  const url = `/iconic_e-commerce/product/${item.id}`;

  return (
    <NavLink to={url} onClick={()=>window.scrollTo(0, 0)}>
  <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-72">
    <div className="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
      <img 
        src={item.Image_URL} 
        alt={item.Name_Product || "Producto"} 
        className="h-full w-full object-cover rounded-md"
      />
    </div>

    <div className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-slate-800 text-xl font-semibold">{item.Name_Product}</p>
        <div>
        <p>-{item.Discount}%</p>
        <p className="text-rose-800 text-md font-semibold">${item.Price}</p>
        <p className="text-emerald-400 text-xl font-semibold">${Math.trunc(item.Price - (item.Price * item.Discount) / 100)}</p>
        </div>
      </div>
    </div>
    <button className="rounded-md w-full mt-6 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
      Add to Cart
    </button>
  </div>
</NavLink>

  );
};


export default Card;