import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (!error.response) {
            console.error('Network error or no response:', error);
        } else {
            const status = error.response.status;
            if (status === 400) {
                console.error('Bad Request:', error.response.data);
            } else {
                console.error('API Error:', error.response.data);
            }
        }
        return Promise.reject(error);
    }
);



export default api;
