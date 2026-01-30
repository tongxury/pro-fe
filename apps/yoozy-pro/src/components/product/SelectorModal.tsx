import {ReactNode, useState} from "react";
import {Modal} from "antd";
import Selector from "./Selector";

const SelectorModal = ({onConfirm, children}: { onConfirm: (item: any) => void, children: ReactNode }) => {
    const [open, setOpen] = useState(false)


    const confirm = (item: any) => {
        onConfirm(item)
        setOpen(false)
    }

    return (
        <>
            <div onClick={() => setOpen(true)}>{children} </div>
            <Modal footer={null} closable={false} open={open} onCancel={() => setOpen(false)}>
                <Selector onConfirm={confirm}/>
            </Modal>
        </>
    )
}

export default SelectorModal;
