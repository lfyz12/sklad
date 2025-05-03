import React, { useState } from 'react';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { observer } from "mobx-react-lite";

const DocAddProduct = observer(({ products, innerProducts, addProduct, removeProduct }) => {
    const [selectedId, setSelectedId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [curProducts, setCurProducts] = useState([])
    const handleAdd = (e) => {
        e.stopPropagation()
        const product = products.find(p => p.Id === +selectedId); // Приводим к числу
        if (product && quantity > 0) {
            setCurProducts([...curProducts,{
                Id: product.Id,
                Name: product.Name,
                Quantity: Number(quantity),
                Price: product.Price
            }]);
            console.log(product)
            console.log(curProducts)

            addProduct(curProducts)
            setSelectedId('');
            setQuantity('');
        }
    };


    return (
        <div className="space-y-4">
            <div>
                <h4 className="font-semibold mb-2">Добавленные товары:</h4>
                {curProducts.length > 0 ? (
                    <ul className="divide-y divide-gray-200">
                        {curProducts.map((product, index) => (
                            <li key={index} className="flex justify-between items-center py-2">
                                <div>
                                    <div className="font-medium">{product.Name}</div>
                                    <div className="text-sm text-gray-500">
                                        {product.Quantity} шт. × {product.Price}₽
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeProduct(index)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-sm text-gray-500">Товары не добавлены</div>
                )}
            </div>

            <div className="flex gap-2">
                <select
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                >
                    <option value="" disabled>Выберите товар</option>
                    {products.map(product => (
                        <option key={product.Id} value={product.Id}>
                            {product.Name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Количество"
                    className="w-24 px-2 py-2 rounded-md border border-[#0c1d37]/20"
                />

                <button
                    onClick={handleAdd}
                    className="flex items-center px-3 py-2 bg-[#ff7a00] text-white rounded-md hover:bg-[#e56d00]"
                >
                    <PlusIcon className="h-5 w-5 mr-1" />
                    Добавить
                </button>
            </div>
        </div>
    );
});

export default DocAddProduct;
