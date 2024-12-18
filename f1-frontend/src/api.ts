import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8088',
});

// Attach JWT Token to each request if available
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
