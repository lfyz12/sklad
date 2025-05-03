import { $authHost } from "../http";

const DocumentService = {
    // Получить список всех документов
    async getAll() {
        return await $authHost.get('/api/document/getAll');
    },

    // Получить один документ по id с деталями
    async getOne(id) {
        return await $authHost.get(`/api/document/getOne/${id}`);
    },

    // Создание нового документа с товарами
    async create( AgentId, Type, items ) {
        return await $authHost.post('/api/document/create', {
            AgentId,
            Type,
            items
        });
    },

    // Подписать документ (активировать)
    async activate(id) {
        return await $authHost.post('/api/document/activate', { id });
    },

    // Удаление документа
    async delete(id) {
        return await $authHost.post(`/api/document/delete`, {id});
    }
};

export default DocumentService;
