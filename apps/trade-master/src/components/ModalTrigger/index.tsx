import { Drawer, Modal } from "antd";
import { cloneElement, CSSProperties, ReactElement, ReactNode, useState } from "react";
import { XDivider, XFlex, XText } from "@pro/ui";


function ModalTrigger({ trigger, title, extra, disabled, children, renderBody, styles }: {
    title?: ReactNode,
    extra?: ReactNode,
    disabled?: boolean,
    children?: ReactElement,
    renderBody?: (props: { closeDrawer: () => void }) => ReactElement,
    trigger: ReactElement
    styles?: {
        body?: CSSProperties
    }
}) {

    const [open, setOpen] = useState(false)

    return <>
        {cloneElement(trigger, {
            ...trigger.props,
            onClick: () => {
                trigger?.props?.onClick?.()
                !disabled && setOpen(true)
            }
        })}
        <Modal
            styles={{
                body: { padding: 0 },
                content: { padding: 0, borderTopLeftRadius: 15, borderTopRightRadius: 15 }
            }}
            centered
            // height={'auto'}
            open={open}
            maskClosable
            destroyOnClose
            closable={false}
            footer={null}
            onCancel={() => setOpen(false)}>

            <XFlex align={'center'} justify={'space-between'} padding={(title || extra) ? [17, 15, 17, 15] : 0}>
                {
                    title &&
                    <>
                        {typeof title === 'string' ? <XText size={18}>{title}</XText> : title}
                    </>
                }
                {extra}
            </XFlex>
            <XDivider />


            <div style={{ ...styles?.body }}>
                {open && (renderBody ? renderBody({ closeDrawer: () => setOpen(false) }) : children)}
            </div>
        </Modal>
    </>

}

export default ModalTrigger;
