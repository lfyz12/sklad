import { $authHost } from "../http";

const ProductService = {
    // Создание товара
    async create(Name, Quantity, Price, Description) {
        return await $authHost.post('/api/product/create', { Name, Quantity, Price, Description });
    },

    // Получение всех товаров
    async getAll() {
        return await $authHost.get('/api/product/getAll');
    },

    // Получение одного товара по Id
    async getById(Id) {
        return await $authHost.get(`/api/product/getOne/${Id}`);
    },

    // Обновление информации о товаре
    async update(Id, Name, Price, Quantity, Description) {
        return await $authHost.post('/api/product/update', { Id, Name, Price, Quantity, Description });
    },

    // Удаление товара
    async delete(Id) {
        return await $authHost.post('/api/product/delete', { Id });
    },

    // Получение отчёта по товарам (вход/выход)
    async getProductReportSummary() {
        return await $authHost.get('/api/product/getReport');
    },

    // Получение отчёта по товарам с группировкой по агентам
    async getProductAgentReport(productId) {
        return await $authHost.post(`/api/product/getAgentReport`, {productId});
    }
}

export default ProductService;
