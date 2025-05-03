const { Document, Agent, DocumentDetails, Product } = require('../models/models');

class DocumentController {
    // 1. Получить список всех документов
    async getAll(req, res) {
        try {
            const documents = await Document.findAll({
                include: [{ model: DocumentDetails }],
                order: [['CreateDate', 'DESC']]
            });

            return res.json(documents);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении документов' });
        }
    }

    // 2. Получить один документ с деталями
    async getOne(req, res) {
        try {
            const id = req.params.id;

            const document = await Document.findByPk(id, {
                include: [
                    { model: Agent },
                    {
                        model: DocumentDetails,
                        include: [Product]
                    }
                ]
            });

            if (!document) {
                return res.status(404).json({ message: 'Документ не найден' });
            }

            return res.json(document);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при получении документа' });
        }
    }

    // 3. Создать новый документ с товарами
    async create(req, res) {
        try {
            const { AgentId, Type, items } = req.body;

            const document = await Document.create({
                AgentId,
                Type,
                Active: false
            });

            for (const item of items) {
                const product = await Product.findByPk(item.ProductId);

                if (!product) continue;

                await DocumentDetails.create({
                    DocumentId: document.Id,
                    ProductId: item.ProductId,
                    Quantity: item.Quantity,
                    Price: item.Price,
                    Cost: item.Quantity * item.Price
                });

                // Обновим количество на складе только если документ активируется
                // Можно добавить флаг "автообновление при создании"
            }

            return res.status(201).json(document);
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при создании документа' });
        }
    }

    // 4. Подписать документ
    async activate(req, res) {
        try {
            const {id} = req.body;
            const document = await Document.findByPk(id, {
                include: [DocumentDetails]
            });

            if (!document) {
                return res.status(404).json({ message: 'Документ не найден' });
            }

            if (document.Active) {
                return res.status(400).json({ message: 'Документ уже подписан' });
            }

            // Обновим остатки товаров
            for (const detail of document.DocumentDetails) {
                const product = await Product.findByPk(detail.ProductId);

                if (document.Type === 'INCOME') {
                    product.Quantity += detail.Quantity;
                } else {
                    product.Quantity -= detail.Quantity;
                }

                await product.save();
            }

            document.Active = true;
            document.UpdateDate = new Date();
            await document.save();

            return res.json({ message: 'Документ подписан' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при подписании документа' });
        }
    }

    // 5. Удаление документа (по желанию)
    async delete(req, res) {
        try {
            const {id} = req.body;
            const document = await Document.findByPk(id);

            if (!document) {
                return res.status(404).json({ message: 'Документ не найден' });
            }

            await DocumentDetails.destroy({ where: { DocumentId: id } });
            await document.destroy();

            return res.json({ message: 'Документ удалён' });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Ошибка при удалении документа' });
        }
    }
}

module.exports = new DocumentController();
