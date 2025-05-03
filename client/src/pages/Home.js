import React, {useContext, useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {ADMINROUTER, AGENTROUTER, DOCSROUTER, LOGINROUTER, PRODUCTROUTER, REPORTROUTER} from "../consts";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const Home = () => {
    const { userStore } = useContext(Context);
    // const navigate = useNavigate()
    // const redirect = () => {
    //     if (!userStore.isAuth) {
    //         navigate(LOGINROUTER)
    //     }
    // }

    // useEffect(() => {
    //     redirect()
    // }, [userStore.isAuth])

    return (
        <div className="min-h-screen bg-[#0c1d37] p-4 md:p-8">
            {userStore.user && (
                <div className="max-w-6xl mx-auto">
                    {/* Блок с информацией о пользователе */}
                    <div className="bg-[#ff7a00] rounded-xl shadow-lg p-6 mb-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#0c1d37] mb-2">
                            {userStore.user.fullname}
                        </h2>
                        <h3 className="text-lg md:text-xl text-white">
                            {userStore.user.email}
                        </h3>
                    </div>

                    {/* Сетка навигационных карточек */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <NavLink
                            to={PRODUCTROUTER}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#ff7a00]"
                        >
                            <div className="text-[#0c1d37]">
                                <h3 className="text-xl font-semibold mb-2 hover:text-[#ff7a00] transition-colors">
                                    Товары
                                </h3>
                                <p className="text-[#7a8396]">
                                    Управление номенклатурой и базой данных
                                </p>
                            </div>
                        </NavLink>

                        <NavLink
                            to={AGENTROUTER}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#ff7a00]"
                        >
                            <div className="text-[#0c1d37]">
                                <h3 className="text-xl font-semibold mb-2 hover:text-[#ff7a00] transition-colors">
                                    Контрагенты
                                </h3>
                                <p className="text-[#7a8396]">
                                    Управление номенклатурой и базой данных
                                </p>
                            </div>
                        </NavLink>

                        <NavLink
                            to={DOCSROUTER}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#ff7a00]"
                        >
                            <div className="text-[#0c1d37]">
                                <h3 className="text-xl font-semibold mb-2 hover:text-[#ff7a00] transition-colors">
                                    Документы
                                </h3>
                                <p className="text-[#7a8396]">
                                    Работа с приходными и расходными документами
                                </p>
                            </div>
                        </NavLink>

                        <NavLink
                            to={REPORTROUTER}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#ff7a00]"
                        >
                            <div className="text-[#0c1d37]">
                                <h3 className="text-xl font-semibold mb-2 hover:text-[#ff7a00] transition-colors">
                                    Отчеты
                                </h3>
                                <p className="text-[#7a8396]">
                                    Формирование аналитических отчетов
                                </p>
                            </div>
                        </NavLink>

                        {userStore.user.isAdmin && <NavLink
                            to={ADMINROUTER + '/stock'}
                            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#ff7a00]"
                        >
                            <div className="text-[#0c1d37]">
                                <h3 className="text-xl font-semibold mb-2 hover:text-[#ff7a00] transition-colors">
                                    Остатки
                                </h3>
                                <p className="text-[#7a8396]">
                                    Просмотр текущих остатков на складах
                                </p>
                            </div>
                        </NavLink>}

                        {userStore.user.isAdmin && (
                            <NavLink
                                to={ADMINROUTER + '/users'}
                                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-[#ff7a00]"
                            >
                                <div className="text-[#0c1d37]">
                                    <h3 className="text-xl font-semibold mb-2 hover:text-[#ff7a00] transition-colors">
                                        Админка
                                    </h3>
                                    <p className="text-[#7a8396]">
                                        Управление пользователями и настройками системы
                                    </p>
                                </div>
                            </NavLink>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default observer(Home);
