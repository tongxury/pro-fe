import { request } from "@/api/index.ts";
import { Prompts, Segment } from "@/types";

export const generatePrompt = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "generatePrompt",
        },
    });
}

export const updatePrompt = async (params: { id: string, text: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "updatePrompt",
            text: params.text,
        },
    });
}


export const startGenerating = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "generate",
        },
    });
}


export const startReGenerating = async (params: { id: string, prompt: string }) => {
    return request({
        url: `/api/proj/v1/re-assets`,
        method: "POST",
        data: {
            prompt: params.prompt,
            assetId: params.id,
        },
    });
}


export const createAsset = async (params: {
    baseAssetId?: string
    templateId?: string,
    commodity: any,
    segment?: any,
    prompts?: Prompts,
}) => {
    return request({
        url: "/api/proj/v1/assets",
        method: "POST",
        data: params,
    });
};



export const createAssetV2 = async (params: {
    commodityId: string,
    segmentId?: string,
    segment?: Segment,
    templateId?: string,
    chanceIndex?: number,
    workflowName?: string,
    initialData?: any,
    auto?: boolean,

}) => {
    return request({
        url: "/api/proj/v2/assets",
        method: "POST",
        data: params,
    });
};


export const createAssetV3 = async (params: {
    prompt: string,
    images?: string[],
}) => {
    return request({
        url: "/api/proj/v3/assets",
        method: "POST",
        data: params,
    });
};



export const createAssetV5 = async (params: {
    url: string,
    coverUrl: string,
}) => {
    return request({
        url: "/api/proj/v5/assets",
        method: "POST",
        data: params,
    });
};


export const listAssets = async (params: { page?: number, [key: string]: any }) => {
    return request({
        url: `/api/proj/v2/assets`,
        params: params
    });
};


export const listQualityAssets = async (params: { page?: number, [key: string]: any }) => {
    return request({
        url: `/api/proj/v2/quality-assets`,
        params: params
    });
};


export const getAsset = async (params: { id: string, [key: string]: any }) => {
    return request({
        url: `/api/proj/v2/assets/${params.id}`,
        params
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

export const updateAssetRemark = async (params: { id: string, remark: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "remark",
            params: {
                remark: params.remark
            }
        }
    });
};


export const dislikeAsset = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "attitude",
            params: {
                attitude: 'dislike'
            }
        }
    });
};


export const likeAsset = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "attitude",
            params: {
                attitude: 'like'
            }
        }
    });
};


// Confirm Asset Job
export const confirmAssetJob = async (params: { id: string, jobId: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "confirm",
            jobId: params.jobId,
        },
    });
};

export const deleteAsset = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "delete"
        }
    });
};

export const getAssetSummary = async () => {
    return request({
        url: `/api/proj/v1/asset-summaries`,
    });
};

export const cancelAssetWorkflow = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/assets/${params.id}`,
        method: "PATCH",
        data: {
            action: "cancel"
        }
    });
};
