import React, {cloneElement, ReactElement, useState} from "react";
import {Drawer} from "antd";
import {useXTheme, xBorderRadius, XFlex} from "@pro/ui";
import IconFont from "@/components/Iconfont";
import Settings from "@/components/UserProfile/Settings.tsx";


function UserProfile({children}: { children: ReactElement }) {

    const {themeVars} = useXTheme()
    const [open, setOpen] = useState(false)

    const close = () => {
        setOpen(false)
    }

    return <>
        {cloneElement(children, {
            ...children.props,
            onClick: () => setOpen(true),
        })}
        <Drawer
            style={{
                background: themeVars.colorBgPrimary,
            }}
            styles={{
                body: {padding: 0,}
            }}
            open={open}
            destroyOnClose
            maskClosable
            closable={false}
            placement={'right'}
            width={'100%'}
            onClose={close}
        >
            <XFlex vertical>
                <XFlex align={'center'} justify={'space-between'} padding={15}>
                    <IconFont onClick={close} size={24} name={'arrow-left-line'} color={themeVars.colorTextPrimary} />
                </XFlex>
                <Settings />
            </XFlex>
        </Drawer>
    </>
}

export default UserProfile;
