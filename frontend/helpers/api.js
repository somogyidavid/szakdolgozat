import axios from 'axios';

const axiosOptions = {
    baseURL: 'http://192.168.6.101:3000',
    headers: {
        'Content-Type': 'application/json',
    }
};

const api = axios.create(axiosOptions);

export default api;
