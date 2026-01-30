import { request } from "@/api/index.ts";


export const listResourceSegments = async (params: any) => {
    return request({
        url: `/api/am/v2/resource-segments`,
        params
    });
};



export const getResourceSegment = async (params: { id: string }) => {
    return request({
        url: `/api/am/v2/resource-segments/${params.id}`,
        params
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

