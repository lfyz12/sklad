const {DocumentDetails, Agent, Document, Product} = require('../models/models');
const ApiError = require("../Error/ApiError");

class AgentController {
    async create(req, res) {
        try {
            const {Name, Type} = req.body;

            const agent = await Agent.create({
                Name,
                Type
            });

            return res.json(agent);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при создании товар' });
        }
    }

    async getAllAgents(req, res, next) {
        try {
            return res.json(await Agent.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAgent(req, res) {
        try {
            const { Id } = req.body;
            const agent = await Agent.findOne({ where: { Id } });

            if (!agent) {
                return res.status(404).json({ message: 'товар не найден' });
            }

            return res.json(agent);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении данных товара' });
        }
    }

    // Обновление информации о соискателе
    async update(req, res, next) {
        try {
            const { Id, Name, Type } = req.body;

            const updated = await Agent.update(
                {
                    Name,
                    Type,
                    UpdateDate: Date.now()
                },
                { where: { Id: Id } }
            );

            return res.json(updated);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при обновлении данных товара' });
        }
    }

    // Удаление соискателя по userId
    async delete(req, res) {
        try {
            const {Id} = req.body
            const deleted = await Agent.destroy({ where: { Id: Id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Товар не найден' });
            }

            return res.json({ message: 'Товар удалён' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при удалении товара' });
        }
    }

    async getAgentReportSummary(req, res) {
        try {
            const agents = await Agent.findAll({
                include: [{
                    model: Document,
                    include: [DocumentDetails]
                }]
            });

            const result = agents.map(agent => {
                let incomeQuantity = 0, incomeCost = 0;
                let outcomeQuantity = 0, outcomeCost = 0;

                agent.Documents.forEach(doc => {
                    doc.DocumentDetails.forEach(detail => {
                        if (doc.Type === 'income') {
                            incomeQuantity += detail.Quantity;
                            incomeCost += parseFloat(detail.Cost);
                        } else if (doc.Type === 'outcome') {
                            outcomeQuantity += detail.Quantity;
                            outcomeCost += parseFloat(detail.Cost);
                        }
                    });
                });

                return {
                    AgentId: agent.Id,
                    Name: agent.Name,
                    IncomeQuantity: incomeQuantity,
                    IncomeCost: incomeCost.toFixed(2),
                    OutcomeQuantity: outcomeQuantity,
                    OutcomeCost: outcomeCost.toFixed(2)
                };
            });

            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении отчёта по агентам' });
        }
    }
    async getAgentProductReport(req, res) {
        try {
            const agentId = req.params.id;

            const documents = await Document.findAll({
                where: { AgentId: agentId },
                include: [{
                    model: DocumentDetails,
                    include: [Product]
                }]
            });

            const productMap = {};

            for (const doc of documents) {
                const isIncome = doc.Type === 'income';

                for (const detail of doc.DocumentDetails) {
                    const product = detail.Product;
                    const key = product.Id;

                    if (!productMap[key]) {
                        productMap[key] = {
                            ProductId: product.Id,
                            Name: product.Name,
                            IncomeQuantity: 0,
                            IncomeCost: 0,
                            OutcomeQuantity: 0,
                            OutcomeCost: 0
                        };
                    }

                    if (isIncome) {
                        productMap[key].IncomeQuantity += detail.Quantity;
                        productMap[key].IncomeCost += parseFloat(detail.Cost);
                    } else {
                        productMap[key].OutcomeQuantity += detail.Quantity;
                        productMap[key].OutcomeCost += parseFloat(detail.Cost);
                    }
                }
            }

            return res.json(Object.values(productMap));
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении отчета по товарам агента' });
        }
    }

}

module.exports = new AgentController();