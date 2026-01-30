import {Outlet, useParams} from "react-router";
import {useGlobalState} from "@/hooks/global.tsx";
import SiderView from "@/components/SiderView";
import {HistoryOutlined, MenuFoldOutlined, MenuUnfoldOutlined, PlusOutlined} from "@ant-design/icons";
import CreditView from "@/components/CreditView";
import DrawerSider from "@/components/DrawerSider";
import {useXTheme, XFlex} from "@pro/ui";
import {useLocalStorageState} from "ahooks";
import {Alert, Button} from "antd";
import {useRouter} from "@/hooks/useRouter.tsx";
import {useTranslation} from "@/hooks/useTranslation.ts";
import CollapsedSessionList from "@/components/Session/CollapsedList";
import DrawerTrigger from "@/components/DrawerTrigger";
import SessionList from "@/components/Session/List";
import RegionNotification from "@/components/RegionNotification";


const Layout = () => {

    const {scene} = useParams()

    const router = useRouter()
    const t = useTranslation()

    const {isMobile} = useGlobalState()
    const [collapsed, setCollapsed] = useLocalStorageState<boolean>("menuCollapsed");
    const {themeVars} = useXTheme()

    const onSessionItemSelected = (session: any) => {
        router.push(`/scenes/${session?.scene}/sessions/${session?._id}`);
    }

    const showHistory = scene != "leaderboard"

    if (isMobile) {
        return (
            <div style={{height: '100vh', width: '100%'}}>
                <XFlex justify={'space-between'} gap={10} align={'center'} style={{paddingInline: 15, height: 70,}}>
                    <XFlex align={'center'} gap={10}>
                        <DrawerSider/>
                        {showHistory &&
                            <XFlex justify={'end'} gap={10} align={'center'}>
                                <Button type={'primary'} onClick={() => router.push('/scenes/' + scene)}
                                        icon={<PlusOutlined/>}>
                                    {t('boardingCreate_' + scene)}
                                </Button>
                                <DrawerTrigger
                                    renderTrigger={
                                        (open) =>
                                            <Button onClick={open} icon={<HistoryOutlined/>}>
                                                {!isMobile && t('history')}
                                            </Button>
                                    }
                                    renderBody={
                                        (close) => <SessionList scene={scene} onSelect={(session) => {
                                            onSessionItemSelected(session)
                                            close()
                                        }}/>
                                    }
                                />
                            </XFlex>
                        }
                    </XFlex>

                    {/*<CreditView/>*/}
                    <XFlex align={'center'} gap={10}>
                        <CreditView/>
                        {/*<SwitchLang />*/}
                    </XFlex>
                </XFlex>

                <div style={{height: `calc(100vh - 70px)`,}}>
                    <XFlex vertical block>
                        <RegionNotification/>
                        <Outlet/>
                    </XFlex>
                </div>

            </div>
        )
    }

    return (
        <>
            <XFlex>
                <SiderView collapsed={collapsed} style={{height: '100vh'}}/>
                <div style={{height: '100vh', width: 0, flex: 1}}>

                    <XFlex align={'center'} justify={'space-between'} gap={15}
                           style={{
                               paddingInline: 15,
                               height: 70,
                               borderBottom: `1px solid ${themeVars.colorBorder}`
                           }}>

                        <div onClick={() => {
                            setCollapsed(prevState => !prevState)
                        }
                        }>
                            {collapsed ?
                                <MenuUnfoldOutlined
                                    style={{color: themeVars.colorTextPrimary, cursor: 'pointer'}}/> :
                                <MenuFoldOutlined
                                    style={{color: themeVars.colorTextPrimary, cursor: 'pointer'}}/>
                            }
                        </div>

                        <XFlex align={'center'} gap={10}>

                            <Button type='text' onClick={() => router.push('/install')}>下载中心</Button>

                            <CreditView/>
                            {/*<SwitchLang />*/}
                        </XFlex>

                    </XFlex>

                    <XFlex style={{height: `calc(100vh - 70px)`, padding: 15}}>
                        {showHistory && <CollapsedSessionList scene={scene} onSelect={onSessionItemSelected}/>}
                        <XFlex vertical block>
                            <RegionNotification/>
                            <Outlet/>
                        </XFlex>
                    </XFlex>

                </div>
            </XFlex>
        </>
    )
}

export default Layout;
