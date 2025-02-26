import { useState } from "react";

const FormSize = ({ onChange }) => { // ← Debes destructurar correctamente `onChange`
  const [selectedSizes, setSelectedSizes] = useState([]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;

    const updatedSizes = checked
      ? [...selectedSizes, id]
      : selectedSizes.filter((size) => size !== id);

    setSelectedSizes(updatedSizes);
    onChange && onChange(updatedSizes); // Notifica al padre sobre los cambios
  };

  return (
    <div className="flex flex-col">
      <h4>Tallas:</h4>
      <div className="flex gap-2">
        {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
          <label key={size} className="flex items-center gap-1">
            <input
              type="checkbox"
              className="w-4 h-4 accent-blue-500"
              id={size}
              checked={selectedSizes.includes(size)}
              onChange={handleCheckboxChange}
            />
            <span className="text-gray-700 font-medium">{size}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FormSize;
