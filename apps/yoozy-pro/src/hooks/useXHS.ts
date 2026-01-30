import {getCookie, setCookie} from "@/utils";
import axios from "axios";
import {useSearchParams} from "react-router";


const useXHS = () => {

    const [searchParams] = useSearchParams()

    const send = async (event_type: string) => {
        const click_id = getCookie("xhs_click_id")

        if (click_id) {
            const inst = axios.create()

            let token = getCookie("xhs_access_token")
            if (!token) {
                const t = await inst.post("https://adapi.xiaohongshu.com/api/open/common", {
                    advertiser_id: import.meta.env.VITE_XHS_ADVERTISER_ID,
                    method: "oauth.getAccessToken"
                })

                const access_token = t?.data?.data?.access_token
                const access_token_expires_in = t?.data?.data?.access_token_expires_in

                if (access_token) {
                    setCookie("xhs_access_token", access_token, {expires: access_token_expires_in})
                }

                token = access_token
            }

            const x = await inst.post("https://adapi.xiaohongshu.com/api/open/common", {
                advertiser_id: import.meta.env.VITE_XHS_ADVERTISER_ID,
                method: "aurora.leads",
                access_token: token,
                event_type,
                conv_time: Date.now(),
                click_id: click_id,
            })

            console.log('xhs', x.data)

        }
    }

    const send102 = async () => {
        return send("102")
    }

    return {
        send102
    }
}

export default useXHS;
