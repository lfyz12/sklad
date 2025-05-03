import {useContext, useState} from 'react';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import logoImage from '../assets/logo.png';
import {ADMINROUTER, AGENTROUTER, DOCSROUTER, LOGINROUTER, PRODUCTROUTER, REPORTROUTER} from "../consts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Header = () => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate()

    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    const handleLogout = () => {
        userStore.logout()
        navigate(LOGINROUTER)
    }

    return (
        <header className="bg-[#161b26] shadow-lg">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Логотип с ссылкой на главную */}
                    <NavLink
                        to={userStore.isAuth ? '/' : LOGINROUTER}
                        className="flex-shrink-0 hover:opacity-90 transition-opacity"
                    >
                        <img
                            src={logoImage}
                            alt="Логотип компании"
                            className="h-full object-contain" // object-contain сохранит пропорции
                        />
                    </NavLink>

                    {/* Десктопное меню */}
                    {userStore.isAuth && <nav className="hidden md:flex items-center space-x-8">
                        <Link
                            to={PRODUCTROUTER}
                            className="text-white hover:text-[#ff7a00] transition-colors px-3 py-2 text-sm font-medium"
                        >
                            Товары
                        </Link>
                        <Link
                            to={AGENTROUTER}
                            className="text-white hover:text-[#ff7a00] transition-colors px-3 py-2 text-sm font-medium"
                        >
                            Контрагенты
                        </Link>
                        <Link
                            to={DOCSROUTER}
                            className="text-white hover:text-[#ff7a00] transition-colors px-3 py-2 text-sm font-medium"
                        >
                            Документы
                        </Link>
                        <Link
                            to={REPORTROUTER}
                            className="text-white hover:text-[#ff7a00] transition-colors px-3 py-2 text-sm font-medium"
                        >
                            Отчеты
                        </Link>

                        {/* Выпадающее меню Сервис */}
                        {userStore.user.isAdmin && <div
                            className="relative"
                        >
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className="text-white hover:text-[#ff7a00] transition-colors px-3 py-2 text-sm font-medium flex items-center"
                            >
                                Сервис
                                <svg
                                    className={`ml-1 h-5 w-5 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>

                            {isServicesOpen && userStore.user.isAdmin && (
                                <div
                                    className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                    <div className="py-1">
                                        <Link
                                            to={ADMINROUTER + '/users'}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#ff7a00] hover:text-white"
                                        >
                                            Админка
                                        </Link>
                                        <Link
                                            to={ADMINROUTER + '/stock'}
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#ff7a00] hover:text-white"
                                        >
                                            Остатки
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>}
                        <button
                            onClick={handleLogout}
                            className="text-white bg-[#ff7a00] hover:text-[#161b26] transition-colors px-3 py-2 text-sm font-medium ml-4"
                        >
                            Выйти
                        </button>
                    </nav>}

                    {/* Мобильное меню (гамбургер) */}
                    {userStore.isAuth && <div className="md:hidden">
                        <button
                            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-white hover:text-[#ff7a00] focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 6h16M4 12h16M4 18h16"/>
                                )}
                            </svg>
                        </button>
                    </div>}
                </div>
            </div>

            {/* Мобильное меню (раскрывающееся) */}
            {isMobileMenuOpen && userStore.isAuth && (
                <div className="md:hidden bg-[#161b26]">
                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                        <Link
                            to="/directories"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#ff7a00]"
                        >
                            Товары
                        </Link>
                        <Link
                            to="/documents"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#ff7a00]"
                        >
                            Документы
                        </Link>
                        <Link
                            to="/reports"
                            className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#ff7a00]"
                        >
                            Отчеты
                        </Link>
                        <div className="relative">
                            <button
                                onClick={() => setIsServicesOpen(!isServicesOpen)}
                                className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#ff7a00]"
                            >
                                Сервис
                                <svg
                                    className={`h-5 w-5 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path fillRule="evenodd"
                                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                          clipRule="evenodd"/>
                                </svg>
                            </button>
                            {isServicesOpen && (
                                <div className="pl-4">
                                    <Link
                                        to="/admin"
                                        className="block rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-[#ff7a00] hover:text-white"
                                    >
                                        Админка
                                    </Link>
                                    <Link
                                        to="/stock"
                                        className="block rounded-md px-3 py-2 text-sm text-gray-200 hover:bg-[#ff7a00] hover:text-white"
                                    >
                                        Остатки
                                    </Link>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#ff7a00]"
                        >
                            Выйти
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default observer(Header);