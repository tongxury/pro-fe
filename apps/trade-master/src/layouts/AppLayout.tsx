import {useXTheme, XBasicTabs, XDivider, XFlex, XText} from "@pro/ui";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {singleRouteByPathname} from "@/providers/router.tsx";
import WebApp from "@twa-dev/sdk";

export default function AppLayout() {

    const {themeVars} = useXTheme()
    const {t} = useTranslation()
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        WebApp.expand()
        WebApp.enableClosingConfirmation()
        // WebApp.setHeaderColor

        const onBack = () => navigate(-1)


        const r = singleRouteByPathname(pathname)
        console.log(pathname, r)

        if (singleRouteByPathname(pathname)?.showBackButton) {
            WebApp.BackButton.show()
            WebApp.BackButton.onClick(onBack)
        } else {
            WebApp.BackButton.hide()
        }
        return () => WebApp.BackButton.offClick(onBack);
    }, [pathname]);

    return (
        <div style={{background: themeVars.colorBgPrimary}}>
            <Outlet/>
        </div>
    );
}

