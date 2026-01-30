import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "@/layouts/AppLayout.tsx";
import Home from "@/pages/Home";
import Trade from "../pages/Trade";
import Asset from "../pages/Asset";
import Commission from "../pages/Profile/Commission";
import Activity from "../pages/Activity";
import MainLayout from "@/layouts/MainLayout.tsx";
import TokenSearcher from "@/pages/Token/Searcher";
import {ReactNode} from "react";
import TransferOut from "../components/Wallet/TransferOut";
import TransferIn from "../components/Wallet/TransferIn";
import TokenProfile from "@/pages/Token/Profile";
import CommissionSettlement from "../pages/Profile/Commission/Settlement";
import Profile from "@/pages/Profile";
import WalletManagement from "../components/Wallet/Management";
import TradeSettings from "../pages/Profile/TradeSettings";
import Tutorial from "../pages/Profile/Tutorial";
import WithdrawHistory from "@/pages/Profile/Commission/Withrawal/History.tsx";
import PasswordSetting from "../components/Wallet/PasswordSetting";
import FollowingManage from "@/pages/Activity/FollowingManage";


export declare interface RouteMeta {
    path: string,
    key?: string
    icon?: string,
    component: ReactNode,
    showBackButton?: boolean
}

export const mainRoutes: RouteMeta[] = [
    {path: '/home', icon: 'home-5-fill', component: <Home/>},
    {path: '/trade', icon: 'money-dollar-circle-fill', component: <Trade/>},
    {path: '/activity', icon: 'hearts-fill', component: <Activity/>},
    {path: '/asset', icon: 'account-circle-fill', component: <Asset/>}
]

export const singleRoutes: RouteMeta[] = [
    {path: '/token-search', showBackButton: true, component: <TokenSearcher/>},
    {key: '/tokens', path: '/tokens/:id', showBackButton: true, component: <TokenProfile/>},
    {path: '/transfer-in', showBackButton: true, component: <TransferIn/>},
    {path: '/transfer-out', showBackButton: true, component: <TransferOut/>},

    {path: '/profile', showBackButton: true, component: <Profile/>},
    {path: '/wallet-management', showBackButton: true, component: <WalletManagement/>},
    {path: '/password-setting', showBackButton: true, component: <PasswordSetting/>},
    {path: '/commission', showBackButton: true,  component: <Commission/>},
    {path: '/commission-settlement', showBackButton: true, component: <CommissionSettlement/>},
    {path: '/withdrawal-history', showBackButton: true, component: <WithdrawHistory/>},
    {path: '/trade-settings', showBackButton: true, component: <TradeSettings/>},
    {path: '/tutorial', showBackButton: true, component: <Tutorial/>},
    {path: '/following-manage', showBackButton: true, component: <FollowingManage/>},
]

export const singleRouteByPathname = (pathname: string): RouteMeta => {
    return singleRoutes.filter(x => {
        return pathname?.startsWith(x.key || x.path)
    })?.[0]
}

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route path={'/'} element={<AppLayout/>}>
                {
                    singleRoutes.map((x, i) => <Route key={i} path={x.path} element={x.component}/>)
                }
                <Route path="/" element={<MainLayout/>}>
                    <Route index element={<Navigate to="/home"/>}/>
                    {
                        mainRoutes.map((x, i) => <Route key={i} path={x.path} element={x.component}/>)
                    }
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}

export default AppRouter;
