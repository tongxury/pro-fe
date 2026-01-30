import React from "react";
import {useTranslation} from "@/hooks/useTranslation";
import {Outlet} from "react-router";


const HomeLayout = () => {

    const t = useTranslation();


    return <div style={{}}>
        {/*<XFlex block*/}
        {/*       style={{*/}
        {/*           // height: 100,*/}
        {/*           // ...xPosition({top: 0}),*/}
        {/*           // paddingBlock: 20,*/}
        {/*           zIndex: 1000,*/}

        {/*           // background: themeVars.colorBgPrimary + "ef",*/}
        {/*           backdropFilter: 'blur(15px)',*/}
        {/*           height: 80,*/}
        {/*       }}*/}
        {/*>*/}
        {/*    <XFlex style={{*/}
        {/*        paddingInline: 10,*/}
        {/*        maxWidth: 1400,*/}
        {/*        // border: '1px solid red',*/}
        {/*        width: '100%',*/}
        {/*        marginInline: 'auto'*/}
        {/*    }} align={'center'} justify={'space-between'}>*/}

        {/*        <Logo/>*/}

        {/*        /!*{user ? <Account collapsed={isMobile} style={{borderRadius: 20}}/> : <LoginState collapsed={isMobile}/>}*!/*/}

        {/*        /!*{pathname !== "/login" && <AccountState/>}*!/*/}
        {/*        /!*<AccountState />*!/*/}

        {/*    </XFlex>*/}
        {/*</XFlex>*/}


        <div
            suppressHydrationWarning>
            <Outlet/>
        </div>
    </div>
}

export default HomeLayout
