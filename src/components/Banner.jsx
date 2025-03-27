import { useState, useEffect } from "react";
import ICONIC from "../assets/ICONIC.png";



const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = [ICONIC, ICONIC, ICONIC];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambio cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full lg:h-[600px] h-96 overflow-hidden rounded-lg shadow-lg">
      <div className="banner-container">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Banner"
            className={`banner-image ${index === currentIndex ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
