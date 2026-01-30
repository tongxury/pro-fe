import {Button, Modal} from "antd";
import React, {useEffect, useState} from "react";
import {useXTheme, XFlex, XText} from "@pro/ui";
import eventBus, {eventTypes} from "@/utils/eventBus";
import {useRouter} from "@/i18n/routing";
import PricingView from "@/components/Pricing/en/View";

const PricingModal = () => {

    const router = useRouter()
    const [open, setOpen] = useState(false);
    const {themeVars} = useXTheme()

    useEffect(() => {

        eventBus.addListener(eventTypes.OpenPricingModal, () => {
            setOpen(true);
        });
        return () => {
            eventBus.removeAllListeners(eventTypes.OpenPricingModal);
        };
    }, []);

    return <>
        <Modal width={800} maskClosable={true} onCancel={() => setOpen(false)}
               closable={false} open={open}
               footer={null}>
            <PricingView/>
        </Modal>
    </>;
}

export default PricingModal;
