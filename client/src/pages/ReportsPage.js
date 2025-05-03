import React, { useContext, useEffect, useState } from 'react';
import ReportTable from "../components/ReportTable";
import { Context } from "../index";

const ReportsPage = () => {
    const { productStore, agentStore } = useContext(Context);
    const [selectedReport, setSelectedReport] = useState('products');

    useEffect(() => {
        productStore.fetchReport();
        agentStore.fetchReport();
    }, []); // Пустой массив для однократного выполнения при монтировании

    const getActiveButtonStyle = (type) =>
        selectedReport === type
            ? 'bg-[#ff7a00] text-white'
            : 'bg-white text-[#0c1d37] hover:bg-gray-100';

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className='text-2xl font-bold text-[#0c1d37] mb-6'>Отчеты</h1>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setSelectedReport('products')}
                    className={`px-6 py-2 rounded-lg border border-[#0c1d37]/20 transition-all ${getActiveButtonStyle('products')}`}
                >
                    Товары
                </button>

                <button
                    onClick={() => setSelectedReport('agents')}
                    className={`px-6 py-2 rounded-lg border border-[#0c1d37]/20 transition-all ${getActiveButtonStyle('agents')}`}
                >
                    Контрагенты
                </button>
            </div>

            {selectedReport === 'products' ? (
                <ReportTable
                    data={productStore.report}
                />
            ) : (
                <ReportTable
                    data={agentStore.report}
                />
            )}
        </div>
    );
};

export default ReportsPage;