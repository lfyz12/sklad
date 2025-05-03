import React, {useContext, useEffect, useState} from 'react';
import { observer } from 'mobx-react-lite';
import {Context} from "../index";
import ProductsPage from "./ProductsPage";
import {useNavigate, useParams} from "react-router-dom";
import {ADMINROUTER} from "../consts";

const AdminPage = observer(() => {
    const {section} = useParams()
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('users');
    const { userStore } = useContext(Context);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        isAdmin: false
    });

    const isSection = () => section === 'stock' ? setActiveTab('stock') : setActiveTab('users')

    useEffect(() => {
        isSection()
    }, [section])


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await userStore.register(formData.name, formData.email, formData.password, formData.isAdmin);
            // Очистка формы после успешной регистрации
            setFormData({
                name: '',
                email: '',
                password: '',
                role: 'user'
            });
        } catch (error) {
            console.error('Ошибка регистрации:', error);
        }
    };

    return (
        <div className={`${activeTab === 'stock' ? 'max-w-6xl ' : 'max-w-4xl'} mx-auto p-6`}>
            {/* Табы для переключения разделов */}
            <div className="flex border-b border-[#0c1d37]/20 mb-6">
                <button
                    onClick={() => {
                        navigate(ADMINROUTER + '/users')
                        setActiveTab('users')
                    }}
                    className={`px-6 py-3 font-medium ${
                        activeTab === 'users'
                            ? 'border-b-2 border-[#ff7a00] text-[#ff7a00]'
                            : 'text-[#0c1d37] hover:text-[#ff7a00]'
                    }`}
                >
                    Управление пользователями
                </button>
                <button
                    onClick={() => {
                        navigate(ADMINROUTER + '/stock')
                        setActiveTab('stock')
                    }}
                    className={`px-6 py-3 font-medium ${
                        activeTab === 'stock'
                            ? 'border-b-2 border-[#ff7a00] text-[#ff7a00]'
                            : 'text-[#0c1d37] hover:text-[#ff7a00]'
                    }`}
                >
                    Управление остатками
                </button>
            </div>

            {/* Контент для управления пользователями */}
            {activeTab === 'users' && (
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-[#0c1d37] mb-6">
                        Регистрация нового пользователя
                    </h2>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#0c1d37] mb-1">
                                Полное имя *
                            </label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full px-4 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0c1d37] mb-1">
                                Email *
                            </label>
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0c1d37] mb-1">
                                Пароль *
                            </label>
                            <input
                                required
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full px-4 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#0c1d37] mb-1">
                                Роль пользователя
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                className="w-full px-4 py-2 rounded-md border border-[#0c1d37]/20 focus:ring-[#ff7a00] focus:border-[#ff7a00]"
                            >
                                <option value={false}>Обычный пользователь</option>
                                <option value={true}>Администратор</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#ff7a00] text-white py-2 px-4 rounded-md hover:bg-[#e56d00] transition-colors"
                            disabled={userStore.isLoading}
                        >
                            {userStore.isLoading ? 'Регистрация...' : 'Зарегистрировать'}
                        </button>

                        {userStore.error && (
                            <div className="text-red-500 text-sm mt-2">
                                {userStore.error}
                            </div>
                        )}
                    </form>
                </div>
            )}

            {/* Контент для управления остатками */}
            {activeTab === 'stock' && (
                <div className="bg-white w-full rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-[#0c1d37] mb-6">
                        Управление остатками товаров
                    </h2>
                    <ProductsPage />
                </div>
            )}
        </div>
    );
});

export default AdminPage;