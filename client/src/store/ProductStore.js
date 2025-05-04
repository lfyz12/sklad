import { makeAutoObservable } from "mobx";
import ProductService from "../service/ProductService";

export default class ProductStore {
    _products = [];
    _selectedProduct = null;
    _report = [];
    _agentReport = [];
    _error = null;
    _isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Сеттеры
    setProducts(products) {
        this._products = products;
    }

    setSelectedProduct(product) {
        this._selectedProduct = product;
    }

    setReport(report) {
        this._report = report;
    }

    setAgentReport(report) {
        this._agentReport = report;
    }

    setError(error) {
        this._error = error;
    }

    setLoading(isLoading) {
        this._isLoading = isLoading;
    }

    // Геттеры
    get products() {
        return this._products;
    }

    get selectedProduct() {
        return this._selectedProduct;
    }

    get report() {
        return this._report;
    }

    get agentReport() {
        return this._agentReport;
    }

    get error() {
        return this._error;
    }

    get isLoading() {
        return this._isLoading;
    }

    // Методы
    async fetchAll() {
        this.setLoading(true);
        try {
            const { data } = await ProductService.getAll();
            this.setProducts(data);
        } catch (e) {
            this.setError("Ошибка при получении товаров");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchById(id) {
        this.setLoading(true);
        try {
            const { data } = await ProductService.getById(id);
            this.setSelectedProduct(data);
        } catch (e) {
            this.setError("Ошибка при получении товара");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async createProduct({ Name, Quantity, Price, Description }) {
        this.setLoading(true);
        try {
            const { data } = await ProductService.create(Name, Quantity, Price, Description);
            this.fetchAll(); // обновим список
            return data;
        } catch (e) {
            this.setError("Ошибка при создании товара");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async updateProduct({ Id, Name, Price, Quantity, Description }) {
        this.setLoading(true);
        try {
            const { data } = await ProductService.update(Id, Name, Price, Quantity, Description);
            this.fetchAll();
            return data;
        } catch (e) {
            this.setError("Ошибка при обновлении товара");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async deleteProduct(Id) {
        this.setLoading(true);
        try {
            await ProductService.delete(Id);
            this.fetchAll();
        } catch (e) {
            this.setError("Ошибка при удалении товара");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchReport() {
        this.setLoading(true);
        try {
            const { data } = await ProductService.getProductReportSummary();
            this.setReport(data);
        } catch (e) {
            this.setError("Ошибка при получении отчёта");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchAgentReport(productId) {
        this.setLoading(true);
        try {
            const { data } = await ProductService.getProductAgentReport(productId);
            this.setAgentReport(data);
        } catch (e) {
            this.setError("Ошибка при получении отчёта по агентам");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }
}
