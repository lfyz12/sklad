import {$authHost, $host} from "../http";

const UserService = {
    // Регистрация нового пользователя
    async registration(Fullname, Email, Password, IsAdmin) {
        return $authHost.post('/api/user/reg', {Fullname, Email, Password, IsAdmin})
    },

    // Авторизация пользователя (по телефону и паролю)
    async login(email, password) {
        return $authHost.post('/api/user/login', {email, password})
    },

    async check(token) {
        return $authHost.post('/api/user/check', {token})
    },

    // Получение списка всех пользователей (только для админов)
    async getAllusers() {
        return $authHost.get('/api/user/users')
    },
}

export default UserService;