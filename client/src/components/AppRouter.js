import React, {useContext, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, authRoutes, publicRoutes} from "../Router";
import Home from "../pages/Home";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const AppRouter = () => {
    const {userStore} = useContext(Context)

    return (
        <Routes>
            {userStore.isAuth && authRoutes.map(({path, element}) => <Route key={path} path={path} element={element} /> )}
            {userStore.user && (userStore.user.isAdmin && userStore.isAuth) && adminRoutes.map(({path, element}) => <Route key={path} path={path} element={element} /> )}
            {publicRoutes.map(({path, element}) => <Route key={path} path={path} element={element} /> )}
            <Route path={'*'} element={<Home/>}/>
        </Routes>
    );
};

export default observer(AppRouter);