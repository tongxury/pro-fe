import { request } from "@/api/index.ts";


export const listResourceSegments = async (params: any) => {
    return request({
        url: `/api/proj/v1/resource-segments`,
        params
    });
};



export const getResourceSegment = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/resource-segments/${params.id}`,
        params
    });
};

export const updateResourceSegment = async (id: string, action: 'collect' | 'cancel') => {
    return request({
        url: `/api/proj/v1/resource-segments/${id}`,
        method: 'PATCH',
        data: { action }
    });
};

export const listCollectedResourceSegments = async (params: any) => {
    return listResourceSegments({
        ...params,
        collected: true
    });
};


export const getDouyinVideoUrl = async (params: { url: string }) => {
    return request({
        url: `/api/tk/toolkits`,
        method: 'POST',
        data: {
            method: 'uploadDouyinVideo',
            params: {
                url: params.url,
            }
        }
    });
};

