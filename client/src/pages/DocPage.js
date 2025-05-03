// DocumentsPage.jsx
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '../index';
import { PlusIcon } from '@heroicons/react/24/outline';
import DocModal from "../components/DocModal";
import DocRow from "../components/DocRow";

const DocPage = observer(() => {
    const { documentStore, productStore } = useContext(Context);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);

    const onDel = async (id) => {
        await documentStore.deleteDocument(id)
    }

    const onActive = async (id) => {
        await documentStore.activateDocument(id)
    }

    useEffect(() => {
        documentStore.fetchAll();
        productStore.fetchAll();
    }, []);

    const filteredDocuments = documentStore.documents.filter(doc => {
        const searchLower = searchQuery.toLowerCase();
        return (
            doc.Id.toString().includes(searchLower) ||
            doc.Agent?.Name.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className='text-2xl font-bold text-[#0c1d37] mb-6'>Документы</h1>
            <div className="flex justify-between items-center mb-6">
                <input
                    type="text"
                    placeholder="Поиск по номеру или контрагенту"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 px-4 py-2 rounded-lg border"
                />
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center bg-[#ff7a00] text-white px-4 py-2 rounded-lg"
                >
                    <PlusIcon className="h-5 w-5 mr-2"/>
                    Новый документ
                </button>
            </div>

            <div className="overflow-x-auto rounded-lg border">
                <table className="w-full">
                    <thead className="bg-gray-50">
                    <tr>
                        {['ID', 'Тип', 'Контрагент', 'Дата создания', 'Статус', 'Действия'].map((header) => (
                            <th
                                key={header}
                                className="px-4 py-3 text-left text-sm font-medium text-gray-700"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y">
                    {filteredDocuments.map(document => (
                        <DocRow
                            key={document.id}
                            document={document}
                            onEdit={() => {
                                setSelectedDocument(document);
                                setModalOpen(true);
                            }}
                            onDelete={onDel}
                            onActivate={onActive}
                        />
                    ))}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <DocModal
                    document={selectedDocument}
                    isOpen={modalOpen}
                    onClose={() => {
                        setSelectedDocument(null);
                        setModalOpen(false);
                    }}
                />
            )}
        </div>
    );
});

export default DocPage;