import { observer } from 'mobx-react-lite';
import {useContext, useEffect, useState} from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {Context} from "../index";

const AgentModal = observer(({isOpen, onClose, selectedAgent}) => {
    const {agentStore} = useContext(Context)
    const [formData, setFormData] = useState({
        Name: '',
        Type: '',
    });

    const onEdit = () => {
        setFormData({...selectedAgent})
    }

    useEffect(() => {
        if (selectedAgent) {
            onEdit()
        }
    }, [selectedAgent])



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedAgent) {
                await agentStore.updateAgent({
                    Id: formData.Id,
                    Name: formData.Name,
                    Type: formData.Type
                });
            } else {
                await agentStore.createAgent({
                    Name: formData.Name,
                    Type: formData.Type
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
                        Добавть контрагента
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

                        <div>
                            <label className="block text-sm font-medium text-[#0c1d37] mb-1">
                                Категория
                            </label>
                            <select
                                required
                                value={formData.Type}
                                onChange={(e) => setFormData({...formData, Type: e.target.value})}
                                className="w-full px-3 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                            >
                                <option value="" disabled selected>Выберите тип</option>
                                <option value="Юридическое лицо">Юр. лицо</option>
                                <option value="Физическое лицо">Физ. лицо</option>
                            </select>
                        </div>


                    {agentStore.error && (
                        <div className="text-red-500 text-sm">
                            {agentStore.error}
                        </div>
                    )}

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-[#0c1d37] hover:text-[#ff7a00]"
                            disabled={agentStore.isLoading}
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#ff7a00] text-white rounded-md hover:bg-[#e56d00] disabled:opacity-50"
                            disabled={agentStore.isLoading}
                        >
                            {agentStore.isLoading ? 'Создание...' : selectedAgent ? 'Изменить' : 'Добавить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default AgentModal;