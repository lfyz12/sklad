import { observer } from 'mobx-react-lite';
import {useContext, useEffect, useState} from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {Context} from "../index";

const ProductModal = observer(({isOpen, onClose, selectedProduct}) => {
    const {productStore, userStore} = useContext(Context)
    const [formData, setFormData] = useState({
        Name: '',
        Quantity: '',
        Price: '',
        Description: ''
    });

    const onEdit = () => {
        setFormData({...selectedProduct})
    }

    useEffect(() => {
        if (selectedProduct) {
            onEdit()
            console.log(selectedProduct)
        }
    }, [selectedProduct])



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedProduct) {
                await productStore.updateProduct({
                    Id: formData.Id,
                    Name: formData.Name,
                    Quantity: Number(formData.Quantity),
                    Price: formData.Price,
                    Description: formData.Description
                });
            } else {
                await productStore.createProduct({
                    Name: formData.Name,
                    Quantity: Number(formData.Quantity) | 1,
                    Price: formData.Price,
                    Description: formData.Description
                });
            }
            onClose();
        } catch (error) {
            // Ошибка уже обрабатывается в store
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-md">
                <div className="flex justify-between items-center p-4 border-b border-[#0c1d37]/10">
                    <h3 className="text-lg font-semibold text-[#0c1d37]">
                        Создание нового товара
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-[#7a8396] hover:text-[#ff7a00]"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-[#0c1d37] mb-1">
                            Наименование *
                        </label>
                        <input
                            required
                            value={formData.Name}
                            onChange={(e) => setFormData({...formData, Name: e.target.value})}
                            className="w-full px-3 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                        />
                    </div>

                    <div className={`grid gap-4 ${userStore.user.isAdmin ? 'grid-cols-2' : 'grid-cols-1'}`}>

                        <div>
                            <label className="block w-full text-sm font-medium text-[#0c1d37] mb-1">
                                Цена *
                            </label>
                            <input
                                required
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.Price}
                                onChange={(e) => setFormData({...formData, Price: e.target.value})}
                                className="w-full px-3 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                            />
                        </div>

                        {userStore.user.isAdmin && <div>
                            <label className="block w-full text-sm font-medium text-[#0c1d37] mb-1">
                                Количество
                            </label>
                            <input
                                required
                                type="number"
                                min="0"
                                step="1"
                                value={formData.Quantity}
                                onChange={(e) => setFormData({...formData, Quantity: e.target.value})}
                                className="w-full px-3 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                            />
                        </div>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#0c1d37] mb-1">
                            Описание
                        </label>
                        <textarea
                            value={formData.Description}
                            onChange={(e) => setFormData({...formData, Description: e.target.value})}
                            className="w-full px-3 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                            rows="3"
                        />
                    </div>

                    {productStore.error && (
                        <div className="text-red-500 text-sm">
                            {productStore.error}
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-[#0c1d37] hover:text-[#ff7a00]"
                            disabled={productStore.isLoading}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#ff7a00] text-white rounded-md hover:bg-[#e56d00] disabled:opacity-50"
                            disabled={productStore.isLoading}
                        >
                            {productStore.isLoading ? 'Создание...' : selectedProduct ? 'Изменить товар' : 'Создать товар'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default ProductModal;