import { getCookie, setCookie } from "cookies-next";
import { v4 as uuid } from "uuid";
import { ImageLoaderProps } from "next/dist/shared/lib/image-config";

export const setToken = (value: string) => {
    setCookie("authToken", value, {
        maxAge: 365 * 24 * 60 * 60,
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN
    });
};
export const getUrlParam = (paramName: string) => {
    const queryString = window.location.search.substring(1);
    const queryParams = queryString.split("&");
    for (let i = 0; i < queryParams.length; i++) {
        const [key, value] = queryParams[i].split("=");
        if (key === paramName) {
            return value;
        }
    }
    return "";
};

export function getDeviceID() {
    if (!getCookie("device_id")) {
        setCookie("device_id", uuid(), {
            maxAge: 365 * 24 * 60 * 60,
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN
        });
    }

    return getCookie("device_id");
}

export const defaultImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
    return src;
};

export const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export const _getCookie = (name: string) => {
    return getCookie(name, { domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN });
};

export const getAuthToken = () => {
    return process.env.NODE_ENV === "development"
        ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0cyI6MTcyMDE1NjU4NywidXNlcl9pZCI6IjEifQ.OXzSd8C2oMmyq8WZIfnZtmZ8SJ3uUa-QxP8yMPeDLWQ"
        : _getCookie("authToken");
};
