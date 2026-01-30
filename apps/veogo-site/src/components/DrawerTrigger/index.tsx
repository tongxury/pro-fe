import {useGlobalState} from "@/hooks/global";
import {Drawer, Modal} from "antd";
import {cloneElement, ReactElement, ReactNode, useState} from "react";


const DrawerTrigger = ({renderTrigger, renderBody, ...rest}: {
    renderTrigger: (open: () => void) => ReactElement,
    renderBody: (close: () => void) => ReactNode
}) => {

    const [open, setOpen] = useState(false);

    return <>
        {renderTrigger(() => setOpen(true))}
        <Drawer styles={{body: {padding: 10}}} height={'auto'} style={{maxHeight: 700}} destroyOnHidden
                placement={'bottom'} open={open} closable={false}
                onClose={() => setOpen(false)} {...rest}>
            {/*// @ts-ignore*/}
            {renderBody(() => setOpen(false))}
            {/*{cloneElement(children, {*/}
            {/*    ...children.props,*/}
            {/*    close: () => setOpen(false),*/}
            {/*})}*/}
        </Drawer>
    </>


}

export default DrawerTrigger
