import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.mercadobitcoin.net/api/',
});

export default api;