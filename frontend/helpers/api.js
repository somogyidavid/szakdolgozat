import axios from 'axios';

const axiosOptions = {
    baseURL: 'http://192.168.0.192:3000',
    headers: {
        'Content-Type': 'application/json',
    }
};

const api = axios.create(axiosOptions);

export default api;
