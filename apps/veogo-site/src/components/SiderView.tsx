import {useXTheme, XFlex} from "@pro/ui";
import {Button} from "antd";
import {ArrowLeftOutlined, ArrowRightOutlined} from "@ant-design/icons";
import Logo from "@/components/Logo";
import MenuList from "@/components/MenuList";
import Account from "@/components/Account";
import React, {CSSProperties, useState} from "react";
import {useGlobalState} from "@/hooks/global";
import LoginState from "@/components/LoginState";


const SiderView = ({collapsed, style}: { collapsed?: boolean, style?: CSSProperties }) => {

    const {themeVars} = useXTheme()
    const {user, userLoading} = useGlobalState()


    return (<XFlex vertical style={{
        borderRight: '1px solid ' + themeVars.colorBorder,
        width: collapsed ? 60 : 200,
        transition: 'all 0.3s ease',
        // background: themeVars.colorBgL1,
        // position: 'relative',
        ...style
    }}>

        {/*<Button onClick={() => setCollapsed(!collapsed)} shape={'circle'}*/}
        {/*        style={{position: 'absolute', right: -10, top: 50}} size={'small'}*/}
        {/*        icon={collapsed ? <ArrowRightOutlined/> : <ArrowLeftOutlined/>}></Button>*/}

        <XFlex center height={80}>
            <Logo hideTitle={collapsed}/>
        </XFlex>
        <XFlex gap={20} vertical align={'center'} style={{paddingInline: 10, height: `calc(100vh - 80px - 50px)`}}>
            <MenuList collapsed={collapsed}/>
        </XFlex>
        {
            !userLoading && <XFlex style={{height: 50, padding: 10}} center>

                {/*<LoginState/>*/}
                {user ? <Account collapsed={collapsed}/> : <LoginState collapsed={collapsed}/>}
            </XFlex>
        }

    </XFlex>)
}

export default SiderView;
