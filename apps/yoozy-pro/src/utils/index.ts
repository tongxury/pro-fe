import { v4 as uuid } from "uuid";
import Cookies from "js-cookie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const isZh = import.meta.env.VITE_LOCALE == "zh";

export const formatDuration = (s?: number) => {
    if (!s && s !== 0) return "00:00";
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = Math.floor(s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
};


export function generateObjectId() {
    const timestamp = Math.floor(new Date().getTime() / 1000)
        .toString(16)
        .padStart(8, "0");
    const machineId = Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0");
    const processId = Math.floor(Math.random() * 65536)
        .toString(16)
        .padStart(4, "0");
    const counter = Math.floor(Math.random() * 16777216)
        .toString(16)
        .padStart(6, "0");

    return timestamp + machineId + processId + counter;
}

export const setAuthToken = (value: string) => {
    Cookies.set(`${import.meta.env.VITE_VAR_PREFIX || ""}_authTokenV2`, value, {
        expires: 365 * 24 * 60 * 60,
        domain: import.meta.env.VITE_DOMAIN
    });
};
export const setChannel = (value: string) => {
    Cookies.set("channel", value, {
        expires: 365 * 24 * 60 * 60,
        domain: import.meta.env.VITE_DOMAIN
    });
};

export const removeAuthToken = () => {
    Cookies.remove(`${import.meta.env.VITE_VAR_PREFIX || ""}_authTokenV2`, { domain: import.meta.env.VITE_DOMAIN });
};

export const getAuthToken = () => {
    return import.meta.env.MODE === "dev"
        ? // ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cyI6MTc0ODg3ODY1NSwidXNlcl9pZCI6IjMxNDUifQ.BwlK_gTfUXMdCdopPUJ4apvpbUvVnIwEMIBfhAm4gzA"
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cyI6MTc2MjYxMjI1MywidXNlcl9pZCI6IjY5MGQ2YTY2OWU1YzA1NDYyYzBlNDE2NSJ9.dG9wqK7p8yIrJYn-THhui2Py788BjbPWkjjx19-PhCM"
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cyI6MTc2OTczNzA2MywidXNlcl9pZCI6IjY5M2I5MWY4MmIyNzFiZjAyYWMxZTYyNCJ9.derFBwhaOVt1EMx9hC_EQ8Js_doYfWeHtmQQ_wB0Rjo"
        : getCookie(`${import.meta.env.VITE_VAR_PREFIX || ""}_authTokenV2`);

    // return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cyI6MTc2MjYxMjI1MywidXNlcl9pZCI6IjY5MGQ2YTY2OWU1YzA1NDYyYzBlNDE2NSJ9.dG9wqK7p8yIrJYn-THhui2Py788BjbPWkjjx19-PhCM";
};

export const getUrlParam = (paramName: string) => {
    const queryString = window.location.search.substring(1);
    const queryParams = queryString.split("&");

    console.log(queryString, queryParams);

    for (let i = 0; i < queryParams.length; i++) {
        const [key, value] = queryParams[i].split("=");
        if (key === paramName) {
            return value;
        }
    }
    return "";
};

export function getDeviceID() {
    if (!Cookies.get("device_id")) {
        Cookies.set("device_id", uuid(), {
            expires: 365 * 24 * 60 * 60,
            domain: import.meta.env.VITE_DOMAIN
        });
    }

    return Cookies.get("device_id");
}

export function setDeviceIdIfNotExists() {
    if (!Cookies.get("device_id")) {
        Cookies.set("device_id", uuid(), {
            expires: 365 * 24 * 60 * 60,
            domain: import.meta.env.VITE_DOMAIN
        });
    }
}

// export const defaultImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
//     return src;
// };
//
// export const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
//
export const getCookie = (name: string) => {
    return Cookies.get(name);
};

export const setCookie = (name: string, value: string, options?: { expires: number }) => {
    Cookies.set(name, value, {
        expires: 365 * 24 * 60 * 60,
        domain: import.meta.env.VITE_DOMAIN,
        ...options
    });
};

export const getLocale = () => {
    return Cookies.get("NEXT_LOCALE") || import.meta.env.VITE_LOCALE;
};

export const trimHtml = (raw: string) => {
    const idx = raw.indexOf("```html");

    console.log("idxidx", idx);
    if (idx < 0) {
        return raw;
    }

    const idx2 = raw.lastIndexOf("```");
    if (idx2 < 0) {
        return raw.substring(idx, raw.length - 1);
    }

    console.log("idxidx11", idx2);

    const tmp = raw.substring(idx + 7, idx2);

    return tmp;
};

/**
 * 从对象中选取有值的字段
 * @param obj 源对象
 * @param keys 要选取的字段数组
 * @returns 新对象，只包含有值的字段
 */
export const pickValidFields = (obj: any, keys: string[]) => {
    return keys.reduce((acc, key) => {
        const value = obj[key];

        // 处理字符串类型
        if (typeof value === "string") {
            // 去除首尾空格后判断是否为空
            if (value.trim() !== "") {
                // @ts-ignore
                acc[key] = value;
            }
            return acc;
        }

        // 处理其他类型的空值
        if (
            value !== undefined &&
            value !== null &&
            !(Array.isArray(value) && value.length === 0) &&
            !(typeof value === "object" && Object.keys(value).length === 0)
        ) {
            // @ts-ignore
            acc[key] = value;
        }

        return acc;
    }, {});
};

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
