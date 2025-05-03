import { makeAutoObservable } from "mobx";
import DocumentService from "../service/DocumentService";

export default class DocumentStore {
    _documents = [];
    _selectedDocument = null;
    _isLoading = false;
    _error = null;

    constructor() {
        makeAutoObservable(this);
    }

    // Сеттеры
    setDocuments(documents) {
        this._documents = documents;
    }

    setSelectedDocument(document) {
        this._selectedDocument = document;
    }

    setLoading(isLoading) {
        this._isLoading = isLoading;
    }

    setError(error) {
        this._error = error;
    }

    // Геттеры
    get documents() {
        return this._documents;
    }

    get selectedDocument() {
        return this._selectedDocument;
    }

    get isLoading() {
        return this._isLoading;
    }

    get error() {
        return this._error;
    }

    // Методы
    async fetchAll() {
        this.setLoading(true);
        this.setError(null);
        try {
            const { data } = await DocumentService.getAll();
            this.setDocuments(data);
        } catch (e) {
            this.setError("Ошибка при получении документов");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async fetchOne(id) {
        this.setLoading(true);
        this.setError(null);
        try {
            const { data } = await DocumentService.getOne(id);
            this.setSelectedDocument(data);
        } catch (e) {
            this.setError("Ошибка при получении документа");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async create(agentId, type, items) {
        this.setLoading(true);
        this.setError(null);
        try {
            const { data } = await DocumentService.create(agentId, type, items);
            await this.fetchAll();
            return data;
        } catch (e) {
            this.setError("Ошибка при создании документа");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async activateDocument(id) {
        this.setLoading(true);
        this.setError(null);
        try {
            const { data } = await DocumentService.activate(id);
            await this.fetchAll();
            return data;
        } catch (e) {
            this.setError("Ошибка при активации документа");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }

    async deleteDocument(id) {
        this.setLoading(true);
        this.setError(null);
        try {
            await DocumentService.delete(id);
            await this.fetchAll();
        } catch (e) {
            this.setError("Ошибка при удалении документа");
            console.error(e);
        } finally {
            this.setLoading(false);
        }
    }
}
