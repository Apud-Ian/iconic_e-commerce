import apiClient from "./config.js";
 
export const getAllProductByCategoria = async (category) => { 
  try {
    const response = await apiClient.get(`/products/category/${category}`);
    return response;  
  } catch (error) {
    console.error('Error al obtener los productos de la categoría:', error.message);
    throw error;
  }
};

export const getAllProducts = async ()=>{
    try{

        const response = await apiClient.get('/products', {});
          const Data = response.filter((item) => item.category !== "electronics");
          return Data; 
        } catch (error) {
            console.error('Error al obtener las categorías:', error.message);
            throw error;
          }
}

export const getProductById = async (id)=>{
  try{
    const response = await apiClient.get(`/products/${id}`,{})
return response

  }catch (error){
    console.error('Error al obtener las categorías:', error.message);
    throw error;
  }
}