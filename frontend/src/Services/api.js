import axios from 'axios';
const API_BASE_URL = 'http://localhost:3000/api';

const apiClient= axios.create({
    baseURL: API_BASE_URL, 
});

// Interceptor to add Authorization header
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;