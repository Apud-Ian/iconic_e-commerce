import { useState } from "react";

 const FormImg = ( onImagesUpdate ) => {
  const [images, setImages] = useState([]); // Lista de imágenes con archivos
  const [colors, setColors] = useState({}); // Objeto que asocia imágenes con colores

  // Manejar la carga de imágenes
  const handleImagesChange = (event) => {
    const imageArray = Array.from(event.target.files).map((file) => ({
      file, // Guardamos el archivo real para enviarlo luego
      previewUrl: URL.createObjectURL(file), // Para previsualizar la imagen
    }));

    const updatedImages = [...images, ...imageArray];
    setImages(updatedImages);
    onImagesUpdate(updatedImages, colors); // Notificar al padre
  };

  // Manejar la selección de colores
  const handleColorSelect = (imgIndex, color) => {
    const updatedColors = { ...colors, [imgIndex]: color };
    setColors(updatedColors);
    onImagesUpdate(images, updatedColors); // Notificar al padre
  };

  return (
    <div>
      {/* Input de imágenes */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Imagen</label>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded-lg cursor-pointer"
          onChange={handleImagesChange}
          accept="image/png, image/jpeg, image/webp"
          multiple
        />
      </div>

      <div className="flex flex-col ">
        {images.map((img, index) => (
          <div key={img.file.name} className="m-1border border-gray-300 rounded-lg">
            <img src={img.previewUrl} alt="Preview" className="w-[100px] basis-2/3  h-auto" />

            {/* Selector de colores */}
            <div className="flex flex-col basis-1/3 m-1">
              {["red", "blue", "yellow", "green", "orange", "purple", "white", "black", "brown", "gray", "pink"].map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full cursor-pointer border ${
                    colors[index] === color ? "ring-2 ring-black" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(index, color)}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormImg;