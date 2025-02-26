
import apiClient from "./config.js";
 
export const getByCat = async (category) => { 
  try {
    const url = `/product/category?Name_Category=${category}&Page=1&Limit=1`;
    console.log(`📡 Llamando a la API con: ${url}`); // Debug URL

    const response = await apiClient.get(url);
    return response; 
  } catch (error) {
    console.error('Error al obtener los productos de la categoría:', error.message);
  throw error;
  }
};

export const getProductById = async (id)=>{
  try{
    const response = await apiClient.get(`/product/${id}`,{})
return response;

  }catch (error){
    console.error('Error al obtener las categorías:', error.message);
    throw error;
  }
}

export const createProduct = async (productData) => {
  try {
    console.log('entro en la peticion',productData)
    const response = await apiClient.post("/product", productData, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    throw error;
  }
};
export const addImg = async (formData) => {
  try {
    const response = await apiClient.post("/product/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("Respuesta del backend (debe contener imágenes):", response);
    return response;  // ✅ Devuelve la respuesta para que `uploadImages()` la procese

  } catch (error) {
    console.error("Error al subir imágenes:", error.response?.data || error.message);
    return { success: false, images: [] };
  }
};
