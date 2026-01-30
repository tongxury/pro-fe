import React, {useState} from "react";
import {useXTheme, XFlex} from "@pro/ui";
import {useRouter} from "@/i18n/routing";
import {MenuOutlined} from "@ant-design/icons";
import {Drawer} from "antd";
import SiderView from "@/components/SiderView";


const DrawerSider = () => {
    const {themeVars} = useXTheme()

    const [open, setOpen] = useState(false);
    const router = useRouter()

    return <>
        <XFlex height={60} style={{cursor: 'pointer'}}>
            <MenuOutlined style={{color: themeVars.colorTextL2}} onClick={() => setOpen(true)}/>
        </XFlex>
        <Drawer
            style={{width: 200}}
            onClose={() => setOpen(false)}
            placement={'left'}
            open={open}
            closable={false}
            styles={{
                body: {
                    padding: 0
                }
            }}
            title={null}
        >
            <SiderView/>
        </Drawer>
    </>
}


export default DrawerSider;
