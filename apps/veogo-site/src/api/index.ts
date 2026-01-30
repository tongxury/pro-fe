import axios from "axios";
import {getAuthToken, getCookie, getDeviceID} from "@/utils";
import eventBus, {eventTypes} from "@/utils/eventBus";

const axiosInstance = axios.create()
// @ts-ignore
axiosInstance.interceptors.request.use(
    function (config: any) {
        return {
            ...config,
            data: config.data,
            params: {
                ...config.params,
                // dv: getCookie("device_id") || "",
                cn: getCookie("channel") || ""
            },
            headers: {
                Authorization: getAuthToken() || "",
                // "Device-Id": getDeviceID(),
                // Channel: getCookie("channel") || "",
            }
        };
    },
    function (error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function (response) {

        console.log('response', response);

        if (response?.status === 401 || response?.data?.code === 'UNAUTHORIZED') {
            // const redirect = encodeURIComponent(window.location.href);
            eventBus.emit(eventTypes.OpenLoginModal);
            return Promise.reject();
        }

        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export const request = ({
                            url,
                            method = "GET",
                            params,
                            data, baseUrl,
                        }: {
    url: string;
    method?: string;
    params?: { [key: string]: any };
    data?: { [key: string]: any };
    baseUrl?: string;
}): Promise<Response> => {
    return axiosInstance.request({
        url,
        baseURL: baseUrl || import.meta.env.VITE_API_URL,
        timeout: 5000000,
        method,
        data,
        params: {
            // deviceId: getDeviceID(),
            // channel: getCookie("channel") || "",
            ...(params || {}),
        },
    });


    // return fetch(`${import.meta.env.VITE_API_URL}${url}`, {
    //     method,
    //     body: data ? JSON.stringify(data) : null
    // }).then((r) => r.json())
};

interface Response {
    code?: any;
    data?: any;
    message?: string;
}
