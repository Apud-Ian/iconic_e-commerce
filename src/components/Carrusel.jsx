import { useState, useEffect } from "react";
import Card from "./Card";


const ProductCarousel = ({ products, limit }) => {
  const [leftLimit, setLeftLimit] = useState(0);
  const [visibleLimit, setVisibleLimit] = useState(limit); // Estado dinámico para el límite visible
  const maxLimit = products.length;

  useEffect(() => {
    const handleResize = () => {
      // Si el ancho de la pantalla es menor a 600px, cambiar el límite visible a 2
      if (window.innerWidth <= 600) {
        setVisibleLimit(2);
      } else {
        setVisibleLimit(limit); // Mantener el límite pasado por prop en pantallas más grandes
      }
    };

    handleResize(); // Establecer el valor inicial
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [limit]); // Se vuelve a ejecutar cuando cambia el prop `limit`

  const handleLeft = () => {
    setLeftLimit((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleRight = () => {
    setLeftLimit((prev) => (prev + visibleLimit < maxLimit ? prev + 1 : prev));
  };


  return (
<div className="relative w-full flex items-center justify-center lg:px-4">
  {/* Botón Izquierdo */}
  <button 
    onClick={handleLeft} 
    className="absolute left-0 px-4 py-2 bg-gray-50 rounded z-10"
  >
    ⬅️
  </button>

  {/* Carrusel */}
  <div className="flex justify-center w-full">
    {products.slice(leftLimit, leftLimit + visibleLimit).map((item, index) => (
      <Card item={item} key={index} />
    ))}
  </div>

  {/* Botón Derecho */}
  <button 
    onClick={handleRight} 
    className="absolute right-0 px-4 py-2 bg-gray-50 rounded z-10"
  >
    ➡️
  </button>
</div>
  );
};

export default ProductCarousel;
