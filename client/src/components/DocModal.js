// DocumentModal.jsx
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';

const DocModal = observer(({ document, isOpen, onClose }) => {
    const { documentStore, agentStore, productStore } = useContext(Context);
    const [quantity, setQuantity] = useState(0);
    const [agentId, setAgentId] = useState(0);
    const [type, setType] = useState('income');
    const [items, setItems] = useState([]);
    const [isDisabled, setIsDisabled] = useState(document ? true : false);
    const [item, setItem] = useState({
        ProductId: '',
        Quantity: 1,
        Price: ''
    });

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([
                agentStore.fetchAll(),
                productStore.fetchAll()
            ]);

            if (document) {
                setType(document.Type);
                setAgentId(document.AgentId);
                // Убедимся что продукты загружены перед установкой items
                setItems(document.DocumentDetails.map(detail => ({
                    ...detail,
                    ProductId: detail.ProductId
                })));
            }
        };
        loadData();
    }, [document]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (document) {
            // Редактирование документа
        } else {
            await documentStore.create(agentId, type, items);
        }
        onClose();
    };

    const addProduct = () => {
        if (!item.ProductId) {
            alert('Пожалуйста, выберите товар');
            return;
        }

        const exists = items.some(i => i.ProductId === item.ProductId);
        if (exists) {
            alert('Этот товар уже добавлен');
            return;
        }

        setItems([...items, item]);
        setItem({ ProductId: '', Quantity: 1, Price: '' });
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                        <Dialog.Title className="text-lg font-semibold">
                            {document ? 'Редактирование документа' : 'Новый документ'}
                        </Dialog.Title>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Тип документа</label>
                                <select
                                    value={type}
                                    disabled={isDisabled}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border"
                                >
                                    <option value="income">Приходный</option>
                                    <option value="outcome">Расходный</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Контрагент</label>
                                <select
                                    value={agentId}
                                    disabled={isDisabled}
                                    onChange={(e) => setAgentId(+e.target.value)}
                                    className="w-full px-3 py-2 rounded-md border"
                                >
                                    <option value="">Выберите контрагента</option>
                                    {agentStore.agents.map(agent => (
                                        <option key={agent.Id} value={agent.Id}>{agent.Name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <h3 className="font-medium mb-2">Товары</h3>
                            <div className="space-y-2">
                                {items.length > 0 && productStore.products.length > 0 && items.map((pItem, index) => {
                                    const product = productStore.products.find(p => p.Id === pItem.ProductId);
                                    return (
                                        <div key={index} className="flex items-center gap-2">
                                            <span>{product?.Name || 'Загрузка...'}</span>
                                            <span>{pItem.Quantity}</span>
                                        </div>
                                    );
                                })}

                                {productStore.products.length > 0 && (
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={item.ProductId}
                                            disabled={isDisabled}
                                            className="flex-1 px-2 py-1 border rounded"
                                            onChange={e => {
                                                const selectedId = +e.target.value;
                                                const selectedProduct = productStore.products.find(p => p.Id === selectedId);
                                                setItem({
                                                    ...item,
                                                    ProductId: selectedId,
                                                    Price: selectedProduct?.Price || '',
                                                });
                                            }}
                                        >
                                            <option value="">Выберите товар</option>
                                            {productStore.products.map(product => (
                                                <option key={product.Id} value={product.Id}>
                                                    {product.Name}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            type="number"
                                            min="1"
                                            disabled={isDisabled}
                                            value={item.Quantity}
                                            onChange={(e) =>
                                                setItem({
                                                    ...item,
                                                    Quantity: Math.max(1, +e.target.value)
                                                })}
                                            className="w-20 px-2 py-1 border rounded"
                                        />
                                    </div>
                                )}
                                <button
                                    type="button"
                                    disabled={isDisabled}
                                    onClick={addProduct}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                >
                                    + Добавить товар
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border rounded"
                            >
                                Ок
                            </button>
                            {!document && <button
                                type="submit"
                                className="px-4 py-2 bg-[#ff7a00] text-white rounded hover:bg-[#e56d00]"
                            >
                                Сохранить
                            </button>}
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
});

export default DocModal;