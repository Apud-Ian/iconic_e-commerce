import apiClient from "./config";

export const getAllCat = async (page = 0, limit = 0) => {
  try {
    const response = await apiClient.get(`/product/categories?Page=${page}&Limit=${limit}`);

    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error.message);
    throw error;
  }
};

export const createCat = async (Name_category) =>{
    if(!Name_category){
        return 'bad input'
    }
    try{
        const response = await apiClient.post(`/product/category?Name_Category=${Name_category}`)
        return response;
    }catch(error){
        console.error('Error al crear las categorías:', error.message);
        throw error;
    }
}

export const deleteCat = async (Id_Category) => {
    if(!Id_Category){
        return 'bad input'
    }
    try {
        const response = await apiClient.delete(`/product/category/${Id_Category}`);
        return response;
    } catch (error) {
        console.error('Error al borrar las categorías:', error.message);
        throw error;
    }
}