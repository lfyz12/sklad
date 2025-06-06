import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";
import {HOMEROUTER} from "../consts";
import {observer} from "mobx-react-lite";

const LoginPage = () => {
    const {userStore} = useContext(Context)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = async () => {
        await userStore.login(email, password).then(res => {
            navigate(HOMEROUTER)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="min-h-screen bg-[#0c1d37] flex items-center justify-center p-4">
            <div className="bg-[#ffffff] rounded-xl shadow-2xl p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-[#0c1d37] mb-8 text-center">
                    Вход в систему склада
                </h1>

                <form className="space-y-6">
                    <div>
                        <label className="block text-[#0c1d37] text-sm font-semibold mb-2">
                            Электронная почта
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="example@gmail.com"
                            className="w-full px-4 py-3 border-2 border-[#0c1d37]/30 rounded-lg
                     focus:outline-none focus:border-[#ff7a00]
                     transition-colors placeholder:text-[#0c1d37]/50"
                        />
                    </div>

                    <div>
                        <label className="block text-[#0c1d37] text-sm font-semibold mb-2">
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Пароль"
                            className="w-full px-4 py-3 border-2 border-[#0c1d37]/30 rounded-lg
                     focus:outline-none focus:border-[#ff7a00]
                     transition-colors placeholder:text-[#0c1d37]/50"
                        />
                    </div>
                    <span className='text-red-500 text-center block'>{userStore.error}</span>
                    <button
                        type="submit"
                        onClick={e => {
                            e.preventDefault()
                            login()
                        }}
                        className="w-full bg-[#ff7a00] text-white py-3 px-4 rounded-lg
                   font-semibold hover:bg-[#e56d00] transition-colors
                   focus:outline-none focus:ring-2 focus:ring-[#ff7a00]
                   focus:ring-offset-2 shadow-md"
                    >
                        Войти в систему
                    </button>
                </form>
            </div>
        </div>
    );
};

export default observer(LoginPage);
