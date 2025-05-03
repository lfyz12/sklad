import { makeAutoObservable } from "mobx";
import AgentService from "../service/AgentService";

export default class AgentStore {
    _agents = [];
    _selectedAgent = null;
    _report = [];
    _productReport = [];
    _error = null;
    _isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    // Сеттеры
    setAgents(agents) {
        this._agents = agents;
    }

    setSelectedAgent(agent) {
        this._selectedAgent = agent;
    }

    setReport(report) {
        this._report = report;
    }

    setProductReport(report) {
        this._productReport = report;
    }

    setError(error) {
        this._error = error;
    }

    setLoading(isLoading) {
        this._isLoading = isLoading;
    }

    // Геттеры
    get agents() {
        return this._agents;
    }

    get selectedAgent() {
        return this._selectedAgent;
    }

    get report() {
        return this._report;
    }

    get productReport() {
        return this._productReport;
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
            const { data } = await AgentService.getAll();
            this.setAgents(data);
        } catch (e) {
            this.setError("Ошибка при получении агентов");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchById(id) {
        this.setLoading(true);
        try {
            const { data } = await AgentService.getById(id);
            this.setSelectedAgent(data);
            return data
        } catch (e) {
            this.setError("Ошибка при получении агента");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async createAgent({ Name, Type }) {
        this.setLoading(true);
        try {
            const { data } = await AgentService.create(Name, Type);
            await this.fetchAll();
            return data;
        } catch (e) {
            this.setError("Ошибка при создании агента");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async updateAgent({ Id, Name, Type }) {
        this.setLoading(true);
        try {
            const { data } = await AgentService.update(Id, Name, Type);
            await this.fetchAll();
            return data;
        } catch (e) {
            this.setError("Ошибка при обновлении агента");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async deleteAgent(Id) {
        this.setLoading(true);
        try {
            await AgentService.delete(Id);
            await this.fetchAll();
        } catch (e) {
            this.setError("Ошибка при удалении агента");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchReport() {
        this.setLoading(true);
        try {
            const { data } = await AgentService.getAgentReportSummary();
            this.setReport(data);
        } catch (e) {
            this.setError("Ошибка при получении отчета по агентам");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchProductReport(agentId) {
        this.setLoading(true);
        try {
            const { data } = await AgentService.getAgentProductReport(agentId);
            this.setProductReport(data);
        } catch (e) {
            this.setError("Ошибка при получении отчета по товарам агента");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }
}
