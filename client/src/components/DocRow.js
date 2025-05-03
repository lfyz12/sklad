import React, { useEffect, useState, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { PencilIcon, TrashIcon, CheckIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Context } from "../index";

const DocRow = observer(({ document, onEdit, onDelete, onActivate }) => {
    const { agentStore } = useContext(Context);
    const [agent, setAgent] = useState(null);

    useEffect(() => {
        const fetchAgent = async () => {
            const data = await agentStore.fetchById(document.AgentId); // пусть возвращает объект
            setAgent(data);
        };
        fetchAgent();
    }, [document.AgentId]);

    return (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-3 text-sm text-[#0c1d37]">{document.Id}</td>
            <td className="px-4 py-3 text-sm text-[#0c1d37]">
                {document.Type === 'income' ? 'Приходный' : 'Расходный'}
            </td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">
                {agent?.Name || '—'}
            </td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">
                {new Date(document.CreateDate).toLocaleString('ru-RU')}
            </td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">
                {document.Active ? (
                    <span className="text-green-600">Активен</span>
                ) : (
                    <span className="text-orange-600">Черновик</span>
                )}
            </td>
            <td className="px-4 py-3 flex space-x-2 justify-end">
                {!document.Active && (
                    <button
                        onClick={() => onActivate(+document.Id)}
                        className="text-[#0c1d37] hover:text-[#ff7a00]"
                    >
                        <CheckIcon className="h-5 w-5" />
                    </button>
                )}
                <button
                    onClick={() => onEdit(document)}
                    className="text-[#0c1d37] hover:text-[#ff7a00]"
                >
                    <EyeIcon className="h-5 w-5" />
                </button>
                <button
                    onClick={() => onDelete(+document.Id)}
                    className="text-[#0c1d37] hover:text-[#ff7a00]"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            </td>
        </tr>
    );
});

export default DocRow;
