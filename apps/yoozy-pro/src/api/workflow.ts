import { request } from "@/api/index.ts";
import { Prompts } from "@/types";


export const updatePrompt = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/workflow/${params.id}`,
        method: "PATCH",
        data: {
            action: "updatePrompt",
        },
    });
}


export const replaceWorkflow = async (params: any) => {
    return request({
        url: `/api/proj/v1/workflows`,
        method: "PUT",
        data: params,
    });
}


export const cancelWorkflow = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}`,
        method: "PATCH",
        data: {
            action: "cancel",
        },
    });
}

export const resumeWorkflow = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}`,
        method: "PATCH",
        data: {
            action: "resume",
        },
    });
}



export const retryWorkflowJob = async (params: { id: string, index: number }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}/jobs/${params.index || 0}`,
        method: "PATCH",
        data: {
            action: "retry",
            params: {
            }
        },
    });
}

export const backWorkflowJob = async (params: { id: string, index: number }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}/jobs/${params.index || 0}`,
        method: "PATCH",
        data: {
            action: "back",
            params: {
            }
        },
    });
}



export const confirmWorkflowJob = async (params: { id: string, index: number }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}/jobs/${params.index || 0}`,
        method: "PATCH",
        data: {
            action: "confirm",
        },
    });
}



export const updateWorkflowJob = async (params: { id: string, index: number, dataKey: string, data: any }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}/jobs/${params.index || 0}`,
        method: "PATCH",
        data: {
            action: "updateData",
            dataKey: params.dataKey,
            data: params.data,
        },
    });
}





export const updateWorkflowJobData = async (params: { id: string, name: string, data: any }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}/job-data/${params.name}`,
        method: "PATCH",
        data: params,
    });
}

export const updateWorkflowSettings = async (params: { id: string, data: any }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}`,
        method: "PATCH",
        data: {
            action: "updateSettings",
            data: params.data,
        },
    });
}

export const listWorkflows = async (params: { page?: number, [key: string]: any }) => {
    return request({
        url: `/api/proj/v1/workflows`,
        params: params
    });
};

export const getWorkflow = async (params: { id: string }) => {
    return request({
        url: `/api/proj/v1/workflows/${params.id}`,
    });
};
