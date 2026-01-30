import {Button, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {useXTheme, XFlex, XText} from "@pro/ui";
import {useRouter} from "@/i18n/routing";
import LoginView2 from "@/components/Login/LoginView2";
import useXHS from "@/hooks/useXHS.ts";
import eventBus, {eventTypes} from "@/utils/eventBus.ts";


const LoginState = ({collapsed}: { collapsed?: boolean }) => {


    const router = useRouter()
    // const [open, setOpen] = useState(false);
    const {themeVars} = useXTheme()

    // useEffect(() => {
    //
    //     eventBus.addListener(eventTypes.HANDLE_REQUEST_401, () => {
    //         setOpen(true);
    //     });
    //     return () => {
    //         eventBus.removeAllListeners(eventTypes.HANDLE_REQUEST_401);
    //     };
    // }, []);

    // const {send102} = useXHS()


    return <>
        {/*<Button onClick={() => setOpen(true)}>登录/注册</Button>*/}

        <XFlex
            center
            onClick={() => eventBus.emit(eventTypes.OpenLoginModal)}
            style={{
                height: 45,
                background: themeVars.colorBgContainerPrimary + 'dd',
                width: '100%',
                maxWidth: 200,

                // width: 210,
                borderRadius: 50,
                paddingBlock: 10,
                border: '1px solid ' + themeVars.colorBorder
            }} align={'center'} gap={10}>
            <XText weight={500}>
                登录
            </XText>
        </XFlex>

        {/*<Modal maskClosable={true} onCancel={() => setOpen(false)} closable={true} open={open}*/}
        {/*       footer={null}>*/}
        {/*    <LoginView2 onSuccess={(data) => {*/}
        {/*        if (data?.isNew) {*/}
        {/*            send102().then(() => {*/}
        {/*                window.location.reload()*/}
        {/*            })*/}
        {/*        } else {*/}
        {/*            window.location.reload()*/}
        {/*        }*/}

        {/*    }}/>*/}
        {/*</Modal>*/}
    </>;
}

export default LoginState;
