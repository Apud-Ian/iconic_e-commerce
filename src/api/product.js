
import apiClient from "./config.js";
 
export const getByCat = async (category) => { 
  try {
    const url = `/product/category?Name_Category=${category}&Page=1&Limit=12`;
    console.log(`📡 Llamando a la API con: ${url}`); // Debug URL

    const response = await apiClient.get(url);
    return response; 
  } catch (error) {
    console.error('Error al obtener los productos de la categoría:', error.message);
  throw error;
  }
};

export const getProductByName = async (Name_Product)=>{
  try{
    console.log('nombre del producto url',Name_Product)
    const response = await apiClient.get(`/product?Name_Product=${Name_Product}`)
    console.log('paso el response')
    console.log('deveria ser la respuesta de la api', response)
return response;

  }catch (error){
    console.error('Error al obtener los productos:', error.message);
    throw error;
  }
}

export const deleteProductByName  = async (Name_Product)=>{
  try{
    console.log('entro en la api para borrar');
    const response = await apiClient.delete(`/product?Name_Product=${Name_Product}`)
    return response;
  }catch(error){
    console.error('Error al borrar los productos:', error.message);
    throw error;
  }
}

export const createProduct = async (productData) => {
  try {
    console.log('api peticion')
    const response = await apiClient.post("/product", productData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log('api peticion',response);
    return response;
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    throw error;
  }
};
export const updateProduct = async (productData) =>{
  try {
    console.log('entro a actualizar el producto', productData)
    const response = await apiClient.put('/product', productData, {
      headers : {"Content-Type" : "application/json"},
    })
    console.log(response)
    return response
  }catch(error){
    console.error('Error al actualizar el producto', error.message)
  }
}
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
