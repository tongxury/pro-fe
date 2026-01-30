import { request } from "@/api/index.ts";


export const listResourceSegments = async (params: any) => {
    return request({
        url: `/api/am/v2/resource-segments`,
        params
    });
};


export const addResourceSegments = async (params: { url: string; coverUrl: string }[]) => {
    return request({
        url: "/api/am/v1/resource-segments",
        method: "POST",
        data: {
            items: params
        }
    });
};

export const refreshResourceSegment = async (params: { id: string }) => {
    return request({
        url: `/api/am/v1/resource-segments/${params.id}`,
        method: "PATCH",
        data: {
            action: "refresh",
        }
    });
};

export const deleteResourceSegment = async (params: { id: string }) => {
    return request({
        url: `/api/am/v1/resource-segments/${params.id}`,
        method: "PATCH",
        data: {
            action: "delete",
        }
    });
};
