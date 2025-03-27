import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

 const Card = ({ item }) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const url = `/iconic_e-commerce/product/${item.Name_Product}`;

  return isMobile ? (
    <NavLink to={url} onClick={() => window.scrollTo(0, 0)}>
    <div className="relative flex flex-col my-4 bg-white shadow-sm border m-1 border-slate-200 rounded-lg 
  w-[50vw] sm:w-[32vw] md:w-[24vw] lg:w-[16vw] max-w-64 p-[2vw] sm:p-4">

  {/* Contenedor de imagen con aspecto responsivo */}
  <div className="relative p-[1vw] sm:p-2 overflow-hidden rounded-xl bg-clip-border">
    <img
      src={item.Image_URL}
      alt={item.Name_Product || "Producto"}
      className="w-full object-cover rounded-md 
             aspect-[3/4] sm:aspect-[3/4] md:aspect-[3/4] lg:aspect-[3/4] h-[50vw] sm:h-[20vw] md:h-[15vw] lg:h-[12vw] max-h-64"
    />
  </div>

  {/* Contenido */}
  <div className="p-[1vw] sm:p-4">
    <div className="mb-[1vw] sm:mb-2 flex flex-col items-center gap-[1vw] sm:gap-2">
      <div className="w-full">
        <p className="text-slate-800 text-left text-[3vw] sm:text-lg font-semibold line-clamp-1">
          {item.Name_Product}
        </p>
      </div>

        <div className="w-full flex items-center justify-between gap-[1vw] sm:gap-4">
          <p className="text-[3vw] sm:text-lg font-semibold">
            ${Math.trunc(item.Price - (item.Price * item.Discount) / 100)}
            </p>
          <div className={item.Discount ? "flex items-center gap-[0.5vw] sm:gap-2" : "hidden"}>
            <p className="text-[2.5vw] sm:text-sm font-light line-through">
              ${item.Price}
            </p>
            <p className="rounded-md bg-green-200 px-[1vw] sm:px-2 text-[2vw] sm:text-xs">
              -{item.Discount}%
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</NavLink>
  ) : (
    <NavLink to={url} onClick={() => window.scrollTo(0, 0)}>
<div className="relative flex flex-col my-6 h-auto bg-white shadow-sm border m-1 border-slate-200 rounded-lg 
  w-full sm:w-28 md:w-64 p-2 sm:p-2">
  
  {/* Contenedor de imagen con aspecto responsivo */}
  <div className="relative p-2 overflow-hidden rounded-xl bg-clip-border">
    <img
      src={item.Image_URL}
      alt={item.Name_Product || "Producto"}
      className="w-full h-28 sm:h-auto object-cover aspect-[3/4] rounded-md"
    />
  </div>

  {/* Contenido */}
  <div className="p-2 sm:p-4">
    <div className="mb-1 sm:mb-2 flex flex-col items-center gap-1 sm:gap-2">
      <div className="w-full">
        <p className="text-slate-800 text-left text-sm sm:text-lg font-semibold line-clamp-1">
          {item.Name_Product}
        </p>
      </div>

      <div className="w-full flex items-center justify-between gap-2 sm:gap-4">
        <p className="text-sm sm:text-lg font-semibold">
          ${Math.trunc(item.Price - (item.Price * item.Discount) / 100)}
        </p>
        <div className={item.Discount ? "flex items-center gap-1 sm:gap-2" : "hidden"}>
          <p className="text-xs sm:text-sm font-light line-through">
            ${item.Price}
          </p>
          <p className="rounded-md bg-green-200 px-1 sm:px-2 text-xs">
            -{item.Discount}%
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
    </NavLink>
  );
};




export default Card;