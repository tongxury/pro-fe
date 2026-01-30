import {Outlet, useSearchParams} from "react-router";
import PricingModal from "@/components/Pricing/Modal";
import LoginModal from "@/components/Login/Modal";
import Service from "@/components/Service";
import {useEffect} from "react";
import {getCookie, setChannel, setCookie} from "@/utils";
import {v4 as uuid} from "uuid";


const RootLayout = () => {

    const [params, setParams] = useSearchParams()
    // const [modal, contextHolder] = Modal.useModal();
    // const [notNotifyAnyMore, setNotNotifyAnyMore] = useLocalStorageState<boolean>("notNotifyAnyMore2", {defaultValue: false})

    useEffect(() => {
        if (!getCookie("device_id")) {
            setCookie("device_id", uuid())
        }

        if (params.get("click_id") && !getCookie("xhs_click_id")) {
            setCookie("xhs_click_id", params.get("click_id"))
        }

        if (params.get("cn")) {
            if (!getCookie("channel")) {
                setChannel(params.get("cn"))
            }
            setParams(prev => ({
                ...prev,
                cn: ''
            }))
        }
    }, []);

    return (
        <div style={{
            // background: themeVars.colorBgPrimary
        }}>
            {/* 全局弹窗区域 */}
            <PricingModal/>
            <LoginModal/>
            <Service/>
            <Outlet/>
            {/*{contextHolder}*/}
        </div>
    )
}

export default RootLayout;
