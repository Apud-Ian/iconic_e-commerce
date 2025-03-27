import apiClient from "./config"

export const CreateUser = async (userData) =>{
    try{
    const response = await apiClient.post("/User", userData,{
        headers: { "Content-Type": "application/json" },
    })
    return response
}catch(error){
    console.error("Error al crear el usuario:", error.message);
    throw error;
}
}

export const loginUser = async (userData) => {
    try {
        console.log('Intentando iniciar sesión...', userData);
        const response = await apiClient.post("/user/login", userData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data; // Devuelve solo los datos, no la respuesta completa
    } catch (error) {
        console.error("Error al ingresar el usuario:", error.message);
        throw error;
    }
};

export const getUser = async () => {
    try {
        const response = await apiClient.get("/user/auth");
        return response; 
    } catch (error) {
        console.error("Usuario no autenticado:", error.message);
        return null;
    }
};

export const getOutUser = async () =>{
    try{
        const response = await apiClient.post("/user/logout");
        return response;
    } catch (error) {
        console.error("sesion no eliminado:", error.message);
        return null;
    }
}