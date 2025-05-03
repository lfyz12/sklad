import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {Context} from "../index";
import ProductRow from "../components/ProductRow";
import ProductModal from "../components/ProductModal";

const ProductsPage = observer(() => {
    const { productStore, userStore } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const isAdmin = userStore.isAuth && userStore.user && userStore.user.isAdmin;

    useEffect(() => {
        productStore.fetchAll();
    }, [productStore.products.length]);

    const filteredProducts = productStore.products.filter(product => {
        const searchLower = searchQuery.toLowerCase();
        return (
            product.Name.toLowerCase().includes(searchLower) ||
            product.Id.toString().includes(searchQuery)
        );
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (!sortConfig.key) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Вы уверены, что хотите удалить товар?')) {
            await productStore.deleteProduct(id);
        }
    };

    if (userStore.isLoading) {
        return (
            <div className="max-w-2xl mx-auto p-4 md:p-6">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                            <div className="h-10 bg-gray-200 rounded-xl"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className='text-2xl font-bold text-[#0c1d37] mb-6'>Товары</h1>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        placeholder="Поиск по названию или номеру"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                    />
                </div>
                <button
                    onClick={() => {
                        setSelectedProduct(null);
                        setModalOpen(true);
                    }}
                    className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-[#ff7a00] text-white rounded-lg hover:bg-[#e56d00]"
                >
                    <PlusIcon className="h-5 w-5 mr-2"/>
                    Добавить товар
                </button>
            </div>

            {productStore.error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
                    {productStore.error}
                </div>
            )}

            <div className="overflow-x-auto rounded-lg border border-[#0c1d37]/20">
                <table className="w-full">
                    <thead className="bg-[#0c1d37]/5">
                    <tr>
                        {isAdmin? ['Id', 'Name', 'Description', 'Quantity', 'Price', 'createdAt', 'updatedAt'].map((key) => (
                                <th
                                    key={key}
                                    className="px-4 py-3 text-left text-sm font-semibold text-[#0c1d37] cursor-pointer"
                                    onClick={() => handleSort(key)}
                                >
                                    {{
                                        Id: 'Номер',
                                        Name: 'Наименование',
                                        Description: 'Описание',
                                        Quantity: 'Количество',
                                        Price: 'Цена',
                                        createdAt: 'Дата создания',
                                        updatedAt: 'Дата изменения',
                                    }[key]}
                                    {sortConfig.key === key && (
                                        <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                                    )}
                                </th>
                            )) :
                            ['Id', 'Name', 'Description', 'Price', 'createdAt', 'updatedAt'].map((key) => (
                                <th
                                    key={key}
                                    className="px-4 py-3 text-left text-sm font-semibold text-[#0c1d37] cursor-pointer"
                                    onClick={() => handleSort(key)}
                                >
                                    {{
                                        Id: 'Номер',
                                        Name: 'Наименование',
                                        Description: 'Описание',
                                        Price: 'Цена',
                                        createdAt: 'Дата создания',
                                        updatedAt: 'Дата изменения',
                                    }[key]}
                                    {sortConfig.key === key && (
                                        <span className="ml-1">
                      {sortConfig.direction === 'asc' ? '↑' : '↓'}
                    </span>
                                    )}
                                </th>
                            ))}
                        <th className="px-4 py-3 text-right text-sm font-semibold text-[#0c1d37]">Действия</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-[#0c1d37]/10">
                    {sortedProducts.map((product) => (
                        <ProductRow
                            key={product.Id}
                            product={product}
                            onEdit={(product) => {
                                setSelectedProduct(product);
                                setModalOpen(true);
                            }}
                            onDelete={handleDelete}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
            {modalOpen && <ProductModal
                selectedProduct={selectedProduct}
                isOpen={modalOpen}
                onClose={() => {
                    setSelectedProduct(null)
                    setModalOpen(false)
                }}
            />}
        </div>
    );
});

export default ProductsPage;
