import React from 'react';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import {Context} from "../index";

const ProductRow = observer(({ product, onEdit, onDelete }) => {
    const {userStore} = useContext(Context)
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-4 py-3 text-sm text-[#0c1d37]">{product.Id}</td>
            <td className="px-4 py-3 text-sm text-[#0c1d37]">{product.Name}</td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">{product.Description}</td>
            {userStore.user.isAdmin && <td className="px-4 py-3 text-sm text-[#7a8396]">{product.Quantity}</td>}
            <td className="px-4 py-3 text-sm text-[#0c1d37]">{product.Price}</td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">
                {new Date(product.CreateDate).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </td>
            <td className="px-4 py-3 text-sm text-[#7a8396]">
                {new Date(product.UpdateDate).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}
            </td>
            <td className="px-4 py-3 flex space-x-2 justify-end">
                <button
                    onClick={() => onEdit(product)}
                    className="text-[#0c1d37] hover:text-[#ff7a00]"
                >
                    <PencilIcon className="h-5 w-5"/>
                </button>
                <button
                    onClick={() => onDelete(product.Id)}
                    className="text-[#0c1d37] hover:text-[#ff7a00]"
                >
                    <TrashIcon className="h-5 w-5"/>
                </button>
            </td>
        </tr>
    );
});

export default ProductRow;