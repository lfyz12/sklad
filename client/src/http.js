import axios from "axios";

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true // Для работы с cookie
});

// Добавляем токен в заголовки авторизованных запросов
$authHost.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});



export {
    $host, $authHost
};