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

      <div className="flex overflow-y-scroll max-h-24 flex-col ">
        {images.map((img, index) => (
          <div key={img.file.name} className="m-1 border flex items-center justify-between gap-2 p-2 border-gray-300 rounded-lg">
            <div className="m-2 w-1/8"> 
            <img src={img.previewUrl} alt="Preview" className="w-[50px] h-auto" />
            </div>
            <div className="flex w-7/8 flex-row justify-between m-1">
              {["red", "blue", "yellow", "green", "orange", "purple", "white", "black", "brown", "gray", "pink"].map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-sm cursor-pointer border ${
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