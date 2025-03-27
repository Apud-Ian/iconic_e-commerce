import apiClient from "./config";

export const addToCart = async (Id_User, Id_Product, Quantity , size , color) => {
    try {
        console.log('entro en la api',Id_Product,Id_User,Quantity, size , color)
        const { data } = await apiClient.post("/cart/", {
            Id_User,
            Id_Product,
            Quantity,
            size, 
            color,
        });
        console.log(data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};

export const getCartByUser = async (Id_User) => {
    try {
        const  result  = await apiClient.get(`/cart?Id_User=${Id_User}`);
        console.log(result);
        return result ;
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};


export const updateCartItem = async (Id_User, Id_Product, Quantity) => {
    try {
        const { data } = await apiClient.put("/cart", {
            Id_User,
            Id_Product,
            Quantity
        });
        console.log(data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};

export const removeFromCart = async (Id_User, Id_Product, Color, Size) => {
    console.log('Enviando petición para eliminar:', Id_Product, Id_User, Color, Size);
    try {
        const { data } = await apiClient.delete("/cart", {
            data: { Id_User, Id_Product, Color, Size } // ✅ Ahora envía todo en el body
        });
        console.log(data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
    }
};