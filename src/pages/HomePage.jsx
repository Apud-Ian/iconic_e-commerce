import { useEffect, useState } from "react";

import { getByCat } from "../api/product.js";
import ProductCarousel from "../components/Carrusel.jsx";
import Banner from "../components/Banner.jsx";

const HomePage = () => {
  const [newProduct, setNewProduct] = useState([]);
  const [productDiscounts, setProductDiscounts] = useState([]);

  // Función para obtener los productos
  const fetchDataProduct = async () => {
    try {
      const newArrivals = await getByCat("nuevos arribos", 1);
      const discounts = await getByCat("Liquidación", 1);
      setNewProduct(newArrivals.data || []);
      setProductDiscounts(discounts.data || []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);

  return (
    <div className="w-screen overflow-x-hidden bg-white">

      {/* Imagen de fondo */}
      <Banner />

      {/* Nuevos arribos */}
      <div className="md:p-8 p-1  w-full flex flex-col items-center">
        <h3 className="text-2xl border-b-2 border-[#D4AF37] font-light mb-4">
          Nuevos arribos
        </h3>
        <div className="w-full">
          <ProductCarousel products={newProduct} limit={4}/>
        </div>
      </div>

      {/* Liquidación */}
      <div className="md:p-8 p-1 w-full flex flex-col items-center">
        <h3 className="text-2xl border-b-2 border-[#D4AF37] font-light mb-4">Liquidación</h3>
        <div className="w-full">
          <ProductCarousel products={productDiscounts} limit={4}/>
        </div>
      </div>
    </div>
  );
}; 

export default HomePage;
