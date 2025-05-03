import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {Context} from "../index";

const AgentRow = observer(({ agent, onEdit, onDelete }) => {

    const {agentStore} = useContext(Context)
    if (!agent) {
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
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-3 text-sm text-[#0c1d37]">{agent.Id}</td>
            <td className="px-4 py-3 text-sm text-[#0c1d37]">{agent.Name}</td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">{agent.Type}</td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">
                {new Date(agent.CreateDate).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">
                {new Date(agent.UpdateDate).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </td>
            <td className="px-4 py-3 flex space-x-2 justify-end">
                <button
                    onClick={() => onEdit(agent)}
                    className="text-[#0c1d37] hover:text-[#ff7a00]"
                >
                    <PencilIcon className="h-5 w-5"/>
                </button>
                <button
                    onClick={() => onDelete(agent.Id)}
                    className="text-[#0c1d37] hover:text-[#ff7a00]"
                >
                    <TrashIcon className="h-5 w-5"/>
                </button>
            </td>
        </tr>
    );
});

export default AgentRow;