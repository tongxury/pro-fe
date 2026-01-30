import { useGlobalState } from "@/hooks/global";
import { Drawer, Modal } from "antd";
import { cloneElement, ReactElement, ReactNode, useEffect, useState } from "react";

const ModalOrDrawer = ({
    disabled,
    renderTrigger,
    renderBody,
    onOpen,
    // defaultOpen,
    // setAdding,
    ...rest
}: {
    disabled?: boolean;
    renderTrigger?: (open: () => void) => ReactElement;
    renderBody: (close: () => void) => ReactNode;
    onOpen?: () => void;
    // defaultOpen?: boolean;
    // setAdding?: (open: boolean) => void;
}) => {
    const { isMobile } = useGlobalState();

    const [open, setOpen] = useState(false);
    // useEffect(() => {
    //     setOpen(defaultOpen || false);
    // }, [defaultOpen]);

    if (disabled) return renderTrigger(() => {});

    return (
        <>
            {renderTrigger(() => {setOpen(true);onOpen?.()})}
            {isMobile ? (
                <Drawer
                    height={500}
                    styles={{ body: { padding: 10 } }}
                    destroyOnHidden
                    placement={"bottom"}
                    open={open}
                    closable={false}
                    onClose={() => {
                        setOpen(false);
                        // setAdding?.(false);
                    }}
                    {...rest}
                >
                    {/*// @ts-ignore*/}
                    {renderBody(() => {
                        setOpen(false);
                        // setAdding?.(false);
                    })}
                    {/*{cloneElement(children, {*/}
                    {/*    ...children.props,*/}
                    {/*    close: () => setOpen(false),*/}
                    {/*})}*/}
                </Drawer>
            ) : (
                <Modal
                    styles={{ root: { padding: 10 } }}
                    destroyOnHidden
                    centered
                    footer={null}
                    width={800}
                    open={open}
                    closable={false}
                    onCancel={() => {
                        setOpen(false);
                        // setAdding?.(false);
                    }}
                    {...rest}
                >
                    {/*// @ts-ignore*/}
                    {renderBody(() => {
                        setOpen(false);
                        // setAdding?.(false);
                    })}
                </Modal>
            )}
        </>
    );
};

export default ModalOrDrawer;
