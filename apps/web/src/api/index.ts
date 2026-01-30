import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { v4 as uuid } from "uuid";
import { getAuthToken, getDeviceID } from "@/utils";

// const instance = axios.create()

// @ts-ignore
axios.interceptors.request.use(
    function (config: any) {
        return {
            ...config,
            headers: {
                Authorization: getAuthToken() || "",
                "Device-Id": getDeviceID(),
                Channel: getCookie("channel") || ""
            }
        };
    },
    function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (response) {
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
    data
}: {
    url: string;
    method?: string;
    params?: { [key: string]: any };
    data?: { [key: string]: any };
}): Promise<Response> => {
    return axios({
        url,
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        method,
        data,
        params
    });

    // return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    //     method,
    //     body: data ? JSON.stringify(data) : null
    // }).then((r) => r.json())
};

interface Response {
    code?: number;
    data?: any;
    message?: string;
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        res.status(200).json({ id: "" });
    } catch {
        res.status(429).json({ error: "Rate limit exceeded" });
    }
}
