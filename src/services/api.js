import axios from 'axios';

const apiClient = axios.create({
  // In a real application, you would set your API's base URL here
  baseURL: 'https://api.example.com/v1', 
  headers: {
    'Content-Type': 'application/json',
  },
});

// You can also add interceptors for handling tokens or errors globally
apiClient.interceptors.request.use(config => {
  // e.g., get token from store and add to headers
  // const token = useAuthStore.getState().token;
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle errors globally
    console.error('API call error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
