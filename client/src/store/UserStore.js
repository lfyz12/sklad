import { makeAutoObservable } from "mobx";
import UserService from "../service/UserService";

export default class UserStore {
    _user = null; // Информация о пользователе
    _isAuth = false; // Авторизован ли пользователь
    _error = null; // Ошибка
    _isLoading = false; // Состояние загрузки
    _users = [];

    constructor() {
        makeAutoObservable(this);
    }

    // Сеттеры и геттеры
    setUser(user) {
        this._user = user;
    }

    setUsers(users) {
        this._users = users;
    }

    setAuth(isAuth) {
        this._isAuth = isAuth;
    }

    setError(error) {
        this._error = error;
    }

    setLoading(isLoading) {
        this._isLoading = isLoading;
    }

    get user() {
        return this._user;
    }

    get users() {
        return this._users;
    }

    get isAuth() {
        return this._isAuth;
    }

    get error() {
        return this._error;
    }

    get isLoading() {
        return this._isLoading;
    }

    // Методы
    async register(fullname, email, password, isAdmin) {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await UserService.registration(fullname, email, password, isAdmin);
        } catch (error) {
            this.setError('Не верный логин или пароль');
            throw error
        } finally {
            this.setLoading(false);
        }
    }

    async login(email, password) {
        this.setLoading(true);
        this.setError(null);
        try {
            const response = await UserService.login(email, password);
            localStorage.setItem('accessToken', response.data.tokens.accessToken);
            this.setUser(response.data.user);
            this.setAuth(true);
        } catch (error) {
            this.setError('Не верный логин или пароль');
            throw error
        } finally {
            this.setLoading(false);
        }
    }

    logout() {
        this.setLoading(true);
        this.setError(null);
        try {
            localStorage.removeItem('accessToken')
            this.setUser(null);
            this.setAuth(false);
        } catch (error) {
            this.setError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    async checkAuth() {
        try {
            const isAuth = localStorage.getItem('accessToken');
            let response;
            if (isAuth) {
                this.setAuth(true)
                response = await UserService.check(isAuth)
                this.setUser(response.data.user)
            }
        } catch (e) {
            this.logout()
            console.log(e.response?.data?.message)
        }
    }

    async getAll(){
        try {
            const {data} = await UserService.getAllusers()
            this.setUsers(data.users)
            return data
        } catch (e) {
            return e
        }
    }


}
