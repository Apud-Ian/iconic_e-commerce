import { useState } from "react";

const FormImg = ({ onImagesUpdate }) => {
  const [images, setImages] = useState([]); // Lista de imágenes con archivos
  const [colors, setColors] = useState({}); // Objeto que asocia imágenes con colores

  const colorsList = [
    { id: 1, name: "Rojo", col: "red-600" },
    { id: 2, name: "Azul", col: "blue-600" },
    { id: 3, name: "Amarillo", col: "yellow-600" },
    { id: 4, name: "Verde", col: "green-600" },
    { id: 5, name: "Naranja", col: "orange-600" },
    { id: 6, name: "Violeta", col: "purple-600" },
    { id: 7, name: "Blanco", col: "white" },
    { id: 8, name: "Negro", col: "black" },
    { id: 9, name: "Marrón", col: "brown-600" },
    { id: 10, name: "Gris", col: "gray-600" },
    { id: 11, name: "Rosa", col: "pink-600" }
  ];

  const handleImagesChange = (event) => {
    const imageArray = Array.from(event.target.files).map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...imageArray];
    setImages(updatedImages);
    onImagesUpdate(updatedImages, colors);
  };

  const handleColorSelect = (imgIndex, color) => {
    const updatedColors = { color: Object.values({ ...colors, [imgIndex]: color }).map(String) };
    setColors(updatedColors);
    onImagesUpdate(images, updatedColors);
    console.log(images);
};

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      <div className="image-preview overflow-x-hidden overflow-y-scroll w-full flex-col-reverse h-64">
        {images.map((img, index) => (
          <div className="grid p-1 m-3 grid-cols-2 gap-2" key={index}>
            <img className="m-2" src={img.previewUrl} alt={`Preview ${index}`} width={200} />
            <div className="lg:grid lg:grid-cols-3">
              {colorsList.map((color) => (
                <div key={color.id} className="flex items-center space-x-2">
                  <input
                    id={`color-${index}-${color.id}`} // ID único por imagen
                    name={`color-${index}`} // Grupo único de radio por imagen
                    value={color.id}
                    type="radio"
                    className={`form-radio text-${color.col}`}
                    onChange={() => handleColorSelect(index, color.id)}
                  />
                  <label htmlFor={`color-${index}-${color.id}`} className="text-gray-700">
                    {color.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormImg;
