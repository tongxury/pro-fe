import {useXTheme, XBasicTabs, XDivider, XFlex, XText} from "@pro/ui";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import IconFont from "@/components/Iconfont";
import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {mainRoutes} from "@/providers/router.tsx";

export default function MainLayout() {

    const {themeVars, customVars} = useXTheme()
    const {t} = useTranslation()
    const {pathname} = useLocation()
    const navigate = useNavigate()

    const TabView = ({iconName, title, color}: { iconName: string, title: string, color?: string }) => {
        return <XFlex vertical gap={5} align={'center'} style={{cursor: 'pointer',}}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*@ts-expect-error*/}
            <IconFont name={iconName} size={22} color={color}/>
            <XText size={10} color={color}>{title}</XText>
        </XFlex>
    }
    return (
        <XFlex vertical style={{
            // background: themeVars.colorBgPrimary,
            height: '100vh'
        }}>
            <div style={{flex: 1, overflowY: 'scroll', scrollbarWidth: 'none'}} suppressHydrationWarning>
                <Outlet/>
            </div>
            <XDivider/>
            <XBasicTabs
                value={pathname}
                onChange={(tab) => {
                    // setTab(tab.value);
                    navigate(tab.value)
                }}
                style={{height: customVars?.bottomMenuHeight, justifyContent: 'space-around'}}
                tabs={
                    mainRoutes.map((x, i) => ({
                        value: x.path,
                        renderItem: (selected, index) => {
                            return <TabView key={index}
                                            title={t(x.path?.substring(1))}
                                            color={selected ? themeVars.colorPrimary : themeVars.colorTextL1}
                                            iconName={x.icon}/>

                        }
                    }))
                }
            />
        </XFlex>
    );
}

