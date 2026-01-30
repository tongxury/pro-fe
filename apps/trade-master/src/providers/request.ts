import {retrieveLaunchParams} from "@telegram-apps/sdk-react";
import {DEFAULT_WALLET_CACHE_KEY} from "@/contants.ts";
import type {CachedData} from "ahooks/lib/useRequest/src/utils/cache";

export const cached = (cacheKey: string) => {
    return {
        cacheKey,
        setCache: (data: CachedData) => {

            console.log("Cache key", cacheKey, data?.data);

            localStorage.setItem(cacheKey, JSON.stringify(data?.data || {}))
        },
        getCache: () => ({data: JSON.parse(localStorage.getItem(cacheKey) || '{}')} as any),
    }
}

export const request = async ({
                                  url,
                                  method = "GET",
                                  params,
                                  data,
                                  headers,
                                  raw
                              }: {
    url: string;
    method?: string;
    params?: { [key: string]: any };
    data?: { [key: string]: any };
    headers?: { [key: string]: any };
    raw?: boolean
}): Promise<Response> => {

    const args = Object.keys(params || {}).map((key) => {

            if (Array.isArray(params[key])) {
                return params[key].map((v: string) => {
                    return `${key}[]=${encodeURIComponent(v)}`
                }).join('&')
            }

            return `${key}=${encodeURIComponent(params?.[key])}`
        }
    ).join("&");

    const apiStart = new Date().getTime();

    const tmp = await fetch(
        `${import.meta.env.VITE_API_URL}${url}?${args}`,
        {
            method: method || 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: `tma ${retrieveLaunchParams().initDataRaw}`,
                Wallet: (JSON.parse(localStorage.getItem(DEFAULT_WALLET_CACHE_KEY) || '{}'))?._id || '',
                ...headers,
            },
            body: JSON.stringify(data),

        })

    console.log(`${import.meta.env.VITE_API_URL}${url}?${args} cost:${new Date().getTime() - apiStart}`,);

    return raw ? (await tmp.json()) : (await tmp.json())?.data
};

export declare interface Response {
    code?: string;
    data?: any;
    message?: string;
}
