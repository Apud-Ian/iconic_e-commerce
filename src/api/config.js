import axios from 'axios'

const apiClient = axios.create({
baseURL: 'http://localhost:3000',
timeout:10000,
headers: {
    'Content-Type': 'application/json', 
  },
})
apiClient.interceptors.response.use(
    (response) => {
      // Procesa la respuesta antes de enviarla al código que la llamó
      return response.data;
    },
    (error) => {
      // Maneja los errores de manera uniforme
      console.error('Error en la API:', error.response || error.message);
      return Promise.reject(error);
    }
  );

  export default apiClient;