import { useState } from "react";

export const FormSize = (onChange) => {

    const [selectedSizes, setSelectedSizes] = useState([]);

    const handleCheckboxChange = (event) => {
      const { id, checked } = event.target;
  
      setSelectedSizes((prevSizes) =>
        checked ? [...prevSizes, id] : prevSizes.filter((size) => size !== id)
      );
      
      onChange && onChange(checked ? [...selectedSizes, id] : selectedSizes.filter((size) => size !== id));
    };
    return(
        <div className=" flex flex-initial flex-col">
              <h4>tallas:</h4>
              <div className="flex flex-row justify-between m-1">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
            <label key={size} className="flex items-center gap-2">
                <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-500"
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onChange={handleCheckboxChange}
                    />
                <span className="block text-gray-700 font-medium mb-1text-gray-700" htmlFor={size}>{size}</span>
            </label>
            ))}
        </div>
   </div>
    );
} 