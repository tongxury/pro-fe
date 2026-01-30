import { request } from "@/api/index.ts";
import { getCookie, getDeviceID } from "@/utils";

export const listItems = async (params: any) => {
    return request({
        url: `/api/am/v1/templates`,
        params
    });
};

export const updateCategory = async (params: { id: string; category: string }) => {
    return request({
        url: `/api/am/v1/items/${params.id}/category`,
        method: "PATCH",
        data: {
            category: params.category
        }
    });
};

export const addItem = async (params: { url: string; coverUrl: string }[]) => {
    return request({
        url: "/api/am/v1/templates",
        method: "POST",
        data: {
            items: params
        }
    });
};

export const putItem = async (params: any) => {
    return request({
        url: "/api/am/v1/items",
        method: "PUT",
        data: {
            ...params
        }
    });
};

export const getItem = async (params: { id: string }) => {
    return request({
        url: "/api/am/v2/templates/" + params.id,
    });
};


export const deleteItem = async (params: { id: string }) => {
    return request({
        url: "/api/am/v1/templates/" + params.id,
        method: "patch",
        data: {
            action: "delete"
        }
    });
};

export const refreshItem = async (params: { id: string }) => {
    return request({
        url: "/api/am/v1/templates/" + params.id,
        method: "patch",
        data: {
            action: "refresh"
        }
    });
};
