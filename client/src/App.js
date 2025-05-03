import './App.css';
import {BrowserRouter, NavLink} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {HOMEROUTER} from "./consts";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Header from "./components/Header";

function App() {
    const {userStore} = useContext(Context)
    const checkAuth = async () => {
        await userStore.checkAuth()
    }
    useEffect(() => {
        checkAuth()
    }, []);

  return (
    <BrowserRouter>
      <Header/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default observer(App);
