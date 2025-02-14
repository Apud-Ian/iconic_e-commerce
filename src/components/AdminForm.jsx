import FormImg from "./FormImg";
import { useState } from "react";
import { FormSize } from "./FormSize";
import FormDescription from "./FormDescription";
import FormName from "./FormName";

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
<div className="w-full md:w-2/3 bg-white p-6 shadow-lg rounded-lg">
  <form className="grid grid-cols-1 md:grid-cols-2 content-start gap-4">
    <FormName onChange={onchange} />
    <FormImg onImagesUpdate={handleImagesUpdate} />
    <FormSize />
    <FormDescription onChange={onchange} />
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
    >
      Enviar
    </button>
  </form>
</div>
       
  );
};

export default AdminForm;