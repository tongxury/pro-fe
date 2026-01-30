import {cloneElement, ReactElement, ReactNode, useState} from "react";

import {useGlobalState} from "@/hooks/global";
import {Drawer, Modal} from "antd";


const ModalOrDrawer = ({open, onOpenChange, children}: {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    children: ReactNode,
}) => {

    const {isMobile} = useGlobalState()

    return <>
        {isMobile ?
            <Drawer height={'auto'} style={{maxHeight: 650, borderTopLeftRadius: 10, borderTopRightRadius: 10}}
                    styles={{body: {padding: 10,}}} maskClosable destroyOnHidden placement={'bottom'}
                    open={open} closable={false}
                    onClose={() => onOpenChange(false)}>
                {/*// @ts-ignore*/}
                {children}
            </Drawer> :
            <Modal styles={{root: {padding: 10},}}
                   maskClosable destroyOnHidden centered footer={null} open={open}
                   closable={false} width={850}
                   onCancel={() => onOpenChange(false)}
            >
                {/*// @ts-ignore*/}
                {children}
            </Modal>
        }
    </>


}

export default ModalOrDrawer
