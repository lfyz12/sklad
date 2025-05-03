import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {Context} from "../index";
import ProductRow from "../components/ProductRow";
import ProductModal from "../components/ProductModal";

const ReportTable = observer(({data}) => {
    const { productStore } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        productStore.fetchReport();
    }, [productStore.report.length]);

    const filteredProducts = data.filter(product => {
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


    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="overflow-x-auto rounded-lg border border-[#0c1d37]/20 shadow-sm">
                <table className="w-full">
                    <thead className="bg-[#0c1d37] text-white">
                    <tr>
                        <th
                            rowSpan="2"
                            className="px-4 py-3 text-sm font-semibold border-r border-[#0c1d37]/20"
                        >
                            Номер
                        </th>
                        <th
                            rowSpan="2"
                            className="px-4 py-3 text-sm font-semibold border-r border-[#0c1d37]/20"
                        >
                            Наименование
                        </th>
                        <th
                            colSpan="2"
                            className="px-4 py-3 text-sm font-semibold border-r border-[#0c1d37]/20 text-center"
                        >
                            Приход
                        </th>
                        <th
                            colSpan="2"
                            className="px-4 py-3 text-sm font-semibold text-center"
                        >
                            Расход
                        </th>
                    </tr>
                    <tr className="bg-[#0c1d37]/90">
                        <th className="px-4 py-2 text-sm font-medium border-r border-[#0c1d37]/20">Шт.</th>
                        <th className="px-4 py-2 text-sm font-medium border-r border-[#0c1d37]/20">На сумму</th>
                        <th className="px-4 py-2 text-sm font-medium border-r border-[#0c1d37]/20">Шт.</th>
                        <th className="px-4 py-2 text-sm font-medium">На сумму</th>
                    </tr>
                    </thead>

                    <tbody className="divide-y divide-[#0c1d37]/10">
                    {data.map((item) => (
                        <tr
                            key={item.id}
                            className="hover:bg-[#ff7a00]/10 transition-colors"
                        >
                            <td className="px-4 py-3 text-sm text-[#0c1d37] font-medium">
                                {item.ProductId ? item.ProductId : item.AgentId}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#0c1d37] text-center">
                                {item.Name}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#7a8396] text-center">
                                {item.IncomeQuantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#7a8396] text-center">
                                {item.IncomeCost}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#7a8396] text-center">
                                {item.OutcomeQuantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-[#7a8396] text-center">
                                {item.OutcomeCost}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {!data.length && (
                <div className="mt-4 p-4 bg-[#0c1d37]/5 rounded-lg text-center text-[#7a8396]">
                    Нет данных для отображения
                </div>
            )}
        </div>
    );
});

export default ReportTable;