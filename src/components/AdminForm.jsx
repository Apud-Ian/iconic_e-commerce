import FormImg from "./FormImg";
import { useState } from "react";
import { FormSize } from "./FormSize";

const AdminForm =()=>{

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    images: [],
    colors: {},
  });

  const handleImagesUpdate = (images, colors) => {
    setFormData((prev) => ({
      ...prev,
      images,
      colors,
    }));
  };
  return(
        <div className="w-2/3 bg-white p-6 shadow-lg rounded-lg">
            <form className="grid h-56 grid-cols-2 content-start gap-4">
            <FormSize/>
            <FormImg onImagesUpdate={handleImagesUpdate} />
            <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >a
            Enviar
          </button>
            </form >
            
        </div>          
  );
};

export default AdminForm;