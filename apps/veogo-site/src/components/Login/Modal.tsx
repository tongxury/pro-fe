import React, {useEffect, useState} from "react";
import LoginView from "@/components/Login/View";
import {useXTheme} from "@pro/ui";
import eventBus, {eventTypes} from "@/utils/eventBus";
import {useRouter} from "@/i18n/routing";
import ModalOrDrawer from "@/components/ModalOrDrawer";
import LoginView2 from "@/components/Login/LoginView2";
import useXHS from "@/hooks/useXHS.ts";


const LoginModal = () => {

    const router = useRouter()
    const [open, setOpen] = useState(false);
    const {themeVars} = useXTheme()

    // const {send102} = useXHS()

    useEffect(() => {
        eventBus.addListener(eventTypes.OpenLoginModal, () => {
            setOpen(true);
        });
        return () => {
            eventBus.removeAllListeners(eventTypes.OpenLoginModal);
        };
    }, []);

    return <>
        <ModalOrDrawer
            onOpenChange={(open) => setOpen(open)}
            open={open}
        >
            <LoginView2 onSuccess={(data) => {
                setOpen(false);
                window.location.reload()
            }}/>
        </ModalOrDrawer>
    </>;
}

export default LoginModal;
