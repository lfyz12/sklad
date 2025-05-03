import {ADMINROUTER, AGENTROUTER, DOCSROUTER, HOMEROUTER, LOGINROUTER, PRODUCTROUTER, REPORTROUTER} from "./consts";
import LoginPage from "./pages/LoginPage";
import AgentsPage from "./pages/AgentsPage";
import DocPage from "./pages/DocPage";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";

export const publicRoutes = [
    {
        path: LOGINROUTER,
        element: <LoginPage/>
    }
]

export const authRoutes = [
    {
        path: AGENTROUTER,
        element: <AgentsPage/>
    },
    {
        path: DOCSROUTER,
        element: <DocPage/>
    },
    {
        path: PRODUCTROUTER,
        element: <ProductsPage/>
    },
    {
        path: REPORTROUTER,
        element: <ReportsPage/>
    },
    {
        path: HOMEROUTER,
        element: <Home/>
    },
]

export const adminRoutes = [
    {
        path: ADMINROUTER,
        element: <AdminPage/>
    },
    {
        path: ADMINROUTER + '/:section',
        element: <AdminPage/>
    }
]