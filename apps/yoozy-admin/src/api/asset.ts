import { request } from "@/api/index.ts";

export const createAsset = async (params: {
    templateId: string,
    commodity: any,
    prompt?: string,
}) => {
    return request({
        url: "/api/proj/v1/assets",
        method: "POST",
        data: params,
    });
};


export const listAssets = async (params: { page?: number }) => {
    return request({
        url: `/api/proj/v1/assets`,
        params: params
    });
};



export const favorateAsset = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "favorite"
        }
    });
};


// Admin APIs
export const listAdminAssets = async (params: { page: number, size: number, category?: string, userId?: string, status?: string, id?: string }) => {
    return request({
        url: `/api/am/v1/assets`,
        params: params
    });
};

export const getAdminAsset = async (params: { id: string }) => {
    return request({
        url: `/api/am/v1/assets/${params.id}`,
    });
};
