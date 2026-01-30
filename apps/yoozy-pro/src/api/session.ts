import { request } from ".";

export const createSessionV2 = async (params: {
    templateId: string,
    commodityId: string,
    targetChance: number,
}) => {
    return request({
        url: "/api/proj/v2/sessions",
        method: "POST",
        data: params,
    });
};



export const getSession = async (params: { id: string, [key: string]: any }) => {
    return request({
        url: `/api/proj/v1/sessions/${params.id}`,
        params
    });
};


export const updateSessionSegmentAsset = async (params: { id: string, assetId: string }) => {
    return request({
        url: `/api/proj/v1/session-segments/${params.id}`,
        method: "PATCH",
        data: {
            action: "updateAsset",
            params: {
                assetId: params.assetId,
            }
        },
    });
};


export const listSessions = async (params: { page?: number, [key: string]: any }) => {
    return request({
        url: `/api/proj/v1/sessions`,
        params: params
    });
};

export const mergeSessionVideo = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/sessions/${params.id}/merge`,
        method: "POST",
    });
};
export const startRemix = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/sessions/${params.id}`,
        method: "PATCH",
        data: {
            action: "startRemix",
        }
    });
};