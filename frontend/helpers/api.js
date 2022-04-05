import axios from 'axios';

const axiosOptions = {
    baseURL: 'http://192.168.31.160:3000',
    headers: {
        'Content-Type': 'application/json',
    }
};

const api = axios.create(axiosOptions);

export default api;
