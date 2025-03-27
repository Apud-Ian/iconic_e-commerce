import { useEffect, useState } from "react";
import { addImg, createProduct } from "../api/product.js";
import { getAllCat } from "../api/category.js";
import FormImg from "./FormImg.jsx";
import FormSize from "./FormSize.jsx";

const AdminForm = () => {
   const [categoriesData, setCategoriesData] = useState([]);
   const [name, setName ] = useState("");
   const [description, setDescription] = useState("");
   const [category, setCategory] = useState([]);
   const [price, setPrice] = useState(0);
   const [discount, setDiscount] = useState(0);
   const [image, setImage] = useState({ imgdata: [], color: [] });
   const [selectedSizes, setSelectedSizes] = useState([]);
   const [indeximg , setindeximg] = useState(0);
   const [width , setwidth] = useState(0);
   const [height , setheight] = useState(0);
   let Onesize = false;


   
   const handleSizeChange = (sizes) => {
     setSelectedSizes(sizes);
   };
 
   useEffect(() => {
      const fetchData = async () => {
         try {
            setCategoriesData(await getAllCat(0, 0));
         } catch (error) {
            console.error(error.message);
         }
      };

      fetchData();
   }, []);

   const handleImagesUpdate = (imgData, colors) => {
      setImage({ imgdata: imgData, color: colors });
   };

   const handleAddCat = (Id_Category) => {
      setCategory((prevCategories) =>
         prevCategories.includes(Id_Category)
            ? prevCategories.filter((id) => id !== Id_Category)
            : [...prevCategories, Id_Category]
      );
   };

   const uploadImages = async () => {
    const formData = new FormData();
  
    image.imgdata.forEach((img) => {
      formData.append("images", img.file);
    });
  
    try {
      const response = await addImg(formData);
      console.log("Respuesta del backend en uploadImages:", response); // 👀 Verifica lo que devuelve `apiClient`
  
      if (!response || !response.success || !Array.isArray(response.images)) {
        console.error("Error en la respuesta del servidor.");
        return [];
      }
  
      return response.images; // ✅ Aquí aseguramos que devolvemos las URLs correctas
    } catch (error) {
      console.error("Error en uploadImages:", error);
      return [];
    }
  };
  const handleAddProduct = async () => {
    if (width > 0 && height > 0) {
      Onesize = true;
    } else {
      Onesize = false;
    }
  
    if (name && description && category.length > 0 && price > 0 && discount >= 0 && image.imgdata.length > 0) {
      try {
        // ✅ Subir imágenes primero
        const imageUrls = await uploadImages();
        console.log(imageUrls)
        if (imageUrls.length === 0) {
          console.error("No se pudieron subir las imágenes");
          return;
        }
        const Name_Product = name.trim();
        // ✅ Crear el producto con los datos JSON
        const newProduct = {
          Id_Category: category,
          Name_Product: Name_Product,
          Description_Product: description,
          Price: price,
          Discount: discount,
          Id_Color: image.color,
          Size: selectedSizes,
          Onesize: Onesize,
          Width: width,
          Height: height,
          image: imageUrls, // ✅ Usamos las URLs en lugar de los archivos
        };
        console.log('crear producto', 14)
        const result = await createProduct(newProduct);
        console.log(result)
        if(result.success){
          window.location.reload();
        }
        if(!result.success){
          alert(result.message)
        }
        return result;
      } catch (error) {
        console.error("Error al crear producto:", error);
      }
    } else {
      console.error("Faltan datos obligatorios");
    }
  };
   return (
    <div className="m-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 xl:gap-16">
    <div className="bg-white p-8 shadow-lg rounded-xl w-full max-w-3xl mx-auto">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="name" >
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setName(e.target.value)}
              minLength="3" maxLength="50" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="description">
              Descripción:
            </label>
            <input
              type="textarea"
              id="description"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
              minLength="5" maxLength="700" required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="category">
              Categorías:
            </label>
            <ul className="mt-2 space-y-2 overflow-y-auto max-h-32 border rounded-lg p-2">
              {categoriesData.map((cat) => (
                <li className="flex justify-between items-center bg-gray-100 p-3 rounded shadow-sm" key={cat.Id_Category}>
                  <label htmlFor={cat.Name_Category}>{cat.Name_Category}</label>
                  <input
                    type="checkbox"
                    id={cat.Name_Category}
                    onChange={() => handleAddCat(cat.Id_Category)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio:</label>
            <input
              type="number"
              id="price"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setPrice(Number(e.target.value))}
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900">Descuento:</label>
            <input
              type="number"
              id="discount"
              className="mt-1 w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => setDiscount(Number(e.target.value))}
              min={0}
              max={100}
            />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-700">Precio final: {price - (price * discount) / 100}</h3>
        <FormImg onImagesUpdate={handleImagesUpdate} />
        <FormSize onChange={handleSizeChange}/>
        <div>
          <label htmlFor="width">ancho:</label>
          <input type="number" name="width" onChange={(e) => setwidth(Number(e.target.value))} max={256}/>
          <label htmlFor="height">largo:</label>
          <input type="number" name="height" onChange={(e) => setheight(Number(e.target.value))}  max={256}/>
        </div>
        <button
   type="button"
   onClick={handleAddProduct}
   className={`w-full py-2 rounded-lg transition ${
      name && description && category.length > 0 && price > 0 && discount >= 0 && image.imgdata.length > 0 
      ? "bg-blue-500 text-white hover:bg-blue-600" 
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
   }`}
   disabled={!name || !description || category.length === 0 || price <= 0 || discount < 0 || image.imgdata.length === 0}
>
   Crear
</button>
      </form>
    </div>
    <div className="w-full lg:w-3/4 mx-auto p-4 bg-white shadow-lg rounded-xl">
  <div className="flex flex-col items-center">
    <img 
      src={image.imgdata[indeximg]?.previewUrl} 
      alt="Vista previa" 
      className="w-1/2 h-auto lg:w-full object-cover rounded-lg"
    />
  </div>

  {/* Galería de imágenes */}
  <div className="grid grid-cols-4 gap-2 mt-4">
    {image.imgdata?.map((img, index) => (
      <div 
        key={index} 
        onClick={() => setindeximg(index)} 
        className={`p-1 rounded-lg cursor-pointer border-2 ${
          indeximg === index ? "border-blue-500" : "border-transparent"
        }`}
      >
        <img 
          src={img.previewUrl} 
          alt={`Imagen ${index + 1}`} 
          className="w-full h-16 object-cover rounded-md"
        />
      </div>
    ))}
  </div>

  {/* Información del producto */}
  <div className="mt-4 p-4 bg-gray-100 rounded-lg">
    <h3 className="text-xl font-semibold text-gray-700">📌 {name}</h3>
    <p className="text-gray-600 mt-2">{description}</p>
    <p className="text-lg font-bold text-blue-600 mt-2">$ {price}</p>
  </div>
</div>
  </div> );
};

export default AdminForm;
