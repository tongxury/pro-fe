import { request } from "@/api/index.ts";

export const listPublicTemplates = async (params: any) => {
    return request({
        url: `/api/proj/v2/public-templates`,
        params
    });
};
export const listTemplates = async (params: any) => {
    return request({
        url: `/api/proj/v2/templates`,
        params
    });
};


export const addTemplates = async (params: { url: string; coverUrl: string }[]) => {
    return request({
        url: "/api/proj/v1/templates",
        method: "POST",
        data: {
            items: params
        }
    });
};


export const getTemplate = async (params: { id: string }) => {
    return request({
        url: "/api/proj/v2/templates/" + params.id,
    });
};


export const deleteTemplate = async (params: { id: string }) => {
    return request({
        url: "/api/proj/v1/templates/" + params.id,
        method: "patch",
        data: {
            action: "delete"
        }
    });
};

export const refreshTemplate = async (params: { id: string }) => {
    return request({
        url: "/api/proj/v1/templates/" + params.id,
        method: "patch",
        data: {
            action: "refresh"
        }
    });
};
