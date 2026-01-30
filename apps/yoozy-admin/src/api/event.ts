import {request} from "@/api/index.ts";
import {getCookie, getDeviceID} from "@/utils";


export const sendEvent = async (params: {
    name: string,
    params?: { [key: string]: string, },
}) => {
    return request({
        url: "/api/bi/events",
        method: "POST",
        data: {
            ...params,
            commonParams: {
                deviceId: getDeviceID(),
                channel: getCookie("channel") || "",
                platform: "web",
            }
        },
    });
};
