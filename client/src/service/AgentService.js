import { $authHost } from "../http";

const AgentService = {
    // Создание агента
    async create(Name, Type) {
        return await $authHost.post('/api/agent/create', { Name, Type });
    },

    // Получение всех агентов
    async getAll() {
        return await $authHost.get('/api/agent/getAll');
    },

    // Получение одного агента по Id
    async getById(Id) {
        return await $authHost.post(`/api/agent/getOne`, {Id});
    },

    // Обновление информации об агенте
    async update(Id, Name, Type) {
        return await $authHost.put('/api/agent/update', { Id, Name, Type });
    },

    // Удаление агента
    async delete(Id) {
        return await $authHost.post('/api/agent/delete', { Id });
    },

    // Получение отчета по агентам
    async getAgentReportSummary() {
        return await $authHost.get('/api/agent/getReport');
    },

    // Получение отчета по товарам конкретного агента
    async getAgentProductReport(agentId) {
        return await $authHost.get(`/api/agent/getProductReport/${agentId}`);
    }
};

export default AgentService;
