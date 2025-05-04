const { Product, DocumentDetails, Agent, Document} = require('../models/models');
const ApiError = require("../Error/ApiError");

class ProductController {
    async create(req, res) {
        try {
            const {Name, Quantity, Price, Description} = req.body;

            const product = await Product.create({
                Name,
                Quantity,
                Price,
                Description
            });

            return res.json(product);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при создании товар' });
        }
    }

    async getAllProducts(req, res, next) {
        try {
            return res.json(await Product.findAll())
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getProduct(req, res) {
        try {
            const { Id } = req.params;
            const product = await Product.findOne({ where: { Id } });

            if (!product) {
                return res.status(404).json({ message: 'товар не найден' });
            }

            return res.json(product);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении данных товара' });
        }
    }

    // Обновление информации о соискателе
    async update(req, res, next) {
        try {
            const { Id, Name, Price, Quantity Description } = req.body;

            const updated = await Product.update(
                {
                    Name,
                    Price,
                    Quantity,
                    Description,
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
            const deleted = await Product.destroy({ where: { Id: Id } });

            if (!deleted) {
                return res.status(404).json({ message: 'Товар не найден' });
            }

            return res.json({ message: 'Товар удалён' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при удалении товара' });
        }
    }

    async getProductReportSummary(req, res) {
        try {
            const products = await Product.findAll({
                include: [{
                    model: DocumentDetails,
                    include: [{
                        model: Document,
                        attributes: ['Type'], // "INCOME" или "OUTCOME"
                    }]
                }]
            });

            const result = products.map(product => {
                let incomeQuantity = 0, incomeCost = 0;
                let outcomeQuantity = 0, outcomeCost = 0;

                product.DocumentDetails.forEach(detail => {
                    if (detail.Document.Type === 'income') {
                        incomeQuantity += detail.Quantity;
                        incomeCost += parseFloat(detail.Cost);
                    } else if (detail.Document.Type === 'outcome') {
                        outcomeQuantity += detail.Quantity;
                        outcomeCost += parseFloat(detail.Cost);
                    }
                });

                return {
                    ProductId: product.Id,
                    Name: product.Name,
                    IncomeQuantity: incomeQuantity,
                    IncomeCost: incomeCost.toFixed(2),
                    OutcomeQuantity: outcomeQuantity,
                    OutcomeCost: outcomeCost.toFixed(2)
                };
            });

            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при получении отчёта по товарам' });
        }
    }

    async getProductAgentReport(req, res) {
        try {
            const {productId} = req.body;

            const details = await DocumentDetails.findAll({
                where: { ProductId: productId },
                include: [{
                    model: Document,
                    include: [{ model: Agent }]
                }]
            });

            const agentMap = {};

            for (const detail of details) {
                const { Type, Agent } = detail.Document;
                const key = Agent.Id;

                if (!agentMap[key]) {
                    agentMap[key] = {
                        AgentId: Agent.Id,
                        AgentName: Agent.Name,
                        IncomeQuantity: 0,
                        IncomeCost: 0,
                        OutcomeQuantity: 0,
                        OutcomeCost: 0
                    };
                }

                if (Type === 'income') {
                    agentMap[key].IncomeQuantity += detail.Quantity;
                    agentMap[key].IncomeCost += parseFloat(detail.Cost);
                } else if (Type === 'outcome') {
                    agentMap[key].OutcomeQuantity += detail.Quantity;
                    agentMap[key].OutcomeCost += parseFloat(detail.Cost);
                }
            }

            return res.json(Object.values(agentMap));
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении отчета по товару и агентам' });
        }
    }

}

module.exports = new ProductController();
