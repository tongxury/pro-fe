import { request } from "@/api/index.ts";

// 填好商品链接和 可选的补充资料后 创建商品。资料还是先上传 阿里云， 和 proj-admin的上传位置一样
export const createCommodity = async (params: {
    url: string,
    medias?: { mimeType: string, url: string }[],
}) => {
    return request({
        url: "/api/proj/v1/commodities",
        method: "POST",
        data: params,
    });
};


// 获取历史记录
export const listCommodities = async (params: {
    keyword?: string;
    page?: number;
    returnFields?: string,
    [key: string]: any
}) => {
    const defaultParams = {
        returnFields: 'status,images,title,brand',
        size: 8
    }
    params = { ...defaultParams, ...params };

    return request({
        url: `/api/proj/v1/commodities`,
        params: params
    });
};


// 获取单个商品详情
export const getCommodity = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/commodities/${params.id}`,
        params: params
    });
};
// 获取单个商品详情
export const deleteCommodity = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/commodities/${params.id}`,
        method: "PATCH",
        data: {
            action: "delete",
        }
    });
};


export const createTask = async (params: {
    commodityId: string,
    chanceIndex?: number,
}) => {
    return request({
        url: "/api/proj/v1/tasks",
        method: "POST",
        data: params,
    });
};

// 获取历史记录
export const listTasks = async (params: { keyword?: string; page?: number, [key: string]: any }) => {
    return request({
        url: `/api/proj/v1/tasks`,
        params: params
    });
};


// 获取单个task详情
export const getTask = async (params: { id: string, [key: string]: any }) => {
    return request({
        url: `/api/proj/v1/tasks/${params.id}`,
        params: params
    });
};
// 获取单个task详情
export const listRelatedItems = async (params: { keyword: string }) => {
    return request({
        url: `/api/proj/v1/related-items`,
        params: params
    });
};


export const deleteTask = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/tasks/${params.id}`,
        method: "PATCH",
        data: {
            "action": "delete",
        }
    });
};


export const updateTargetRelatedItem = async (params: { id: string, index: number }) => {
    return request({
        url: `/api/proj/v1/tasks/${params.id}`,
        method: "PATCH",
        data: {
            "action": "updateTargetRelatedItem",
            params: {
                "index": params.index?.toString(),
            }
        }
    });
};


export const updateTargetChance = async (params: { id: string, index: number }) => {
    return request({
        url: `/api/proj/v1/tasks/${params.id}`,
        method: "PATCH",
        data: {
            "action": "updateTargetChance",
            "chanceIndex": params.index,
        }
    });
};


export const updateTemplate = async (params: { id: string, templateId: string }) => {
    return request({
        url: `/api/proj/v1/tasks/${params.id}`,
        method: "PATCH",
        data: {
            "action": "updateTemplate",
            "templateId": params.templateId,
        }
    });
};


export const updateMode = async (params: { id: string, mode: string }) => {
    return request({
        url: `/api/proj/v1/tasks/${params.id}`,
        method: "PATCH",
        data: {
            "action": "updateMode",
            "params": {
                "mode": params.mode,
            },
        }
    });
};

export const updateTaskSegmentStatus = async (params: { id: string, status: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            "action": "updateStatus",
            "params": {
                "status": params.status,
            }
        }
    });
};

export const updateTaskGenerateVideoSegment = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            "action": "generateVideoSegment",
        }
    });
};

export const updateSubtitle = async (params: { id: string, subtitle: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            "action": "update",
            "params": {
                "field": "subtitle",
                "value": params.subtitle,
            }
        }
    });
};

export const updatePrompts = async (params: { id: string, cat: string, value: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            "action": "update",
            "params": {
                "field": "prompts." + params.cat,
                "value": params.value,
            }
        }
    });
};

export const updateTaskStatus = async (params: { id: string, status: string }) => {
    return request({
        url: `/api/proj/v1/tasks/${params.id}`,
        method: "PATCH",
        data: {
            "action": "updateStatus",
            "params": {
                "status": params.status,
            }
        }
    });
};


export const generateAISegment = async ({ id }: { id: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${id}`,
        method: "PATCH",
        data: {
            action: "generateAISegment",
        }
    });
};


export const updateTaskSegmentAISegment = async (params: { id: string, index: number, cat: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            action: "updateAISegment",
            params: {
                cat: params.cat,
                index: params.index.toString()
            },
        }
    });
};

export const deleteTaskSegmentAsset = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            action: "deleteAsset",
        }
    });
};


export const updateTaskSegmentAIVideoSegment = async (params: { id: string, index: number }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            action: "updateAIVideoSegment",
            params: {
                index: params.index.toString()
            },
        }
    });
};

export const updateTaskSegmentAsset = async (params: { id: string, assetId: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            action: "updateAsset",
            params: {
                "assetId": params.assetId
            },
        }
    });
};



export const updateTaskSegmentAddAISegment = async (params: { id: string, url: string }) => {
    return request({
        url: `/api/proj/v1/taskSegments/${params.id}`,
        method: "PATCH",
        data: {
            action: "addAISegment",
            params: {
                url: params.url
            },
        }
    });
};

